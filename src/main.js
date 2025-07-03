//import HeaderControlsPresenter from './presenter/header-controls-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

//const headerControlsContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

// const headerControlsPresenter = new HeaderControlsPresenter({
//   headerControlsContainer: headerControlsContainer,
// });

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel: filterModel,
  pointsModel: pointsModel,
});

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsContainer,
  pointsModel: pointsModel,
});

//headerControlsPresenter.init();
filterPresenter.init();
tripEventsPresenter.init();
