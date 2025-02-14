import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function humanizeEventDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

export { getRandomArrayElement, getRandomNumber, humanizeEventDate };
