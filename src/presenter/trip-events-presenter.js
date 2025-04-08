import EventPresenter from './event-presenter.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortEventsByPrice, sortEventsByTime } from '../utils/sort.js';
export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripEvents = [];

  #tripEventsListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();
  #sortComponent = null;

  #eventPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sourcedTripEvents = [];

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripEvents = [...this.#pointsModel.points];
    this.#sourcedTripEvents = [...this.#pointsModel.points];

    this.#renderEventsListAndSort();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedEvent);
    this.#sourcedTripEvents = updateItem(this.#sourcedTripEvents, updatedEvent);
    this.#eventPresenters
      .get(updatedEvent.pointId)
      .init(
        updatedEvent,
        this.#pointsModel.getDestinationById(updatedEvent.id),
        this.#pointsModel.getOfferByType(updatedEvent.type),
        this.#pointsModel.getOfferById(updatedEvent.type, updatedEvent.offers)
      );
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripEvents.sort(sortEventsByPrice);
        break;
      case SortType.TIME:
        this.#tripEvents.sort(sortEventsByTime);
        break;
      case SortType.DAY:
        this.#tripEvents = [... this.#sourcedTripEvents];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event, destination, offer, checkedOffers) {
    const eventPresenter = new EventPresenter({
      tripEventsListComponent: this.#tripEventsListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(event, destination, offer, checkedOffers);

    this.#eventPresenters.set(event.pointId, eventPresenter);
  }

  #renderEvents() {
    this.#tripEvents.forEach((event) =>
      this.#renderEvent(
        event,
        this.#pointsModel.getDestinationById(event.id),
        this.#pointsModel.getOfferByType(event.type),
        this.#pointsModel.getOfferById(event.type, event.offers)
      )
    );
  }

  #renderNoEvent() {
    render(this.#noEventComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

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
