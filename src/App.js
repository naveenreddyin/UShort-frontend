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
    registerPassword: '', confirmRegisterPassword: '', urlValue: '' };
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

  componentDidMount(){

    this.props.fetchAll();

  }

  handleURLChange(event){

    this.setState({urlValue: event.target.value})
  }

  handleSubmit(){

    console.log("clicked")
    this.props.createShort(this.state.urlValue);


  }

  handleDelete(code, event){

    console.log(code)
    this.props.deleteCode(code)
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
          <h2>Welcome to UShort!</h2>
        </div>
        <p className="App-intro">
          Please enter URL below.
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

        </p>

        <div className="row">
          <div className="col-lg-4 col-lg-offset-4">
              <input type="text" value={this.state.urlValue} onChange={this.handleURLChange.bind(this)} />
              <input type="button" value="Submit" onClick={this.handleSubmit.bind(this)}/>
          </div>
          <div className="col-lg-4 col-lg-offset-4">
            {this.props.data && this.props.data.map( (row, i) =>
                   <div className="panel panel-default" key={i}>
                      <div className="panel-body" role="tab">
                        <div className="row">
                          <div className="col-lg-6">
                            <h4 className="panel-title">
                              <a href={row.prefixURL+"/goto/"+row.code}>http://u.shrt/{row.code}</a>
                            </h4>
                          </div>
                          <div className="col-lg-6">
                              <a className="btn btn-primary" onClick={this.handleDelete.bind(this, row.code)}>delete</a>
                          </div>
                        </div>
                      </div>
                   </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.user.fetching,
    registerStatus: state.user.registerUserStatus,
    registerMessage: state.user.registerUserMessage,
    token: state.user.token,
    data: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (email, password) => dispatch(UserActions.register(email, password)),
    generateToken: (email, password) => dispatch(UserActions.generateToken(email, password)),
    validateToken: (token) => dispatch(UserActions.validateToken(token)),
    fetchAll: (token) => dispatch(UserActions.fetchAll()),
    createShort: (URL) => dispatch(UserActions.createShort(URL)),
    deleteCode: (code) => dispatch(UserActions.deleteCode(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
