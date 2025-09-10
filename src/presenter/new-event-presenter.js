import { nanoid } from 'nanoid';
import EventCreateFormView from '../view/event-create-form-view.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';


export default class NewEventPresenter {
  #tripEventsListComponent = null;
  #newEventComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ tripEventsListComponent, onDataChange, onDestroy }) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newEventComponent !== null) {
      return;
    }

    this.#newEventComponent = new EventCreateFormView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      // allOffers: this.#allOffers,
      // allDestinations: this.#allDestinations,
    });

    render(this.#newEventComponent, this.#tripEventsListComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newEventComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newEventComponent);
    this.#newEventComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,

      { id: nanoid(), ...event },

    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
