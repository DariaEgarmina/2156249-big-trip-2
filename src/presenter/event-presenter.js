import EventView from '../view/event-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import { replace, render, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #tripEventsListComponent = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #mode = Mode.DEFAULT;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({ tripEventsListComponent, onDataChange, onModeChange }) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event, destination, offer, checkedOffers) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      checkedOffers,
      onRollupButtonClick: this.#handleRollupButtonClick,
      onFavoriteButtonClick: this.#handleFavoriteButtonClick,
    });

    this.#eventEditComponent = new EventEditFormView({
      event: this.#event,
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToEvent();
    }
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

  #handleFavoriteButtonClick = () => {
    this.#handleDataChange({... this.#event, isFavorite: !this.#event.isFavorite}); // мы передаем событие, но меняем в нём значение пункта isFavorite на противоположное
  };

  #replaceEventToEditForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToEvent();
    }
  };
}
