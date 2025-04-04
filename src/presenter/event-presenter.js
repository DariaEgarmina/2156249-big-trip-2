import EventView from '../view/event-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import { replace, render, remove } from '../framework/render.js';

export default class EventPresenter {
  #tripEventsListComponent = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;

  #handleDataChange = null; // это св-во получит метод handleEventChange из trip-events-presenter

  constructor({ tripEventsListComponent, onDataChange }) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#handleDataChange = onDataChange; // onDataChange - это метод handleEventChange из trip-events-presenter,
    //в котором обновляем информацию о событии в массиве триппоинтс и инициализируем презентор нового события
    // в этот метод мы должны передать обновлённое событие!!!!
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

  #handleFavoriteButtonClick = () => {
    this.#handleDataChange({... this.#event, isFavorite: !this.#event.isFavorite}); // мы передаем событие, но меняем в нём значение пункта isFavorite на противоположное
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
