import React from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

export default class Users extends React.Component {

  render() {
    return (
      <div className="App">
        <Alert color="primary">
          Please install <a href="https://metamask.io/" className="alert-link">MetaMask</a> and sign in!
        </Alert>
        <h3> Choose resume to upload and verify</h3>
        <Form onSubmit={this.onSubmit}>
          <input
            type = "file"
            onChange = {this.captureFile}
          />
           <Button
           bsStyle="primary"
           type="submit">
           Upload
           </Button>
        </Form>
      </div>
    );
  }
}
