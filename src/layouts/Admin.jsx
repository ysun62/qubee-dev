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
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";
import ActionBarHeader from "../components/Headers/ActionBarHeader";
import Sidebar from "../components/Sidebar/Sidebar";
import SearchResults from "../views/SearchResults";
import Files from "../views/Files";
import routes from "../routes.js";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: {
        dataCache: [],
        models: [],
        rootFolder: {},
        sharedFolder: {},
      },
      selection: {
        selected: null,
        selectionData: [],
      },
      sorting: null,
      count: 0,
      folderId: "",
      selectMode: false,
      view: "gallery",
    };
  }

  componentDidMount() {
    document.body.classList.add("bg-default");
    this.getAllFiles();
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getAllFiles = async () => {
    const { data: files } = await getFiles();
    const { data: folders } = await getFolders();
    const dataCache = [...folders, ...files];
    let models = dataCache.filter(
      (data) => data.name !== "All" && data.name !== "Shared"
    );

    this.setState({
      collection: {
        dataCache: dataCache,
        models: models,
        rootFolder: folders.find(({ name }) => name === "All"),
        sharedFolder: folders.find(({ name }) => name === "Shared"),
        sorting: {
          attribute: 'name',
          direction: 'ASC',
        },
      },
    });
  };

  handleSortFiles = (attribute) => {
    let sorting = this.state.collection.sorting
    let nextDirection = null;
    if (attribute === sorting.attribute) {
      nextDirection = sorting.direction === 'DESC' ? 'ASC' : 'DESC';
    } else {
      nextDirection = 'DESC';
    }
    sorting = {
      attribute,
      direction: nextDirection,
    }

    this.setState({ collection: {
      ...this.state.collection,
      sorting,
    } });
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

  handleMove = (files) => {
    console.log(files);
  };

  handleFileCount = (count) => this.setState({ count });

  handleFolderId = (folderId) => this.setState({ folderId });

  selectAllCheckboxes = (isSelected) => {
    const selectionData = { ...this.state.selection.selectionData };
    const models = this.state.collection.models.filter(
      (m) => m.parentDirectoryId === this.state.folderId
    );

    if (isSelected) {
      models.map((model) =>
        this.setState((prevState) => ({
          selection: {
            selectionData: {
              ...prevState.selection.selectionData,
              [model._id]: model,
            },
          },
        }))
      );
    } else {
      Object.keys(selectionData).map((model) => {
        delete selectionData[model];
        return this.setState({
          selection: {
            selectionData: selectionData,
          },
        });
      });
    }
  };

  selectAll = (bool) => this.selectAllCheckboxes(bool);

  handleCheckboxChange = (file) => {
    const id = file._id;
    const selectionData = { ...this.state.selection.selectionData };

    if (!this.state.selection.selectionData.hasOwnProperty(id)) {
      this.setState((prevState) => ({
        selection: {
          selectionData: {
            ...prevState.selection.selectionData,
            [id]: file,
          },
        },
      }));
    } else {
      delete selectionData[id];
      this.setState({
        selection: {
          selectionData: selectionData,
        },
      });
    }
  };

  toggleView = (option) => {
    option === "list"
      ? this.setState((prevState) => ({
          ...prevState,
          view: "list",
        }))
      : this.setState((prevState) => ({
          ...prevState,
          view: "gallery",
        }));
  };

  render() {
    const { collection, selection, count, folderId, view } = this.state;

    //console.log(selection.selectionData, folderId);

    let actionBarHeader;

    if (Object.keys(selection.selectionData).length) {
      actionBarHeader = (
        <ActionBarHeader
          {...this.props}
          collection={collection}
          handleMove={this.handleMove}
          handleFolderSelection={this.handleFolderSelection}
          selectedData={selection.selectionData}
          getFiles={this.getAllFiles}
        />
      );
    }

    return (
      <>
        <ToastContainer draggable={false} position="bottom-left" />
        {actionBarHeader}
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/qubee_logo.png"),
            imgAlt: "...",
          }}
          collection={collection}
          getFiles={this.getAllFiles}
          getFolderId={folderId}
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
                <Files
                  {...props}
                  collection={collection}
                  getFiles={this.getAllFiles}
                  isSelected={selection.selectionData}
                  onSelectAll={this.selectAll}
                  onCheckboxClick={this.handleCheckboxChange}
                  setFolderId={this.handleFolderId}
                  getFolderId={folderId}
                  setFileCount={this.handleFileCount}
                  getFileCount={count}
                  view={view}
                  toggleView={this.toggleView}
                />
              )}
            />
            <Route
              path="/admin/search/:term"
              render={(props) => (
                <SearchResults
                  {...props}
                  view={view}
                  toggleView={this.toggleView}
                  handleSortFiles={this.handleSortFiles}
                />
              )}
            />
            <Route path="/admin/search" component={SearchResults} />
            <Route
              path="/admin/files"
              render={(props) => (
                <Files
                  {...props}
                  collection={collection}
                  getFiles={this.getAllFiles}
                  isSelected={selection.selectionData}
                  onSelectAll={this.selectAll}
                  onCheckboxClick={this.handleCheckboxChange}
                  setFolderId={this.handleFolderId}
                  getFolderId={folderId}
                  setFileCount={this.handleFileCount}
                  getFileCount={count}
                  view={view}
                  toggleView={this.toggleView}
                  handleSortFiles={this.handleSortFiles}
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
