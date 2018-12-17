import { SAVE_ME } from "./me.action";
export function me(state = {}, action) {
  switch (action.type) {
    case SAVE_ME:
      return {
        ...state,
        me: action.payload
      };
    default:
      return state;
  }
}
