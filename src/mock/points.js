import { getRandomArrayElement, getRandomNumber } from '../utils/common.js';

const mockPoints = [
  {
    id: '1',
    basePrice: getRandomNumber(10, 1100),
    dateFrom: '2024-01-14T16:30:17.845Z',
    dateTo: '2024-01-14T17:00:34.375Z',
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
    dateFrom: '2025-03-17T00:30:00.845Z',
    dateTo: '2025-03-31T03:00:00.375Z',
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
    dateFrom: '2025-03-27T18:15:36.845Z',
    dateTo: '2025-03-28T21:00:47.375Z',
    destination: 'Novosibirsk',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  }
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export { getRandomPoint };
