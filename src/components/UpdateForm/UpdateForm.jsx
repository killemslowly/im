import React from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import { saveMe } from "../../store/me/me.action";
import { getErrors } from "../../store/errors/errors.selector";
import { saveErrors } from "../../store/errors/errors.action";
import { updateMutate } from "../../grapqhl/mutation/update";
import { meQuery } from "../../grapqhl/query/me";
import Form from "../Form/Form";
import "./UpdateForm.css";
import { formValueSelector, Field } from "redux-form";
import { connect } from "react-redux";
import { validateNotEmpty, validateNotEmail } from "../../utilities/validates";
import { InputField } from "../Form/InputField/InputField";
import logo from "../../icon24/Menu.svg";
import { getMe } from "../../store/me/me.selector";
import Menu from "./../Menu/Menu";
import { NotFound } from "./../404NotFound/NotFound";
import { FormErrors } from "../FormErrors/FormErrors";

const formName = "UpdateForm";
const selector = formValueSelector(formName);

class UpdateForm extends React.PureComponent {
  static mapStateToProps = state => ({
    formValues: selector(state, "name", "email"),
    me: getMe(state),
    errors: getErrors(state)
  });

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      id: "",
      shown: false,
      buttontext: "Сохранить"
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.timer = this.timer.bind(this);
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  timer() {
    if (this.state.buttontext === "Сохранить") this.setState({ buttontext: "Сохранено" });
    else this.setState({ buttontext: "Сохранить" });
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
          console.log(this.state);
        }
      })
      .catch(response => {
        this.props.dispatch(saveErrors({ errors: response.message }));
      });
  }

  onFormSubmit(values) {
    var obj = Object.assign({ id: this.state.id }, values);
    console.log("Отправляемые на сервер данные:", obj);
    this.props.client
      .mutate({
        mutation: updateMutate,
        variables: obj
      })
      .then(response => {
        const data = response.data;
        if (data && !data.errors) {
          console.log("Ответ с сервера:", data);
          this.timer();
        }
      })
      .catch(response => {
        this.props.dispatch(saveErrors({ errors: response.message }));
      });
    setTimeout(this.timer(), 3000);
  }

  render() {
    if (!localStorage.getItem("token")) {
      return <NotFound />;
    } else {
      console.log(this.state.shown);
      return (
        <div className="upform-bg">
          {this.state.shown ? (
            <Menu
              toggle={this.toggle.bind(this)}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
            />
          ) : null}
          <div className="upleftmenu">
            <div className="upmenubutton" onClick={this.toggle.bind(this)}>
              <img src={logo} alt="logo" /> <p>Меню</p>
            </div>
            <div className="upmenu">
              <div className="upleftmenuitem">
                <p>Общие данные</p>
              </div>
            </div>
          </div>
          <div className="uprightcontent">
            <div className="uptopcontent" />
            <div className="upcontent">
              <Form formSubmit={this.onFormSubmit} form={formName}>
                <div className="upred">
                  <p className="upredtext">
                    {this.state.firstName} {this.state.lastName}. Редактирование
                    <button type="submit">{this.state.buttontext}</button>
                  </p>
                </div>
                <div className="upfstyle">
                  <div className="upinput-w">
                    <label>Имя:</label>
                    <Field
                      name="firstName"
                      component={InputField}
                      type="text"
                      label="Имя"
                      val={this.state.firstName}
                      fieldstyle="uppass"
                      onChange={e => this.handleChange(e)}
                      validate={validateNotEmpty}
                    />
                  </div>
                  <div className="upinput-w">
                    <label>Фамилия:</label>
                    <Field
                      name="lastName"
                      val={this.state.lastName}
                      component={InputField}
                      type="text"
                      label="Фамилия"
                      fieldstyle="uppass"
                      onChange={e => this.handleChange(e)}
                      validate={validateNotEmpty}
                    />
                  </div>
                  <div className="upinput-w">
                    <label>Электронная почта:</label>
                    <Field
                      name="email"
                      val={this.state.email}
                      component={InputField}
                      type="email"
                      label="Email"
                      fieldstyle="uppass"
                      onChange={e => this.handleChange(e)}
                      validate={[validateNotEmpty, validateNotEmail]}
                    />
                  </div>
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

export default withRouter(withApollo(connect(UpdateForm.mapStateToProps)(UpdateForm)));
