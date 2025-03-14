import { createElement } from '../render.js';
import { humanizeEventDate, humanizeEventTime, getEventDuration } from '../util.js';
import { DateFormat } from '../const.js';

const createCheckedOfferTemplate = (checkedOffer) => {
  const { title, price } = checkedOffer;

  return (
    `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createOfferListTemplate = (checkedOffers) => {
  if (!checkedOffers.length) {
    return '';
  }

  return (
    `<ul class="event__selected-offers">
       ${checkedOffers.map((checkedOffer) => createCheckedOfferTemplate(checkedOffer)).join('')}
    </ul>`
  );
};

const makeEventFavorite = (isFavorite) => {
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  return favoriteClassName;
};

const createEventTemplate = (event, checkedOffers) => {
  const { type, destination, basePrice, dateFrom, dateTo, isFavorite } = event;

  const date = humanizeEventDate(dateFrom, DateFormat.DAY_MONTH);
  const timeFrom = humanizeEventTime(dateFrom);
  const timeTo = humanizeEventTime(dateTo);
  const duration = getEventDuration(dateFrom, dateTo);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>

        ${createOfferListTemplate(checkedOffers)}

        <button class="event__favorite-btn  ${makeEventFavorite(isFavorite)}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventView {
  constructor({ event = {}, checkedOffers = [] } = {}) {
    this.event = event;
    this.checkedOffers = checkedOffers;
  }

  getTemplate() {
    return createEventTemplate(this.event, this.checkedOffers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
