import { getRandomPoint } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';

const POINTS_COUNT = 3;

export default class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getRandomPoint);
  destinations = mockDestinations;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    const allDestinations = this.getDestinations();
    return allDestinations.find((item) => item.id === id);
  }
}
