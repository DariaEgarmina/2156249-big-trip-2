import { render } from './framework/render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button-view.js';
import PointsApiService from './api/points-api-service.js';
import DestinationsApiService from './api/destinations-api-service.js';
import OffersApiService from './api/offers-api-service.js';

const AUTHORIZATION = 'Basic tk9f74nz31856b1';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const headerControlsContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION),
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION),
});

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
  onNewEventDestroy: handleNewEventFormClose,
});

const newEventButtonComponent = new NewEventButtonView({
  onNewEventButtonClick: handleNewEventButtonClick,
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripEventsPresenter.createTripEvent();
}

filterPresenter.init();
tripEventsPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newEventButtonComponent, headerControlsContainer);
  });
