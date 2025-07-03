import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';
import FiltersView from '../view/filters-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null; // <-- нужен, чтобы проверить, был ли вызван метод init() ранее

  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent); // еще раз разобраться как работает эта часть
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const tripEvents = this.#pointsModel.tripEvents;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](tripEvents).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters: filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
