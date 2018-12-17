import React from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import { getAuthToken } from "../../store/auth/auth.selector";
import { saveToken } from "../../store/auth/auth.action";
import { getErrors } from "../../store/errors/errors.selector";
import { saveErrors } from "../../store/errors/errors.action";
import { registerMutate } from "../../grapqhl/mutation/register";
import Form from "../Form/Form";
import "./RegForm.css";
import { formValueSelector, Field } from "redux-form";
import { connect } from "react-redux";
import { validateNotEmpty, validateNotEmail, passwordsMustMatch } from "../../utilities/validates";
import { InputField } from "../Form/InputField/InputField";
import { LogoComponent } from "../LogoComponent/LogoComponent";
import { FormErrors } from "../FormErrors/FormErrors";

const formName = "RegForm";
const selector = formValueSelector(formName);

class RegForm extends React.PureComponent {
  static mapStateToProps = state => ({
    formValues: selector(state, "email", "password"),
    token: getAuthToken(state),
    errors: getErrors(state)
  });

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(values) {
    this.props.client
      .mutate({
        mutation: registerMutate,
        variables: values
      })
      .then(response => {
        const data = response.data;
        if (data && !data.errors) {
          this.props.dispatch(saveToken({ token: data && data.register && data.register.token }));
          localStorage.setItem("token", data && data.register && data.register.token);
          this.props.history.push("/update");
        }
      })
      .catch(response => {
        this.props.dispatch(saveErrors({ errors: response.message }));
      });
  }

  render() {
    return (
      <div className="App-bg">
        <LogoComponent />
        <Form formSubmit={this.onFormSubmit} formstyle="App-plashka" form={formName}>
          <h3 className="zagH">Задайте электронную почту и пароль для администратора системы</h3>
          <Field
            name="admin"
            component={InputField}
            type="text"
            label="Администратор"
            fieldstyle="App-pass"
            disabled="disabled"
          />
          <Field
            name="email"
            component={InputField}
            type="email"
            label="Электронная почта"
            fieldstyle="App-pass"
            validate={[validateNotEmpty, validateNotEmail]}
          />
          <Field
            name="password"
            component={InputField}
            type="password"
            label="Введите пароль"
            fieldstyle="App-pass"
            validate={validateNotEmpty}
          />
          <Field
            name="passwordtwo"
            component={InputField}
            type="password"
            label="Повторите пароль"
            fieldstyle="App-pass"
            validate={[validateNotEmpty, passwordsMustMatch]}
          />
          <button className="App-button" type="submit">
            Применить и войти
          </button>
          <FormErrors err={this.props.errors.errors} />
        </Form>
      </div>
    );
  }
}

export default withRouter(withApollo(connect(RegForm.mapStateToProps)(RegForm)));
