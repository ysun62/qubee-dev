import React from "react";
import Joi from "@hapi/joi";
import FormValidation from "../../components/Forms/formValidation";
import { getUsers } from "../../users";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  FormText,
} from "reactstrap";

class Login extends FormValidation {
  state = {
    data: {
      username: "",
      password: "",
    },
    users: [],
    errors: {},
  };

  componentDidMount() {
    this.setState({ users: getUsers() });
  }

  schema = {
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleMatch = (value) => {};

  doSubmit = () => {
    const { data, users } = this.state;
    const { history } = this.props;

    const userMatch = users.filter((u) =>
      u["email"].toLowerCase().includes(data["username"])
    );
    const password = userMatch.some(
      (item) => data["password"] === item.password
    );

    if (!password) {
      const errors = {
        login: "Username or Password are invalid.",
        ...this.state.errors,
      };

      return this.setState({ errors });
    }

    history.push("/admin/index");
  };

  render() {
    const { errors } = this.state;

    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    {this.renderInputField(
                      "username",
                      "Email",
                      "email",
                      errors["username"] && "is-invalid"
                    )}
                  </InputGroup>
                  <FormText>
                    <strong>Username:</strong> demo@demo.com
                  </FormText>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    {this.renderInputField(
                      "password",
                      "Password",
                      "password",
                      errors["password"] && "is-invalid"
                    )}
                  </InputGroup>
                  <FormText>
                    <strong>Password:</strong> test123
                  </FormText>
                </FormGroup>

                {errors["username"] && (
                  <div className="alert alert-danger">{errors["username"]}</div>
                )}
                {errors["password"] && (
                  <div className="alert alert-danger">{errors["password"]}</div>
                )}
                {errors["login"] && (
                  <div className="alert alert-danger">{errors["login"]}</div>
                )}

                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  {this.renderSubmitButton("Sign in")}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
