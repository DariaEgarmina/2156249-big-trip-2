import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function humanizeEventDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

export { getRandomArrayElement, getRandomNumber, humanizeEventDate };
