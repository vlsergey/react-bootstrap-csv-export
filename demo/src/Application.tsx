import React, {PureComponent, ReactNode} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {HashRouter, Link, Route, Switch} from 'react-router-dom';

import FormDemo from './FormDemo';
import ModalDemo from './ModalDemo';

export default class Application extends PureComponent<unknown> {
  override render (): ReactNode {
    return <HashRouter>
      <Navbar expand="lg">
        <Navbar.Brand href="#">React Bootstrap Export to CSV Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="mr-auto">
            <Nav.Link as={Link} key="form" to="/form">Form Demo</Nav.Link>
            <Nav.Link as={Link} key="modal" to="/modal">Modal Demo</Nav.Link>
          </Nav>
          <Navbar.Text>
            <a href="https://github.com/vlsergey/react-bootstrap-csv-export">GitHub</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route component={FormDemo} exact key="/form" path="/form" />
        <Route component={ModalDemo} exact key="/modal" path="/modal" />
      </Switch>
    </HashRouter>;
  }
}
