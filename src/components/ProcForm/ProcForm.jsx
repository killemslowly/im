import React from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import { saveMe } from "../../store/me/me.action";
import { getErrors } from "../../store/errors/errors.selector";
import { saveErrors } from "../../store/errors/errors.action";
import { meQuery } from "../../grapqhl/query/me";
import Form from "../Form/Form";
import "./ProcForm.css";
import { connect } from "react-redux";
import logo from "../../icon24/Menu.svg";
import proclist from "../../icon24/proclist.png";
import { getMe } from "../../store/me/me.selector";
import Menu from "../Menu/Menu";
import { NotFound } from "../404NotFound/NotFound";
import { FormErrors } from "../FormErrors/FormErrors";
import searchlogo from "../../icon24/search.svg";
import jsonData from "../../data/processes";
import ProcList from "./ProcList/ProcList";

const formName = "ProcForm";

class ProcForm extends React.PureComponent {
  static mapStateToProps = state => ({
    me: getMe(state),
    errors: getErrors(state)
  });

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      id: "",
      shown: false,
      buttontext: "Сохранить",
      procdata: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  componentDidMount() {
    this.setState({ procdata: jsonData });
  }

  componentWillMount() {
    this.props.client
      .query({
        query: meQuery
      })
      .then(response => {
        const data = response.data;
        if (data && !data.errors) {
          this.props.dispatch(saveMe(data));
          this.setState({
            firstName: this.props.me.me.me.firstName,
            lastName: this.props.me.me.me.lastName,
            email: this.props.me.me.me.email,
            id: this.props.me.me.me.id
          });
        }
      })
      .catch(response => {
        this.props.dispatch(saveErrors({ errors: response.message }));
      });
  }

  render() {
    if (!localStorage.getItem("token")) {
      return <NotFound />;
    } else {
      console.log(this.state);
      return (
        <div className="prform-bg">
          {this.state.shown ? (
            <Menu
              toggle={this.toggle.bind(this)}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
            />
          ) : null}
          <div className="prleftmenu">
            <div className="prmenubutton" onClick={this.toggle.bind(this)}>
              <img src={logo} alt="logo" /> <p>Меню</p>
            </div>
            <div className="prmenu">
              <p>Фильтр</p>
              <button className="prred">Добавить фильтр</button>
            </div>
          </div>
          <div className="prrightcontent">
            <div className="prtopcontent">
              <img src={proclist} alt="proclist" /> <p>Список процессов</p>
              <div className="prsearch">
                <img src={searchlogo} alt="searchlogo" />
                <input placeholder="Поиск по разделу" style={{ border: "none" }} />
              </div>
            </div>
            <div className="prcontent">
              <Form formSubmit={this.onFormSubmit} form={formName}>
                <div className="prfstyle">
                  <ProcList items={this.state.procdata} />
                </div>
                <FormErrors err={this.props.errors.errors} />
              </Form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(withApollo(connect(ProcForm.mapStateToProps)(ProcForm)));
