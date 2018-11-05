import React from 'react';
import { Form, Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Users from './Users.js';
import Verifiers from './Verifiers.js';
import Employers from './Employers.js';
import web3 from './web3.js';
import ipfs from './ipfs.js';
import storehash from './storehash.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
    this.employerLogIn = this.employerLogIn.bind(this)
  }

  employerLogIn() {

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <img src={require('./header.png')} width="100%"/>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Verifiers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Employers
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Users></Users>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Verifiers></Verifiers>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <Employers></Employers>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
