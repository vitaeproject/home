import React from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

export default class Employers extends React.Component {

  render() {
    return (
      <div className="App">
        <Alert color="primary">
          Please install <a href="https://metamask.io/" className="alert-link">MetaMask</a> and sign in!
        </Alert>
      </div>
    );
  }
}
