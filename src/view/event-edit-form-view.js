import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEventDate } from '../utils/date.js';
import { createPhotoListTemplate } from './event-create-form-view.js';

const createOfferTemplate = (offer, checkedOffers) => {
  const { id, title, price } = offer;
  const isChecked = checkedOffers.some((item) => item.id === id) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id=${id} type="checkbox" name=${id} ${isChecked}>
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferListTemplate = (offers, checkedOffers) => {
  if (!offers.length) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => createOfferTemplate(offer, checkedOffers)).join('')}
      </div>
    </section>`
  );
};

const createDestinationTemplate = (destination) => `<option value="${destination.name}"></option>`;

const createAllDestinationsTemplate = (allDestinations) =>
  `<datalist id="destination-list-1">
      ${allDestinations.map((destination) => createDestinationTemplate(destination)).join('')}
  </datalist>`;


const createEventEditFormTemplate = (event, allDestinations) => {
  const { type, basePrice, dateFrom, dateTo, checkedOffers, allOffers, destination, destinationInfo } = event;
  const { description, pictures } = destinationInfo;

  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>

                  <div class="event__type-item">
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">

              ${createAllDestinationsTemplate(allDestinations)}
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDate(dateTo)}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" step="1" min="0">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">

            ${createOfferListTemplate(allOffers, checkedOffers)}

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>

              ${createPhotoListTemplate(pictures)}
            </section>
          </section>
        </form>
      </li>`
  );
};

export default class EventEditFormView extends AbstractStatefulView {
  #event = null;
  #handleRollupButtonClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;

  #allOffers = null;
  #allDestinations = null;

  #startDatepicker = null;
  #endDatepicker = null;

  constructor({ event = {}, onRollupButtonClick, onFormSubmit, onDeleteClick, allOffers = [], allDestinations = [] } = {}) {
    super();
    this.#event = event;
    this._setState(event);

    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditFormTemplate(this._state, this.#allDestinations);
  }

  reset(event) {
    this.updateElement(event);
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offerChangeHandler);
    }

    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick(this.#event); // !!! передаю изначальные данные, чтобы при закрытии формы на кнопку свернуть, изменения не сохранялись
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this.#event); // <-- передаю событие, которые изначально было в карточке
  };

  #typeChangeHandler = (evt) => {
    const value = evt.target.value;
    if (!value) {
      return;
    }

    evt.preventDefault();

    const offersByType = this.#allOffers.find((offer) => offer.type === value).offers;

    this.updateElement({
      type: value,
      allOffers: [...offersByType],
      checkedOffers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;

    const newDestination = this.#allDestinations.find((item) => item.name === value);

    //подумать, как сделать, когда пункта назначения нет в списке
    if (!newDestination) {
      return;
    }

    this.updateElement({
      destination: value,
      id: newDestination.id,
      destinationInfo: {
        id: newDestination.id,
        description: newDestination.description,
        name: newDestination.name,
        pictures: [...newDestination.pictures],
      }
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const value = evt.target.value;

    if (!value) {
      this.updateElement({
        basePrice: 0,
      });
    } else {
      this.updateElement({
        basePrice: Number(value),
      });
    }
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const offerId = evt.target.id;
    const isChecked = evt.target.checked;

    let updatedOffers = [...this._state.checkedOffers];
    const offerToUpdate = this._state.allOffers.find((offer) => offer.id === offerId);

    if (isChecked) {
      if (!updatedOffers.some((offer) => offer.id === offerId)) {
        updatedOffers.push(offerToUpdate);
      }
    } else {
      updatedOffers = updatedOffers.filter((offer) => offer.id !== offerId);
    }

    this.updateElement({
      checkedOffers: updatedOffers
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setStartDatepicker() {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
  }

  #setEndDatepicker() {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  static parseEventToState(event) {
    return { ...event };
  }

  static parseStateToEvent(state) {
    return { ...state };
  }
}

export { createOfferListTemplate, createAllDestinationsTemplate };
