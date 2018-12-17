import React from "react";
import attention from "../../icon24/attention.png";
import "./FormErrors.css"

export const FormErrors = ({ err }) => {
  if (err) {
    return (
      <div className="formErrors">
        <img src={attention} className="Attention" alt="Attantion! Server Errors!" />
        <p>{JSON.stringify(err)}</p>
      </div>
    );
  } else {
    return "";
  }
};
