import { getRandomArrayElement, getRandomNumber } from '../util.js';

const mockPoints = [
  {
    id: '1',
    basePrice: getRandomNumber(10, 1100),
    dateFrom: '2024-02-14T16:30:11.845Z',
    dateTo: '2024-02-14T17:00:13.375Z',
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
    dateFrom: '2024-02-15T16:30:11.845Z',
    dateTo: '2024-02-16T17:00:13.375Z',
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
    dateFrom: '2024-02-27T16:30:11.845Z',
    dateTo: '2024-02-28T17:00:13.375Z',
    destination: 'Novosibirsk',
    isFavorite: false,
    offers: [],
    type: 'Sightseeing'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
