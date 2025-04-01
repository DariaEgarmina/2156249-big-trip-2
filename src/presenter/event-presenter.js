import EventView from '../view/event-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import { replace, render, remove } from '../framework/render.js';

export default class EventPresenter {
  #tripEventsListComponent = null;

  #eventComponent = null;
  #eventEditComponent = null;

  constructor({ tripEventsListComponent }) {
    this.#tripEventsListComponent = tripEventsListComponent;
  }

  init(event, destination, offer, checkedOffers) {
    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

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

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#tripEventsListComponent);
      return;
    }

    if (this.#tripEventsListComponent.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#tripEventsListComponent.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
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
