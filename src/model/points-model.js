import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { BLANK_EVENT } from '../const.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;

  #points = [];
  #destinations = mockDestinations;
  #offers = mockOffers;
  #tripEvents = this.#points.map((point) => this.convertToTripEvent(point));

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;

    // this.#pointsApiService.points.then((points) => {
    //   console.log(points.map(this.#adaptToClient));
    // }); УДАЛИТЬ по-настоящему
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

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

  get blankTripEvent() {
    return this.convertToTripEvent({ ...BLANK_EVENT });
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
    let destinationInfo;

    if (point.id) {
      destinationInfo = this.getDestinationById(point.id);
    } else {
      destinationInfo = {
        id: '',
        description: '',
        name: '',
        pictures: []
      };
    }

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

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
      pointId: point['id'],
      // id - помни, что пока у тебя есть два вида id - id и pointId и что лишнее надо удалить
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
