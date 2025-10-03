import EventCreateFormView from '../view/event-create-form-view.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';


export default class NewEventPresenter {
  #event = null;

  #tripEventsListComponent = null;
  #newEventComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  #allOffers = null;
  #allDestinations = null;

  constructor({ tripEventsListComponent, onDataChange, onDestroy, allOffers, allDestinations }) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  init(event) {
    this.#event = event;
    const offers = this.#allOffers();
    const destinations = this.#allDestinations();

    if (this.#newEventComponent !== null) {
      return;
    }

    this.#newEventComponent = new EventCreateFormView({
      event: this.#event,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      allOffers: offers,
      allDestinations: destinations,
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

  setSaving() {
    this.#newEventComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newEventComponent.shake(resetFormState);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
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
