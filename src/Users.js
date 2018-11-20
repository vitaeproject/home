import React, { Component } from 'react';
import { Alert, FormGroup, Label, Input, Form, Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
export default class Users extends React.Component {

      state = {
        ipfsHash:null,
        buffer:'',
        ethAddress:'',
        blockNumber:'',
        transactionHash:'',
        gasUsed:'',
        txReceipt: '',
        userAddress: ''
      };

      captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
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

      onClick = async () => {
        try{
          this.setState({blockNumber:"waiting.."});
          this.setState({gasUsed:"waiting..."});
          //get Transaction Receipt in console on click
          //See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
          await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
            console.log(err,txReceipt);
            this.setState({txReceipt});
          }); //await for getTransactionReceipt
          await this.setState({blockNumber: this.state.txReceipt.blockNumber});
          await this.setState({gasUsed: this.state.txReceipt.gasUsed});
        } //try
        catch(error){
            console.log(error);
        } //catch
      } //onClick

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
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
          console.log(err,ipfsHash);
          //setState by setting ipfsHash to ipfsHash[0].hash
          this.setState({ ipfsHash:ipfsHash[0].hash });
          // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
          //return the transaction hash from the ethereum contract
          //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

          storehash.methods.uploadResumeToBeVerified(this.state.ipfsHash, this.state.userAddress).send({
            from: accounts[0]
          }, (error, transactionHash) => {
            console.log(transactionHash);
            this.setState({transactionHash});
          }); //storehash
        }) //await ipfs.add
      }; //onSubmit

      render() {
        return (
          <div className="App">
            <Alert color="primary">
              Please install <a href="https://metamask.io/" className="alert-link">MetaMask</a> and sign in!
            </Alert>
            <h3> Upload resumes to be verified </h3>
            <Form onSubmit={this.onSubmit}>
              <input
                type = "file"
                onChange = {this.captureFile}
              />
              <p1>Your Address:</p1>
              <input type="textArea" onChange={this.captureAddress}/>
              <br></br>
               <Button
               color="primary"
               bsStyle="primary"
               type="submit">
               Upload
               </Button>
            </Form>
            <hr/>
            <Button color="secondary" onClick = {this.onClick}> Get Transaction Receipt </Button>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Tx Receipt Category</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IPFS Hash # stored on Eth Contract</td>
                  <td>{this.state.ipfsHash}</td>
                </tr>
                <tr>
                  <td>Ethereum Contract Address</td>
                  <td>{this.state.ethAddress}</td>
                </tr>
                <tr>
                  <td>Tx Hash # </td>
                  <td>{this.state.transactionHash}</td>
                </tr>
                <tr>
                  <td>Block Number # </td>
                  <td>{this.state.blockNumber}</td>
                </tr>
                <tr>
                  <td>Gas Used</td>
                  <td>{this.state.gasUsed}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        );
      } //render
  } //App
