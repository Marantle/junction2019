export const VIEW = {
  MAIN: 'MAIN',
}

const defaultState = VIEW.MAIN;

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