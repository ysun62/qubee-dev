/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../services/httpService";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

class AdminNavbar extends React.Component {
  state = {
    inputField: "",
    term: "",
    results: [],
    loading: false,
    message: "",
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({ redirect: false, term: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const numberOfChar = [...this.state.term];

    let url = `http://localhost:5000/api/searches?s=${encodeURI(
      this.state.term
    )}`;

    if (numberOfChar.length >= 3) {
      await http
        .get(url)
        .then((response) => {
          this.setState({ redirect: true, results: response.data });
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    } else {
      toast.warn("At least 3 charaters required to search.");
    }
  };

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Form
              className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
              onSubmit={this.handleSubmit}
            >
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Search"
                    name="s"
                    id="s"
                    type="search"
                    value={this.state.term}
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
            {this.state.redirect && (
              <Redirect
                to={{
                  pathname: `/admin/search/${this.state.term}`,
                  state: { results: this.state.results },
                }}
              />
            )}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Jessica Jones
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
