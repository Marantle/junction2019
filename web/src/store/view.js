export const VIEW = {
  LANDING: 'LANDING',
  PURCHASE_HISTORY: 'PURCHASE_HISTORY',
  MAIN_CHOICE: 'MAIN_CHOICE',
  SELECT_INGREDIENT: 'SELECT_INGREDIENT'
}

const defaultState = VIEW.MAIN_CHOICE;

const CHANGE_VIEW = 'CHANGE_VIEW';

export const changeView = (view) => {
  return { type: CHANGE_VIEW, view };
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return action.view;
    default:
      return state
  }
}