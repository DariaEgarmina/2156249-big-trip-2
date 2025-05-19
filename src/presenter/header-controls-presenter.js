import NewEventButtonView from '../view/new-event-button-view.js';
import { render } from '../framework/render.js';

export default class HeaderControlsPresenter {
  #headerControlsContainer = null;

  #newEventButtonComponent = new NewEventButtonView();

  constructor({ headerControlsContainer }) {
    this.#headerControlsContainer = headerControlsContainer;
  }

  init() {
    this.#renderHeaderControls();
  }

  #renderHeaderControls() {
    render(this.#newEventButtonComponent, this.#headerControlsContainer);
  }
}
