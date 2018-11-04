import React, { Component } from 'react';
import './App.css';
import { Button, ButtonGroup, Col, Row, Container } from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
    this.userLogIn = this.userLogIn.bind(this)
    this.employerLogIn = this.employerLogIn.bind(this)
    this.verifierLogIn = this.verifierLogIn.bind(this)
  }

  userLogIn() {

  }

  employerLogIn() {

  }

  verifierLogIn() {

  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="c1">
            <Button color="primary" size="lg" onClick={this.userLogIn}>User Log In</Button>
          </Col>
          <Col className="c2">
            <Button color="primary" size="lg" onClick={this.verifierLogIn}>Verifier Log In</Button>
          </Col>
          <Col className="c3">
            <Button color="primary" size="lg" onClick={this.employerLogIn}>Employer Log In</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
