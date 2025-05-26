import EventPresenter from './event-presenter.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType } from '../const.js';
import { sortEventsByPrice, sortEventsByTime } from '../utils/sort.js';
export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripEventsListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();
  #sortComponent = null;

  #eventPresenters = new Map(); //Коллекция для хранения отрисованных event-презентеров

  #currentSortType = SortType.DAY; //свойство для хранения текущего варианта сортировки

  #allOffers = null;
  #allDestinations = null;

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent); // подписались на изменения модели
  }

  get tripEvents() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.tripEvents].sort(sortEventsByPrice);
      case SortType.TIME:
        return [...this.#pointsModel.tripEvents].sort(sortEventsByTime);
      case SortType.DAY:
        return this.#pointsModel.tripEvents;
    }

    return this.#pointsModel.tripEvents;
  }

  init() {
    this.#allOffers = this.#pointsModel.offers;
    this.#allDestinations = this.#pointsModel.destinations;

    this.#renderEventsListAndSort();
  }

  //обрабочик для смены режима с просмотра на редактирование и обратно, передаем в презентер точки маршрута
  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView()); // метод resetView() меняет форму редактирования на карточку, если режим не равен дефолтному
  };

  //метод-обработчик, который реагирует на действия пользователя, на основе которых мы должны вызвать изменения модели
  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  //метод-обработчик, который будет реагировать на изменения модели. Когда модель будет меняться, она будет рассылать всем своим "подписчикам" "уведомления" об изменениях.
  // Если trip-events-presenter подпишется на обновления модели, будет срабатывать этот метод-обработчик
  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  //метод-обработчик для клика по кнопкам сортировки
  #handleSortTypeChange = (sortType) => {
    //проверяем, не является ли выбранный вариант сортировки тем, что уже был выбран
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearSort(this.#sortComponent); //удаляем старую вьюшку сортировки (чтобы можно было добавить checked нужной кнопке)
    this.#renderSort(); //рендерим новую
    this.#clearEventsList(); //удаляем ранее отрисованный список задач в старом порядке
    this.#renderEventsList(); //рендерим номый список задач в новом порядке
  };

  //метод для удаления старой вьюшки сортировки
  #clearSort(oldSortView) {
    remove(oldSortView);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange, //передаем во вьюшку обработчик для клика по кнопкам сортировки
      sortType: this.#currentSortType, //пердаем во вьюшку актуальный тип сортировки
    });

    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      tripEventsListComponent: this.#tripEventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange, //передаем в презентер точки маршрута обработчик смены режима с просмотра на редактирование и обратно
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
    });

    eventPresenter.init(event);

    this.#eventPresenters.set(event.pointId, eventPresenter); //Добавляем в коллекцию созданный презентер
  }

  #renderEvents(tripEvents) {
    tripEvents.forEach((event) => this.#renderEvent(event));
  }

  #renderNoEvent() {
    render(this.#noEventComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  //метод, чтобы очистить весь список точек маршрута
  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventsList() {
    render(this.#tripEventsListComponent, this.#tripEventsContainer);

    if (!this.tripEvents.length) {
      this.#renderNoEvent();
    }

    this.#renderEvents(this.tripEvents);
  }

  #renderEventsListAndSort() {
    this.#renderEventsList();
    this.#renderSort();
  }
}
