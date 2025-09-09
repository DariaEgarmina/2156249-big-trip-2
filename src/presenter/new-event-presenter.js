// export default class NewEventPresenter {
//   #filterContainer = null;
//   #filterModel = null;
//   #pointsModel = null;

//   #filterComponent = null;

//   constructor({ filterContainer, filterModel, pointsModel }) {
//     this.#filterContainer = filterContainer;
//     this.#filterModel = filterModel;
//     this.#pointsModel = pointsModel;

//     this.#pointsModel.addObserver(this.#handleModelEvent); // еще раз разобраться как работает эта часть
//     this.#filterModel.addObserver(this.#handleModelEvent);
//   }

//   get filters() {
//     const tripEvents = this.#pointsModel.tripEvents;

//     return Object.values(FilterType).map((type) => ({
//       type,
//       count: filter[type](tripEvents).length
//     }));
//   }

//   init() {
//     const filters = this.filters;
//     const prevFilterComponent = this.#filterComponent;

//     this.#filterComponent = new FiltersView({
//       filters: filters,
//       currentFilterType: this.#filterModel.filter,
//       onFilterTypeChange: this.#handleFilterTypeChange,
//     });

//     if (prevFilterComponent === null) {
//       render(this.#filterComponent, this.#filterContainer);
//       return;
//     }

//     replace(this.#filterComponent, prevFilterComponent);
//     remove(prevFilterComponent);
//   }

//   #handleModelEvent = () => {
//     this.init(); //вызываем переинициализацию нашего презентера
//   };

//   #handleFilterTypeChange = (filterType) => {
//     if (this.#filterModel.filter === filterType) {
//       return;
//     }

//     this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
//   };
// }
