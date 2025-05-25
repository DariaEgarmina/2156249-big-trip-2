import { getEventDurationInMs } from './date.js';

const sortEventsByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;
const sortEventsByTime = (eventA, eventB) => getEventDurationInMs(eventB.dateFrom, eventB.dateTo) - getEventDurationInMs(eventA.dateFrom, eventA.dateTo);

export { sortEventsByPrice, sortEventsByTime };
