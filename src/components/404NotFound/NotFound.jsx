import React from "react";
import { LogoComponent } from "../LogoComponent/LogoComponent";
import "./NotFound.css";

export class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="App-b">
        <LogoComponent />
        <div className="App-pl">
          <p>404 Not Found</p>
        </div>
      </div>
    );
  }
}
