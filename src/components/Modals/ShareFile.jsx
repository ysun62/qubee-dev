import React, { Component } from "react";
import classnames from "classnames";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";

export class ShareFile extends Component {
  state = {
    tabs: 1,
    modal: false,
    file: "",
  };

  handleToggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleToggleNavs = (e, state, index) => {
    e.preventDefault();

    this.setState({
      [state]: index,
    });
  };

  render() {
    const {
      buttonLabel,
      className,
      buttonIcon,
      backdrop,
      keyboard,
    } = this.props;
    let buttonIconClasses = "fas fa-";
    if (buttonIcon) buttonIconClasses += buttonIcon;

    return (
      <>
        <Button color="link" type="button" onClick={this.handleToggle}>
          <span className="btn-inner--icon mr-md-1 mr-0">
            <i className={buttonIconClasses} />
          </span>
          <span className="btn-inner--text d-md-inline d-none">
            {buttonLabel}
          </span>
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.handleToggle}
          className={className}
          backdrop={backdrop}
          keyboard={keyboard}
          centered
        >
          <ModalHeader toggle={this.handleToggle}>Share</ModalHeader>
          <ModalBody>
            <div className="nav-wrapper share-tab">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <Button
                    aria-selected={this.state.tabs === 1}
                    onClick={(e) => this.handleToggleNavs(e, "tabs", 1)}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.tabs === 1,
                    })}
                    role="tab"
                    size="sm"
                  >
                    <span className="btn-inner--icon">
                      <i className="fas fa-link" />
                    </span>
                    <span className="btn-inner--text">Link</span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    aria-selected={this.state.tabs === 2}
                    onClick={(e) => this.handleToggleNavs(e, "tabs", 2)}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.tabs === 2,
                    })}
                    role="tab"
                    size="sm"
                  >
                    <span className="btn-inner--icon">
                      <i className="fas fa-envelope" />
                    </span>
                    <span className="btn-inner--text">Email</span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    aria-selected={this.state.tabs === 3}
                    onClick={(e) => this.handleToggleNavs(e, "tabs", 3)}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.tabs === 3,
                    })}
                    role="tab"
                    size="sm"
                  >
                    <span className="btn-inner--icon">
                      <i className="fab fa-facebook-f" />
                    </span>
                    <span className="btn-inner--text">Facebook</span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    aria-selected={this.state.tabs === 4}
                    onClick={(e) => this.handleToggleNavs(e, "tabs", 4)}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.tabs === 4,
                    })}
                    role="tab"
                    size="sm"
                  >
                    <span className="btn-inner--icon">
                      <i className="fab fa-twitter" />
                    </span>
                    <span className="btn-inner--text">Twitter</span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    aria-selected={this.state.tabs === 5}
                    onClick={(e) => this.handleToggleNavs(e, "tabs", 5)}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.tabs === 5,
                    })}
                    role="tab"
                    size="sm"
                  >
                    <span className="btn-inner--icon">
                      <i className="fab fa-tlinkedin-in" />
                    </span>
                    <span className="btn-inner--text">Linkedin</span>
                  </Button>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"tabs" + this.state.tabs}>
                  <TabPane tabId="tabs1">
                    <Button className="w-100 bg-cyan" color="primary">
                      Get share link
                    </Button>
                  </TabPane>
                  <TabPane tabId="tabs2">
                    <p className="description">
                      Cosby sweater eu banh mi, qui irure terry richardson ex
                      squid. Aliquip placeat salvia cillum iphone. Seitan
                      aliquip quis cardigan american apparel, butcher voluptate
                      nisi qui.
                    </p>
                  </TabPane>
                  <TabPane tabId="tabs3">
                    <p className="description">
                      Raw denim you probably haven't heard of them jean shorts
                      Austin. Nesciunt tofu stumptown aliqua, retro synth master
                      cleanse. Mustache cliche tempor, williamsburg carles vegan
                      helvetica. Reprehenderit butcher retro keffiyeh
                      dreamcatcher synth.
                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
                <p className="description">
                  This link will allow others to view, download, and comment.
                  You can disable this link anytime in Shared Items.
                </p>
              </TabPane>
              <TabPane tabId="tabs2">
                <p className="description">
                  Cosby sweater eu banh mi, qui irure terry richardson ex squid.
                  Aliquip placeat salvia cillum iphone. Seitan aliquip quis
                  cardigan american apparel, butcher voluptate nisi qui.
                </p>
              </TabPane>
              <TabPane tabId="tabs3">
                <p className="description">
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan
                  helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth.
                </p>
              </TabPane>
            </TabContent>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ShareFile;
