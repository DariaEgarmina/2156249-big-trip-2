import EventPresenter from './event-presenter.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortEventsByPrice, sortEventsByTime } from '../utils/sort.js';
export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripEvents = []; //свойство, куда мы сохраняем все точки маршрута из модели

  #tripEventsListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();
  #sortComponent = null;

  #eventPresenters = new Map(); //Коллекция для хранения отрисованных event-презентеров

  #currentSortType = SortType.DAY; //свойство для хранения текущего варианта сортировки
  #sourcedTripEvents = []; // свойство для хранения копии массива задач ДО СОРТИРОВКИ

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripEvents = [...this.#pointsModel.getTripEvents()];
    this.#sourcedTripEvents = [...this.#pointsModel.getTripEvents()]; //не забываем копировать задачи из модели в свойство для хранения копии массива задач ДО СОРТИРОВКИ

    this.#renderEventsListAndSort();
  }

  //обрабочик для смены режима с просмотра на редактирование и обратно, передаем в презентер точки маршрута
  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView()); // метод resetView() меняет форму редактирования на карточку, если режим не равен дефолтному
  };

  //метод-обработчик обновления точки маршрута
  #handleEventChange = (updatedEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedEvent); //обновляем точку маршрута в свойстве-копии точек маршрута из модели
    this.#sourcedTripEvents = updateItem(this.#sourcedTripEvents, updatedEvent); //не забываем обновить задачу также в свойстве для хранения копии массива задач ДО СОРТИРОВКИ
    this.#eventPresenters
      .get(updatedEvent.pointId)
      .init(updatedEvent);
  };

  //метод для непосредственной сортировки событий
  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripEvents.sort(sortEventsByPrice); //сортируем массив свойства this.#tripEvents, куда мы сохраняем все точки маршрута из модели
        break;
      case SortType.TIME:
        this.#tripEvents.sort(sortEventsByTime);
        break;
      case SortType.DAY:
        this.#tripEvents = [... this.#sourcedTripEvents]; //возвращаем свойство this.#tripEvents к исходному виду
    }

    this.#currentSortType = sortType;
  }

  //метод-обработчик для клика по кнопкам сортировки
  #handleSortTypeChange = (sortType) => {
    //проверяем, не является ли выбранный вариант сортировки тем, что уже был выбран
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType); //сортируем задачи
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
      onDataChange: this.#handleEventChange, //передаем в презентер точки маршрута обработчик обнавления точки маршрута
      onModeChange: this.#handleModeChange, //передаем в презентер точки маршрута обработчик смены режима с просмотра на редактирование и обратно
    });

    eventPresenter.init(event);

    this.#eventPresenters.set(event.pointId, eventPresenter); //Добавляем в коллекцию созданный презентер
  }

  #renderEvents() {
    this.#tripEvents.forEach((event) => this.#renderEvent(event));
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

    if (!this.#tripEvents.length) {
      this.#renderNoEvent();
    }

    this.#renderEvents();
  }

  #renderEventsListAndSort() {
    this.#renderEventsList();
    this.#renderSort();
  }
}
