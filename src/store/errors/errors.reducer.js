import { SAVE_ERRORS } from "./errors.action";
export function errors(state = {}, action) {
  switch (action.type) {
    case SAVE_ERRORS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
