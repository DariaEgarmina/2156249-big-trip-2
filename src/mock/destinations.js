import { descriptionArray } from './description.js';
import { getRandomArrayElement, getRandomNumber } from '../util.js';

const mockDestinations = [
  {
    id: '1',
    description: getRandomArrayElement(descriptionArray),
    name: 'Moscow',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      }
    ]
  },
  {
    id: '112',
    description: getRandomArrayElement(descriptionArray),
    name: 'Saint Petersburg',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      }
    ]
  },
  {
    id: '113',
    description: getRandomArrayElement(descriptionArray),
    name: 'Sochi',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      }
    ]
  },
  {
    id: '114',
    description: getRandomArrayElement(descriptionArray),
    name: 'Voronezh',
    pictures: []
  },
  {
    id: '3',
    description: getRandomArrayElement(descriptionArray),
    name: 'Novosibirsk',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      }
    ]
  },
  {
    id: '2',
    description: getRandomArrayElement(descriptionArray),
    name: 'Vladivostok',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 100)}`,
        description: getRandomArrayElement(descriptionArray)
      }
    ]
  }
];

export { mockDestinations };
