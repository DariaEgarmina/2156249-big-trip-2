import Observable from '../framework/observable.js';
import { BLANK_EVENT } from '../const.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #destinationsApiService = null;
  #offersApiService = null;

  #points = [];
  #tripEvents = [];
  #destinations = [];
  #offers = [];

  constructor({ pointsApiService, destinationsApiService, offersApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsApiService = destinationsApiService;
    this.#offersApiService = offersApiService;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      // console.log(this.#points);

      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations;

      const offers = await this.#offersApiService.offers;
      this.#offers = offers;

      this.#tripEvents = this.#points.map((point) => this.convertToTripEvent(point));
    } catch (err) {
      this.#points = [];
      this.#tripEvents = [];
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

  getDestinationByDestination(destination) {
    const allDestinations = this.destinations;
    return allDestinations.find((item) => item.id === destination);
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

    if (point.destination) {
      destinationInfo = this.getDestinationByDestination(point.destination);
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
  async updateTripEvent(updateType, update) {
    const pointsIndex = this.#points.findIndex((point) => point.id === update.id);

    if (pointsIndex === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      // 1. Обновляем основной массив points
      this.#points = [
        ...this.#points.slice(0, pointsIndex),
        updatedPoint,
        ...this.#points.slice(pointsIndex + 1),
      ];

      // 2. Пересоздаем массив tripEvents из обновленных points
      this.#tripEvents = this.#points.map((point) => this.convertToTripEvent(point));

      // 3. Уведомляем с обновленным tripEvent
      const updatedTripEvent = this.convertToTripEvent(updatedPoint);
      this._notify(updateType, updatedTripEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
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
    const index = this.#tripEvents.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
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
      checkedOffers: point['offers'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
