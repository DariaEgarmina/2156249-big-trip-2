import TripEventsListView from '../view/trip-events-list-view.js';
import EventCreateFormView from '../view/event-create-form-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import EventView from '../view/event-view.js';

import { render } from '../render.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(this.tripEventsListComponent, this.tripEventsContainer);
    render(new EventEditFormView(), this.tripEventsListComponent.getElement());
    render(new EventCreateFormView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new EventView({event: this.tripPoints[i]}), this.tripEventsListComponent.getElement());
    }
  }
}
