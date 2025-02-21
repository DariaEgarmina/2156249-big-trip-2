import { TimeCalc } from './const';
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

function getDurationOfEvent(start, end) {
  const dateFrom = dayjs(start);
  const dateTo = dayjs(end);
  const duration = dateTo.diff(dateFrom, 'minute');

  if (duration < TimeCalc.MIN_IN_HOUR) {
    return `${duration}M`;
  } else if (duration > TimeCalc.MIN_IN_HOUR && duration < TimeCalc.MIN_IN_DAY) {
    const hours = Math.floor(duration / TimeCalc.MIN_IN_HOUR);
    const minutes = duration % TimeCalc.MIN_IN_HOUR;

    return `${hours}H ${minutes}M`;
  } else if (duration > TimeCalc.MIN_IN_DAY) {
    const minutes = duration % TimeCalc.MIN_IN_HOUR;
    const durationWithoutMin = duration - minutes;

    const days = Math.floor(durationWithoutMin / TimeCalc.MIN_IN_HOUR / TimeCalc.HOURS_IN_DAY);
    const hours = Math.floor((durationWithoutMin / TimeCalc.MIN_IN_HOUR) % TimeCalc.HOURS_IN_DAY);

    return `${days}D ${hours}H ${minutes}M`;
  }

  // через формат почему-то совсем не получалось
  // if (duration < TimeCalc.MS_IN_HOUR){
  //   return dayjs(duration).format('mm[M]');
  // } else if (duration > TimeCalc.MS_IN_HOUR && duration < TimeCalc.MS_IN_DAY) {
  //   return dayjs(duration).format('HH[H] mm[M]');
  // } else if (duration > TimeCalc.MS_IN_DAY) {
  //   return dayjs(duration).format('DD[D] HH[H] mm[M]');
  // }
}

export { getRandomArrayElement, getRandomNumber, humanizeEventDate, getDurationOfEvent };
