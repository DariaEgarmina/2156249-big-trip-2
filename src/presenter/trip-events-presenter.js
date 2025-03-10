import TripEventsListView from '../view/trip-events-list-view.js';
import EventCreateFormView from '../view/event-create-form-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import EventView from '../view/event-view.js';

import { render } from '../framework/render.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({ tripEventsContainer, pointsModel }) { //Параметр констурктора - объект. Чтобы передавать весь объект и затем обращаться к его свойствам, мы сразу “распаковываем” эти свойства через { tripEventsContainer, pointsModel }.
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(this.tripEventsListComponent, this.tripEventsContainer);


    render(new EventEditFormView({
      event: this.tripPoints[0],
      destination: this.pointsModel.getDestinationById(this.tripPoints[0].id),
      offer: this.pointsModel.getOfferByType(this.tripPoints[0].type), //<-это объект с двумя ключами type и offers
      checkedOffers: this.pointsModel.getOfferById(this.tripPoints[0].type, this.tripPoints[0].offers), // <-это массив из объектов
    }), this.tripEventsListComponent.element);

    render(new EventCreateFormView({
      event: this.tripPoints[1],
      destination: this.pointsModel.getDestinationById(this.tripPoints[1].id),
      offer: this.pointsModel.getOfferByType(this.tripPoints[1].type),
      checkedOffers: this.pointsModel.getOfferById(this.tripPoints[1].type, this.tripPoints[1].offers),
    }), this.tripEventsListComponent.element);

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new EventView({
        event: this.tripPoints[i],
        checkedOffers: this.pointsModel.getOfferById(this.tripPoints[i].type, this.tripPoints[i].offers),
      }), this.tripEventsListComponent.element);
    }
  }
}
