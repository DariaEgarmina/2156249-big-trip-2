import { DateFormat } from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const humanizeEventDate = (date, format = DateFormat.EXTENDED) => date ? dayjs(date).format(format) : '';

const humanizeEventTime = (date, format = DateFormat.HOURS_MINUTES) => date ? dayjs(date).format(format) : '';

const formatEventDuration = (days, hours, minutes) => {
  let eventDuration = '';

  if (days) {
    eventDuration += `${days}D`;
  }
  if (hours) {
    eventDuration += ` ${hours}H`;
  }
  if (minutes) {
    eventDuration += ` ${minutes}M`;
  }

  return eventDuration;
};

const getEventDuration = (start, end) => {
  const eventDuration = dayjs.duration(dayjs(end).diff(dayjs(start)));

  const days = eventDuration.days();
  const hours = eventDuration.hours();
  const minutes = eventDuration.minutes();

  return formatEventDuration(days, hours, minutes);
};

export { getRandomArrayElement, getRandomNumber, humanizeEventDate, humanizeEventTime, getEventDuration };
