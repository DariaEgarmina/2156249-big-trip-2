import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortEventsByPrice, sortEventsByTime } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #tripEventsListComponent = new TripEventsListView();
  #noEventComponent = null;
  #sortComponent = null;

  #eventPresenters = new Map(); //Коллекция для хранения отрисованных event-презентеров
  #newEventPresenter = null;

  #currentSortType = SortType.DAY; //свойство для хранения текущего варианта сортировки
  #filterType = FilterType.EVERYTHING;

  #allOffers = null;
  #allDestinations = null;

  constructor({ tripEventsContainer, pointsModel, filterModel, onNewEventDestroy }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      tripEventsListComponent: this.#tripEventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent); // подписались на изменения модели
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripEvents() {
    this.#filterType = this.#filterModel.filter;
    const tripEvents = this.#pointsModel.tripEvents;
    const filteredTripEvents = filter[this.#filterType](tripEvents);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...filteredTripEvents].sort(sortEventsByPrice);
      case SortType.TIME:
        return [...filteredTripEvents].sort(sortEventsByTime);
      case SortType.DAY:
        return filteredTripEvents;
    }

    return filteredTripEvents;
  }

  init() {
    this.#allOffers = this.#pointsModel.offers;
    this.#allDestinations = this.#pointsModel.destinations;

    this.#renderEventsListAndSort();
  }

  createTripEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
  }

  //обрабочик для смены режима с просмотра на редактирование и обратно, передаем в презентер точки маршрута
  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView()); // метод resetView() меняет форму редактирования на карточку, если режим не равен дефолтному
  };

  //метод-обработчик, который реагирует на действия пользователя, на основе которых мы должны вызвать изменения модели
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#pointsModel.updateTripEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#pointsModel.addTripEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#pointsModel.deleteTripEvent(updateType, update);
        break;
    }
  };

  //метод-обработчик, который будет реагировать на изменения модели. Когда модель будет меняться, она будет рассылать всем своим "подписчикам" "уведомления" об изменениях.
  // Если trip-events-presenter подпишется на обновления модели, будет срабатывать этот метод-обработчик
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.pointId).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderEventsList();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList({ resetSortType: true });
        this.#renderEventsList();
        break;
    }
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
    this.#noEventComponent = new NoEventView({
      filterType: this.#filterType
    });

    render(this.#noEventComponent, this.#tripEventsContainer, RenderPosition.BEFOREEND);
  }

  //метод, чтобы очистить весь список точек маршрута
  #clearEventsList({ resetSortType = false } = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
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
