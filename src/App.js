import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'
import UserActions from './Redux/UserRedux'
import { Button, Tabs, Tab, Grid,
  Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {userEmail: '', password: null, registerEmail: null,
    registerPassword: null, confirmRegisterPassword: null, };
  }


  submitButtonClicked(){

    console.log('clicked');

  }

  onPasswordChange(){
    console.log('password');
  }

  onRegisterPasswordChange(){

  }

  submitRegisterButtonClicked(){

  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to UMS!</h2>
        </div>
        <p className="App-intro">
          Please login or register below.
          <Grid>
            <Row>
              <Col xs={6} md={4}>
              </Col>
              <Col xs={6} md={4}>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="Login">
                      <FormGroup controlId="formControlEmail">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl  type="email" placeholder="Enter Email"/>
                        <HelpBlock>Enter Email</HelpBlock>
                      </FormGroup>

                      <FormGroup controlId="formControlPassword">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl  type="password" placeholder="Enter Password" onChange={this.onPasswordChange.bind(this)}/>
                        <HelpBlock>Enter Password</HelpBlock>
                      </FormGroup>

                      <Button type="submit" onClick={this.submitButtonClicked.bind(this)}>
                          Submit
                      </Button>


                  </Tab>
                  <Tab eventKey={2} title="Register">
                    <FormGroup controlId="formControlRegisterEmail">
                      <ControlLabel>Email</ControlLabel>
                      <FormControl  type="email" placeholder="Enter Email"/>
                      <HelpBlock>Enter Email</HelpBlock>
                    </FormGroup>

                    <FormGroup controlId="formControlRegisterPassword">
                      <ControlLabel>Password</ControlLabel>
                      <FormControl  type="password" placeholder="Enter Password" onChange={this.onPasswordChange.bind(this)}/>
                      <HelpBlock>Enter Password</HelpBlock>
                    </FormGroup>

                    <FormGroup controlId="formControlRegisterConfirmPassword">
                      <ControlLabel>Confirm Password</ControlLabel>
                      <FormControl  type="password" placeholder="Confirm Password" onChange={this.onPasswordChange.bind(this)}/>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeTestCall: () => dispatch(UserActions.testApi()),
    fetchNewsletters: () => dispatch(UserActions.fetchNewsletters())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
