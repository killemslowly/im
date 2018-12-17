import { SAVE_TOKEN } from "./auth.action";
export function auth(state = {}, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
