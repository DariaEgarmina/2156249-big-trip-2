import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter) => {
  const { type, count } = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">${type}</label>
    </div>`
  );
};

const createFiltersTemplate = (filters) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
};

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
