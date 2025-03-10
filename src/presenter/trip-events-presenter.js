import TripEventsListView from '../view/trip-events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import { replace } from '../framework/render.js';
//import EventCreateFormView from '../view/event-create-form-view.js';

import { render } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripPoints = [];

  #tripEventsListComponent = new TripEventsListView();

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    render(this.#tripEventsListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderEvent(this.#tripPoints[i], this.#pointsModel.getOfferById(this.#tripPoints[i].type, this.#tripPoints[i].offers));
    }
  }

  #renderEvent(event, checkedOffers) {
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
      event: this.#tripPoints[0],
      destination: this.#pointsModel.getDestinationById(this.#tripPoints[0].id),
      offer: this.#pointsModel.getOfferByType(this.#tripPoints[0].type), //<-это объект с двумя ключами type и offers
      checkedOffers: this.#pointsModel.getOfferById(this.#tripPoints[0].type, this.#tripPoints[0].offers), // <-это массив из объектов

      onRollupButtonClick: () => {
        replaceEditFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
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
}
