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
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "reactstrap";
import { getFolders } from "../services/folderService";
import { getFiles } from "../services/fileService";
import AdminNavbar from "components/Navbars/AdminNavbar";
import AdminFooter from "components/Footers/AdminFooter";
import ActionBarHeader from "components/Headers/ActionBarHeader";
import Sidebar from "components/Sidebar/Sidebar";
import Folders from "../views/Folders";
import SearchResults from "../views/SearchResults";
import Files from "../views/Files";

import http from "../services/httpService";
import config from "../config";
import routes from "routes.js";

class Admin extends Component {
  state = {
    display: false,
    collection: {
      files: [],
      folders: [],
      count: 0,
      rootFolder: {},
      sharedFolder: {},
    },
    selection: {},
    selectMode: false,
  };

  componentDidMount() {
    document.body.classList.add("bg-default");
    this.getFiles();
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getFiles = async () => {
    const { data: files } = await getFiles();
    const { data: folders } = await getFolders();
    this.setState({
      collection: {
        files,
        folders,
        count: files.length + folders.length,
        rootFolder: folders.find(({ name }) => name === "All"),
        sharedFolder: folders.find(({ name }) => name === "Shared"),
      },
    });
  };

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

  handleDelete = async (file) => {
    const originalFiles = this.state.files;

    const files = this.state.files.filter((p) => p._id !== file._id);
    this.setState({ files });

    try {
      await http.delete(`${config.filesEndpoint}/${file._id}`);
      //throw new Error("Something went wrong!");
    } catch (err) {
      // Expected (404: not found, 400: bad request) - Client Errors
      // - Display a specific error message
      if (err.response && err.response.status === 404)
        alert("This file has already been deleted.");
      this.setState({ files: originalFiles });
    }
  };

  handleMove = (files) => {
    console.log(files);
  };

  handleFolderSelection = (folder) => {
    console.log(folder);
  };

  showHideComponent(value) {
    if (value) {
      this.setState({
        display: true,
      });
    } else {
      this.setState({
        display: false,
      });
    }
  }

  render() {
    const { display, collection, rootFolder, sharedFolder } = this.state;

    return (
      <>
        <ToastContainer draggable={false} position="bottom-left" />
        {display && (
          <ActionBarHeader
            {...this.props}
            handleDelete={this.handleDelete}
            handleMove={this.handleMove}
            handleFolderSelection={this.handleFolderSelection}
            collection={collection}
          />
        )}
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/qubee_logo.png"),
            imgAlt: "...",
          }}
          getFiles={this.getFiles}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            <Route
              path="/admin/folder/:id"
              render={(props) => (
                <Folders
                  {...props}
                  collection={collection}
                  getFiles={this.getFiles}
                />
              )}
            />
            <Route path="/admin/search/:term" component={SearchResults} />
            <Route path="/admin/search" component={SearchResults} />
            <Route
              path="/admin/files"
              render={(props) => (
                <Files
                  {...props}
                  collection={collection}
                  folderId={collection.rootFolder._id}
                  getFiles={this.getFiles}
                  isChecked={this.showHideComponent}
                />
              )}
            />
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/files" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
