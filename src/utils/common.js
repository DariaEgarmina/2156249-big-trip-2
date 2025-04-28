const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const updateItem = (items, update) => items.map((item) => item.pointId === update.pointId ? update : item);

export { getRandomArrayElement, getRandomNumber, updateItem };
