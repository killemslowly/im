import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { auth } from "./auth/auth.reducer";
import { errors } from "./errors/errors.reducer";
import { me } from "./me/me.reducer";
const rootReducer = combineReducers({
  auth,
  errors,
  me,
  form: formReducer
});
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
