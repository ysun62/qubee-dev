import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import http from "services/httpService";
import Folders from "../views/Folders";
import { Container } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar";
import AdminFooter from "components/Footers/AdminFooter";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes.js";

class Admin extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-dark");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-dark");
  }
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
          {/* <Route
        path="/folder/:id"
        render={(props) => <Folders {...props} />}
      /> */}
            {this.getRoutes(routes)}
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
