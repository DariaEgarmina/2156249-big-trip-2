import TripEventsListView from '../view/trip-events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import NoEventView from '../view/no-event-view.js';
import { replace } from '../framework/render.js';
//import EventCreateFormView from '../view/event-create-form-view.js';

import { render } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripPoints = [];

  #tripEventsListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderEventsList();
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

  #renderEventsList() {
    if (this.#tripPoints.length === 0) {
      render(this.#noEventComponent, this.#tripEventsContainer);
    }

    render(this.#tripEventsListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderEvent(
        this.#tripPoints[i],
        this.#pointsModel.getDestinationById(this.#tripPoints[i].id),
        this.#pointsModel.getOfferByType(this.#tripPoints[i].type),
        this.#pointsModel.getOfferById(this.#tripPoints[i].type, this.#tripPoints[i].offers)
      );
    }
  }
}
