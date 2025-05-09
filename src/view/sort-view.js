import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const makeElementChecked = (sortType, name) => name === sortType ? 'checked' : '';

const createSortTemplate = (sortType) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${SortType.DAY}" ${makeElementChecked(sortType, 'day')}>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortType.TIME}" ${makeElementChecked(sortType, 'time')}>
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.PRICE}" ${makeElementChecked(sortType, 'price')}>
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null; //обработчик клика на кнопки сортировки, получаем из TripEventsPresenter
  #elementToBechecked = null; //свойство для хранения актуального ти сортировки

  constructor({ onSortTypeChange, sortType }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange; //обработчик клика на кнопки сортировки, получаем из TripEventsPresenter
    this.#elementToBechecked = sortType; // получаем из TripEventsPresenter актуальный тип сортировки

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#elementToBechecked); //передаем актуальный тип сортировки, чтобы добавить атрибут checked
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
