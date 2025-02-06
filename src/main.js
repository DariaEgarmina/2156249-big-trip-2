import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

import { render } from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter({ tripEventsContainer: tripEventsContainer });

render(new FiltersView(), filtersContainer);
render(new SortView(), tripEventsContainer);

tripEventsPresenter.init();
