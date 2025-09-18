const DateFormat = {
  DAY_MONTH: 'D MMM',
  EXTENDED: 'DD/MM/YY HH:mm',
  HOURS_MINUTES: 'HH:mm',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const BLANK_EVENT = {
  type: 'flight',
  id: '',
  dateFrom: new Date(),
  dateTo: new Date(Date.now() + 3600000),
  destination: '',
  offers: [],
  basePrice: 0,
  isFavorite: false,
};

export { DateFormat, FilterType, SortType, UserAction, UpdateType, BLANK_EVENT };
