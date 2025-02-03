import TripEventsListView from '../view/trip-events-list-view.js';
import EventSetupView from '../view/event-setup-view.js';
import EditPointView from '../view/edit-point-view.js';
import EventView from '../view/event-view.js';

import { render } from '../render.js';


export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({ tripEventsContainer }) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(this.tripEventsListComponent, this.tripEventsContainer);
    render(new EditPointView(), this.tripEventsListComponent.getElement());
    render(new EventSetupView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.tripEventsListComponent.getElement());
    }
  }
}
