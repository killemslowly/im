import React from "react";
import { Link } from "react-router-dom";
import { formValueSelector, Field } from "redux-form";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import { getAuthToken } from "../../store/auth/auth.selector";
import { saveToken } from "../../store/auth/auth.action";
import { getErrors } from "../../store/errors/errors.selector";
import { saveErrors } from "../../store/errors/errors.action";
import { loginMutate } from "../../grapqhl/mutation/login";
import { validateNotEmpty, validateNotEmail } from "../../utilities/validates";
import Form from "../Form/Form";
import { InputField } from "../Form/InputField/InputField";
import { LogoComponent } from "../LogoComponent/LogoComponent";
import { FormErrors } from "../FormErrors/FormErrors";
import "./AuthForm.css";

const formName = "AuthForm";
const selector = formValueSelector(formName);

class AuthForm extends React.PureComponent {
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
        mutation: loginMutate,
        variables: values
      })
      .then(response => {
        const data = response.data;
        if (data && !data.errors) {
          this.props.dispatch(saveToken({ token: data && data.login && data.login.token }));
          localStorage.setItem("token", data && data.login && data.login.token);
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
          <Field
            name="email"
            component={InputField}
            type="email"
            label="email"
            fieldstyle="App-login"
            validate={[validateNotEmpty, validateNotEmail]}
          />
          <Field
            name="password"
            component={InputField}
            type="password"
            label="password"
            fieldstyle="App-pass"
            validate={validateNotEmpty}
          />
          <button className="App-button" type="submit">
            Войти в систему
          </button>
          <Link to={`/reg`}>
            <button className="App-button">Зарегистрироваться</button>
          </Link>
          <FormErrors err={this.props.errors.errors} />
        </Form>
      </div>
    );
  }
}

export default withRouter(withApollo(connect(AuthForm.mapStateToProps)(AuthForm)));
