import { filter } from '../utils/filter.js';

const generateFilter = (points) =>
  Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      filteredPoints: filterPoints(points),
      count: filterPoints(points).length,
    })
  );

export { generateFilter };
