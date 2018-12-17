import React from "react";

export const InputField = ({
  input,
  label,
  type,
  fieldstyle,
  val,
  disabled,
  meta: { touched, error }
}) => (
  <div>
    <input
      {...input}
      placeholder={label}
      type={type}
      className={fieldstyle}
      value={val}
      disabled={disabled}
    />
    {touched && (error && <span style={{ color: "red" }}>{error}</span>)}
  </div>
);
