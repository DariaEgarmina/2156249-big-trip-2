import { render } from './framework/render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button-view.js';

const headerControlsContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel: filterModel,
  pointsModel: pointsModel,
});

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsContainer,
  pointsModel: pointsModel,
  filterModel: filterModel,
});

const handleNewEventButtonClick = () => {
  console.log('Я работаю! Ура!');
};

const newEventButtonComponent = new NewEventButtonView({
  onNewEventButtonClick: handleNewEventButtonClick,
});

render(newEventButtonComponent, headerControlsContainer);

filterPresenter.init();
tripEventsPresenter.init();
