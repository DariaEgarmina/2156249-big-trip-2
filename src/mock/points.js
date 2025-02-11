import { getRandomArrayElement, getRandomNumber } from '../util.js';

const mockPoints = [
  {
    id: '1',
    basePrice: getRandomNumber(10, 1100),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'Moscow',
    isFavorite: true,
    offers: [
      '12',
      '13',
      '15'
    ],
    type: 'taxi'
  },
  {
    id: '2',
    basePrice: getRandomNumber(10, 1100),
    dateFrom: '2019-08-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: 'Vladivostok',
    isFavorite: false,
    offers: [
      '21',
      '22',
      '23'
    ],
    type: 'bus'
  },
  {
    id: '3',
    basePrice: getRandomNumber(10, 1100),
    dateFrom: '2019-06-10T22:55:56.845Z',
    dateTo: '2019-06-11T11:22:13.375Z',
    destination: 'Novosibirsk',
    isFavorite: false,
    offers: [],
    type: 'Sightseeing'
  }
];

function getRandomPoints() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoints };
