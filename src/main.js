import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsContainer,
  pointsModel: pointsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FiltersView({filters}), filtersContainer);
render(new SortView(), tripEventsContainer);

tripEventsPresenter.init();
