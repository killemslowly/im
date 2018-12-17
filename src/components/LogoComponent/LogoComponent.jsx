import React, { Component } from "react";
import "./App-logo.css";
import logo from "../../icon24/Vector.svg";

export class LogoComponent extends Component {
  render() {
    return <img src={logo} className="App-logo" alt="logo" />;
  }
}
