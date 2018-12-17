import _ from "lodash";
import * as EmailValidator from "email-validator";
export const validateNotEmpty = value =>
  !value || value === undefined || _.isNull(value) ? "Заполните обязательное поле!" : undefined;
export const validateNotEmail = value =>
  !EmailValidator.validate(value) ? "Вы ввели не email!" : undefined;
export const passwordsMustMatch = (value, allValues) =>
  value !== allValues.password ? "Пароли не совпадает" : undefined;
