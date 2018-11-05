import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

export default class Users extends React.Component {

  render() {
    return (
      <div className="App">
        <hr />
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
        <hr/>
      </div>
    );
  }
}
