import TripEventsListView from '../view/trip-events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { replace, render, RenderPosition } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripPoints = [];

  #tripEventsListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();
  #sortComponent = new SortView();

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderEventsList();
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event, destination, offer, checkedOffers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event,
      checkedOffers,

      onRollupButtonClick: () => {
        replaceEventToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EventEditFormView({
      event,
      destination,
      offer,
      checkedOffers,

      onRollupButtonClick: () => {
        replaceEditFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },

      onFormSubmit: () => {
        replaceEditFormToEvent();
      }
    });

    function replaceEventToEditForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceEditFormToEvent() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#tripEventsListComponent.element);
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

  #renderEventsList() {
    render(this.#tripEventsListComponent, this.#tripEventsContainer);

    if (!this.#tripPoints.length) {
      this.#renderNoEvent();
    }

    this.#renderEvents();

    this.#renderSort();
  }
}
