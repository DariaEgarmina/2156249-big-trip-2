import EventView from '../view/event-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import { replace, render, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #tripEventsListComponent = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #mode = Mode.DEFAULT;

  #handleDataChange = null;
  #handleModeChange = null; //обработчик смены режима с просмотра на редактирование и обратно

  #allOffers = null;
  #allDestinations = null;

  constructor({ tripEventsListComponent, onDataChange, onModeChange, allOffers, allDestinations }) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#handleDataChange = onDataChange; //получаем из основного презентера обработчик обновления точки маршрута
    this.#handleModeChange = onModeChange; //обработчик смены режима с просмотра на редактирование и обратно
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  init(event) {
    this.#event = event;

    // Проверяем был ли вызван метод init() ранее,
    // для этого создаем 2 переменные,
    // в которые сохраняем значения this.#eventComponent и this.#eventEditComponent
    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      onRollupButtonClick: this.#handleRollupButtonClick,
      onFavoriteButtonClick: this.#handleFavoriteButtonClick,
    });

    this.#eventEditComponent = new EventEditFormView({
      event: this.#event,
      onRollupButtonClick: this.#handleRollupButtonInEditFormClick,
      onFormSubmit: this.#handleFormSubmit,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
    });

    // Проверяем был ли вызван метод init() ранее
    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#tripEventsListComponent);
      return;
    }

    // Проверяем был ли уже отрисован элемент (то есть метод init() уже вызывался),
    // чтобы не пытаться заменить то, что не было отрисовано
    // когда мы заново инициализируем вьюшки, нам нужно чтобы были отрисованы новые экземпляры, а не старые
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToEvent();
      this.#handleDataChange(this.#event); //используем обрабочик для обновления события точки маршрута
    }
  }

  #handleRollupButtonClick = () => {
    this.#replaceEventToEditForm();
  };

  //???!!! как тут поступить с this.#handleDataChange
  //обработчик нажатия на кнопку свернуть в форме
  //тут используем обрабочик для обновления события точки маршрута
  #handleRollupButtonInEditFormClick = (event) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event
    );
    this.#replaceEditFormToEvent();
  };

  //???!!! как тут поступить с this.#handleDataChange
  //обработчик нажатия на кнопку save в форме
  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event
    );
    this.#replaceEditFormToEvent();
  };

  //???!!! правильно ли я тут использовала this.#handleDataChange
  //обработчик нажатия на кнопку избранное в карточке
  //тут используем обрабочик для обновления события точки маршрута
  #handleFavoriteButtonClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      { ... this.#event, isFavorite: !this.#event.isFavorite } // мы передаем событие, но меняем в нём значение пункта isFavorite на противоположное
    );
  };

  #replaceEventToEditForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  //???!!! как тут поступить с this.#handleDataChange
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToEvent();
      this.#handleDataChange(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        this.#event
      );
    }
  };
}
