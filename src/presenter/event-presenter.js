import EventView from '../view/event-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import { replace, render } from '../framework/render.js';

export default class EventPresenter {
  #tripEventsListComponent = null;

  #eventComponent = null;
  #eventEditComponent = null;

  constructor({ tripEventsListComponent }) {
    this.#tripEventsListComponent = tripEventsListComponent;
  }

  init(event, destination, offer, checkedOffers) {
    this.#eventComponent = new EventView({
      event,
      checkedOffers,
      onRollupButtonClick: this.#handleRollupButtonClick,
    });

    this.#eventEditComponent = new EventEditFormView({
      event,
      destination,
      offer,
      checkedOffers,

      onRollupButtonClick: this.#handleRollupButtonInEditFormClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    render(this.#eventComponent, this.#tripEventsListComponent);
  }

  #handleRollupButtonClick = () => {
    this.#replaceEventToEditForm();
  };

  #handleRollupButtonInEditFormClick = () => {
    this.#replaceEditFormToEvent();
  };

  #handleFormSubmit = () => {
    this.#replaceEditFormToEvent();
  };

  #replaceEventToEditForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToEvent();
    }
  };
}
