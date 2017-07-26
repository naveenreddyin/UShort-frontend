import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'
import UserActions from './Redux/UserRedux'
import { Button, Tabs, Tab, Grid, Alert,
  Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
var Loader = require('halogen/RiseLoader');



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {userEmail: '', password: '', token: '', registerEmail: '',
    registerPassword: '', confirmRegisterPassword: '' };
  }


  submitButtonClicked(){
    if(this.state.userEmail === '' || this.state.password === '')
    alert("Please enter email and password fields");

    if(this.state.userEmail != '' || this.state.password != '')
    this.props.generateToken(this.state.userEmail, this.state.password);
  }

  onRegisterEmailChange(event){

    this.setState({registerEmail: event.target.value});


  }

  onEmailChange(event){
    this.setState({userEmail: event.target.value});
  }

  onPasswordChange(event){

      this.setState({password: event.target.value});
  }

  onRegisterPasswordChange(event){
    this.setState({registerPassword: event.target.value});


  }

  onRegisterConfirmPasswordChange(event){
    this.setState({confirmRegisterPassword: event.target.value});


  }





  submitRegisterButtonClicked(){

    if(this.state.registerEmail == '' || this.state.registerPassword == '' || this.state.confirmRegisterPassword == ''){
      alert("Please enter email, password.");

    }

    if(this.state.registerPassword != this.state.confirmRegisterPassword){
      alert("Enter same password please.");

    }

      if(this.state.registerEmail != '' && this.state.registerPassword != '' && this.state.confirmRegisterPassword != '')
      this.props.registerUser(this.state.registerEmail, this.state.registerPassword);



  }

  verifyTokenClicked(){

    if(this.state.token != this.props.token)
    alert("Enter valid token!");
    else{
      this.props.validateToken(this.props.token)
    }


  }

  onTokenChange(event){
    this.setState({token: event.target.value})
  }


  render() {


    if(this.props.fetching){
            return (
                <Grid>
                    <Row className="show-grid" style={{marginTop: 350}}>
                        <Col xs={6} xsOffset={3}>
                            <Loader color="#4DAF7C" size="48px" margin="4px"/>
                        </Col>
                    </Row>
                </Grid>
            )


    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to UMS!</h2>
        </div>
        <p className="App-intro">
          Please login or register below.
        {this.props.registerStatus != null &&  <Grid>
            <Row>
              <Col xs={12}>
              <Alert bsStyle="warning">
                <strong>{this.props.registerMessage}</strong>
              </Alert>
              </Col>
            </Row>
          </Grid>
        }

          <Grid>
            <Row>
              <Col xs={6} md={4}>
              </Col>
              <Col xs={6} md={4}>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="Login">
                    {this.props.token == null ? (
                      <div>
                      <FormGroup controlId="formControlEmail">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl  type="email" value={this.state.userEmail} onChange={this.onEmailChange.bind(this)} placeholder="Enter Email"/>
                        <HelpBlock>Enter Email</HelpBlock>
                      </FormGroup>

                      <FormGroup controlId="formControlPassword">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl  value={this.state.password} onChange={this.onPasswordChange.bind(this)} type="password" placeholder="Enter Password" onChange={this.onPasswordChange.bind(this)}/>
                        <HelpBlock>Enter Password</HelpBlock>
                      </FormGroup>

                      <Button type="submit" onClick={this.submitButtonClicked.bind(this)}>
                          Submit
                      </Button>
                      </div>
                    ):(
                      <div>
                      <FormGroup controlId="formControlToken">
                        <ControlLabel>Enter Token</ControlLabel>
                        <FormControl  value={this.state.token} onChange={this.onTokenChange.bind(this)} type="text" placeholder="Enter Token"/>
                      </FormGroup>
                      <Button type="submit" onClick={this.verifyTokenClicked.bind(this)}>
                          Submit
                      </Button>
                      </div>
                    )}


                  </Tab>
                  <Tab eventKey={2} title="Register">
                    <FormGroup controlId="formControlRegisterEmail">
                      <ControlLabel>Email</ControlLabel>
                      <FormControl  type="email" value={this.state.registerEmail} onChange={this.onRegisterEmailChange.bind(this)} placeholder="Enter Email"/>
                      <HelpBlock>Enter Email</HelpBlock>
                    </FormGroup>

                    <FormGroup controlId="formControlRegisterPassword">
                      <ControlLabel>Password</ControlLabel>
                      <FormControl  type="password" placeholder="Enter Password" onChange={this.onRegisterPasswordChange.bind(this)}/>
                      <HelpBlock>Enter Password</HelpBlock>
                    </FormGroup>

                    <FormGroup controlId="formControlRegisterConfirmPassword">
                      <ControlLabel>Confirm Password</ControlLabel>
                      <FormControl  type="password" placeholder="Confirm Password" onChange={this.onRegisterConfirmPasswordChange.bind(this)}/>
                      <HelpBlock>Enter same Password</HelpBlock>
                    </FormGroup>

                    <Button type="submit" onClick={this.submitRegisterButtonClicked.bind(this)}>
                        Submit
                    </Button>

                  </Tab>
                </Tabs>
              </Col>
              <Col xs={6} md={4}>
              </Col>
            </Row>
          </Grid>

        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.user.fetching,
    registerStatus: state.user.registerUserStatus,
    registerMessage: state.user.registerUserMessage,
    token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (email, password) => dispatch(UserActions.register(email, password)),
    generateToken: (email, password) => dispatch(UserActions.generateToken(email, password)),
    validateToken: (token) => dispatch(UserActions.validateToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
