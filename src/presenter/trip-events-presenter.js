import TripEventsListView from '../view/trip-events-list-view.js';
import EventCreateFormView from '../view/event-create-form-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import EventView from '../view/event-view.js';

import { render } from '../render.js';


export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({ tripEventsContainer }) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(this.tripEventsListComponent, this.tripEventsContainer);
    render(new EventEditFormView(), this.tripEventsListComponent.getElement());
    render(new EventCreateFormView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.tripEventsListComponent.getElement());
    }
  }
}
