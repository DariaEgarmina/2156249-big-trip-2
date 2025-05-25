import { getRandomPoint } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

const POINTS_COUNT = 3;

export default class PointsModel {
  #points = Array.from({ length: POINTS_COUNT }, getRandomPoint);
  #destinations = mockDestinations;
  #offers = mockOffers;

  get points() {
    return this.#points;
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

  get tripEvents() {
    const allPoints = this.points;

    const tripEvents = allPoints.map((point) => {
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
    );

    return tripEvents;
  }
}
