import EventPresenter from './event-presenter.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripPoints = [];

  #tripEventsListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();
  #sortComponent = new SortView();

  #eventPresenters = new Map();

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderEventsList();
  }

  #handleEventChange = (updatedEvent) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedEvent);
    this.#eventPresenters
      .get(updatedEvent.pointId)
      .init(
        updatedEvent,
        this.#pointsModel.getDestinationById(updatedEvent.id),
        this.#pointsModel.getOfferByType(updatedEvent.type),
        this.#pointsModel.getOfferById(updatedEvent.type, updatedEvent.offers)
      );
  };

  #renderSort() {
    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event, destination, offer, checkedOffers) {
    const eventPresenter = new EventPresenter({
      tripEventsListComponent: this.#tripEventsListComponent.element,
      onDataChange: this.#handleEventChange,
    });

    eventPresenter.init(event, destination, offer, checkedOffers);

    this.#eventPresenters.set(event.pointId, eventPresenter);
  }

  #renderEvents() {
    this.#tripPoints.forEach((point) =>
      this.#renderEvent(
        point,
        this.#pointsModel.getDestinationById(point.id),
        this.#pointsModel.getOfferByType(point.type),
        this.#pointsModel.getOfferById(point.type, point.offers)
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

    if (!this.#tripPoints.length) {
      this.#renderNoEvent();
    }

    this.#renderEvents();

    this.#renderSort();
  }
}
