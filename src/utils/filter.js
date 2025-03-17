import { FilterType } from '../const.js';
import { DateComparison } from './date.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => DateComparison.isAfterCurrentDate(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => (DateComparison.isBeforeCurrentDate(point.dateFrom)
    || DateComparison.isSameWithCurrentDate(point.dateFrom))
    && (DateComparison.isAfterCurrentDate(point.dateTo)
    || DateComparison.isSameWithCurrentDate(point.dateTo))),
  [FilterType.PAST]: (points) => points.filter((point) => DateComparison.isBeforeCurrentDate(point.dateTo)),
};

export { filter };
