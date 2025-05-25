import NewEventButtonView from '../view/new-event-button-view.js';
import { render } from '../framework/render.js';

export default class HeaderControlsPresenter {
  #headerControlsContainer = null;

  #newEventButtonComponent = null;

  constructor({ headerControlsContainer }) {
    this.#headerControlsContainer = headerControlsContainer;
  }

  init() {
    this.#renderHeaderControls();
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      onNewEventButtonClick: this.#handleNewEventButtonClick,
    });

    render(this.#newEventButtonComponent, this.#headerControlsContainer);
  }

  #renderHeaderControls() {
    this.#renderNewEventButton();
  }

  #handleNewEventButtonClick = () => {
    // в списке событий trip-events-list-view на первой строке появляется
    // форма создания карточки event-create-form-view
    //console.log('click');
  };
}
