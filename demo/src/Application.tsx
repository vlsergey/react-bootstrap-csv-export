import React, {PureComponent, ReactNode} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {HashRouter, Link, Route, Switch} from 'react-router-dom';

import Demo from './Demo';

export default class Application extends PureComponent<unknown> {
  override render (): ReactNode {
    return <HashRouter>
      <Navbar expand="lg">
        <Navbar.Brand href="#">React Bootstrap Export to CSV Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="mr-auto">
            <Nav.Link as={Link} key="demo" to="/demo">Demo</Nav.Link>
          </Nav>
          <Navbar.Text>
            <a href="https://github.com/vlsergey/react-bootstrap-csv-export">GitHub</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route component={Demo} exact key="/demo" path="/demo" />
      </Switch>
    </HashRouter>;
  }
}
