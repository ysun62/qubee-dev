import React from "react";
import ReactDOM from "react-dom";
import logger from "./services/logService";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import Folders from "views/Folders";

logger.init();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
