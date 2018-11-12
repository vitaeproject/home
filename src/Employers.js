import React, { Component } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
import Linkify from 'react-linkify'

class Employers extends Component {

    state = {
      ipfsHash: null,
      result:'',
      buffer:'',
      ethAddress:'',
      userAddress: ''
    };

    captureAddress =(event) => {
      event.stopPropagation()
      event.preventDefault()
      const addr = event.target.value
      this.setState({userAddress: addr})
    };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    onSubmit = async (event) => {
      event.preventDefault();
     //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);
      //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});
      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
      let hash = await storehash.methods.getResume(this.state.userAddress).call({
        from: accounts[0]
      });
      this.setState({ipfsHash: "https://gateway.ipfs.io/ipfs/" + hash});
      this.setState({result: "See result at " + this.state.ipfsHash})
    }; //onSubmit

    render() {
      return (
        <div className="App">
          <Alert color="primary">
            Please install <a href="https://metamask.io/" className="alert-link">MetaMask</a> and sign in!
          </Alert>
          <h3> Enter applicant's user address to see result </h3>
          <Form onSubmit={this.onSubmit}>
            <p1>Applicant's User Address:</p1>
            <input type="textArea" onChange={this.captureAddress}/>
            <br></br>
            <br></br>
             <Button
             bsStyle="primary"
             type="submit">
             View Result
             </Button>
          </Form>
          <Linkify>{this.state.result}</Linkify>
        </div>
      );
    } //render
} //App
export default Employers;
