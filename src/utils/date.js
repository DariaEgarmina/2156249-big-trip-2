import { DateFormat } from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const currentDate = new Date();

const DateComparison = {
  isBeforeCurrentDate: (targetDate) => dayjs(targetDate).isBefore(dayjs(currentDate)),
  isAfterCurrentDate: (targetDate) => dayjs(targetDate).isAfter(dayjs(currentDate)),
  isSameWithCurrentDate: (targetDate) => dayjs(targetDate).isSame(dayjs(currentDate)),
};

const humanizeEventDate = (date, format = DateFormat.EXTENDED) => date ? dayjs(date).format(format) : '';

const humanizeEventTime = (date, format = DateFormat.HOURS_MINUTES) => date ? dayjs(date).format(format) : '';

const formatEventDuration = (days, hours, minutes) => {
  let eventDuration = '';

  if (days) {
    eventDuration += `${days}D `;
  }
  if (hours) {
    eventDuration += `${hours}H `;
  }
  if (minutes) {
    eventDuration += `${minutes}M`;
  }

  return eventDuration.trim();
};

const getEventDuration = (start, end) => {
  const eventDuration = dayjs.duration(dayjs(end).diff(dayjs(start)));

  const days = eventDuration.days();
  const hours = eventDuration.hours();
  const minutes = eventDuration.minutes();

  return formatEventDuration(days, hours, minutes);
};

const getEventDurationInMs = (start, end) => {
  const eventDuration = dayjs.duration(dayjs(end).diff(dayjs(start)));
  return eventDuration.asMilliseconds();
};

export { humanizeEventDate, humanizeEventTime, getEventDuration, DateComparison, getEventDurationInMs };
