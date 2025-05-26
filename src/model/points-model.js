import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

const POINTS_COUNT = 3;

export default class PointsModel extends Observable {
  #points = Array.from({ length: POINTS_COUNT }, getRandomPoint);
  #tripEvents = this.#points.map((point) => this.convertToTripEvent(point));
  #destinations = mockDestinations;
  #offers = mockOffers;

  get points() {
    return this.#points;
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getDestinationById(id) {
    const allDestinations = this.destinations;
    return allDestinations.find((item) => item.id === id);
  }

  getOfferByType(type) {
    const allOffers = this.offers;
    return allOffers.find((item) => item.type === type);
  }

  getOfferById(type, offerIds) {
    const offerByType = this.getOfferByType(type);
    return offerByType.offers.filter((item) => offerIds.find((id) => item.id === id));
  }

  convertToTripEvent(point) {
    const destinationInfo = this.getDestinationById(point.id);
    const allOffers = this.getOfferByType(point.type);
    const checkedOffers = this.getOfferById(point.type, point.offers);
    return {
      ...point,
      allOffers: allOffers.offers,
      checkedOffers: checkedOffers,
      destinationInfo: destinationInfo,
    };
  }

  //Метод для обновления точки маршрута - функционал из презентера перенесли в модель
  updateTripEvent(updateType, update) {
    const index = this.#tripEvents.findIndex((event) => event.pointId === update.pointId);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#tripEvents = [
      ...this.#tripEvents.slice(0, index),
      update,
      ...this.#tripEvents.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  // метод для добавления точки маршрута
  addTripEvent(updateType, update) {
    this.#tripEvents = [
      update,
      ...this.#tripEvents,
    ];

    this._notify(updateType, update);
  }

  //метод для удаления точки маршрута
  deleteTripEvent(updateType, update) {
    const index = this.#tripEvents.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#tripEvents = [
      ...this.#tripEvents.slice(0, index),
      ...this.#tripEvents.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
