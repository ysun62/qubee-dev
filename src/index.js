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
import ReactDOM from "react-dom";
// import logger from "./services/logService";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faShareAlt,
  faEdit,
  faFileExport,
  faTrashAlt,
  faCloudUploadAlt,
  faCheckSquare,
  faFileImage,
  faFolderOpen,
  faTh,
  faThList,
  faEllipsisV,
  faStar,
  faComment,
  faCommentDots,
  faClock,
  faDownload,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquare,
  faStar as faRegStar,
  faClock as faRegClock,
  faComment as faRegComment,
} from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";

library.add(
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faShareAlt,
  faEdit,
  faFileExport,
  faTrashAlt,
  faCloudUploadAlt,
  faSquare,
  faCheckSquare,
  faFileImage,
  faFolderOpen,
  faTh,
  faThList,
  faEllipsisV,
  faStar,
  faRegStar,
  faComment,
  faCommentDots,
  faRegComment,
  faClock,
  faRegClock,
  faDownload,
  faArrowUp,
  faArrowDown
);

//logger.init();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <Route path="/admin" component={AdminLayout} />
      <Route path="/auth" component={AuthLayout} /> */}
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/admin/files" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
