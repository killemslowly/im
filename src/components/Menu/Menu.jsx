import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import proceset from "../../icon24/proceset.png";
import procmenu from "../../icon24/procmenu.png";
import usermenu from "../../icon24/usermenu.png";
import iconproceset from "../../icon24/iconproceset.png";

class Menu extends React.PureComponent {
  unauth() {
    localStorage.removeItem("token");
  }

  render() {
    return (
      <div className="lmenu">
        <div className="lmenubutton" onClick={this.props.toggle}>
          <img src={iconproceset} alt="iconproceset" /> <img src={proceset} alt="proceset" />
        </div>
        <div className="lmenucontect">
          <Link to={`/update`}>
            <div className="menuitem">
              <img src={usermenu} alt="usermenu" />
              <p>
                {this.props.firstName} {this.props.lastName}
              </p>
            </div>
          </Link>
          <Link to={`/proc`}>
            <div className="menuitem">
              <img src={procmenu} alt="procmenu" />
              <p>Общие данные</p>
            </div>
          </Link>
          <Link to={`/`}>
            <div className="menuitem" onClick={this.unauth}>
              <p>Выход</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
export default Menu;
