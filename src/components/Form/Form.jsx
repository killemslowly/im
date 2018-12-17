import React from "react";
import { reduxForm } from "redux-form";

class Form extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(values) {
    this.props.formSubmit(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className={this.props.formstyle} onSubmit={handleSubmit(this.onFormSubmit)}>
        {this.props.children}
      </form>
    );
  }
}
export default reduxForm()(Form);
