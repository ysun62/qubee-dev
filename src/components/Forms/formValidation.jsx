import React, { Component } from "react";
import Joi from "@hapi/joi";
import { Input, Button } from "reactstrap";

class FormValidation extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderSubmitButton(label) {
    return (
      <Button
        onClick={this.handleSubmit}
        className="my-4"
        color="info"
        type="submit"
      >
        {label}
      </Button>
    );
  }

  renderInputField(name, placeholder, type = "text", err) {
    const { data, errors } = this.state;

    return (
      <Input
        placeholder={placeholder}
        type={type}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        className={err}
      />
    );
  }
}

export default FormValidation;
