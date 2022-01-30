import { SET_ALERT, REMOVE_ALERT } from "../types";
const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
    case REMOVE_ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
