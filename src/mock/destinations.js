import { descriptions } from './description.js';
import { getRandomArrayElement, getRandomNumber } from '../util.js';

const mockDestinations = [
  {
    id: '1',
    description: getRandomArrayElement(descriptions),
    name: 'Moscow',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      }
    ]
  },
  {
    id: '6',
    description: getRandomArrayElement(descriptions),
    name: 'Saint Petersburg',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      }
    ]
  },
  {
    id: '5',
    description: getRandomArrayElement(descriptions),
    name: 'Sochi',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      }
    ]
  },
  {
    id: '4',
    description: getRandomArrayElement(descriptions),
    name: 'Voronezh',
    pictures: []
  },
  {
    id: '3',
    description: getRandomArrayElement(descriptions),
    name: 'Novosibirsk',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      }
    ]
  },
  {
    id: '2',
    description: getRandomArrayElement(descriptions),
    name: 'Vladivostok',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptions)
      }
    ]
  }
];

export { mockDestinations };
