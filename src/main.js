import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

// import { render } from './render.js';
import { render } from './framework/render.js';

import PointsModel from './model/points-model.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsContainer,
  pointsModel: pointsModel,
}); //в современном JavaScript, если имя свойства совпадает с именем переменной, можно опустить второе имя (сокращённая запись)

render(new FiltersView(), filtersContainer);
render(new SortView(), tripEventsContainer);

tripEventsPresenter.init();
