import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'
import UserActions from './Redux/UserRedux'
import { Button, Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {userEmail: '', newsletterKey: null, isFlipped: false};
    this.props.fetchNewsletters()
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
              <Col>
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="Login">Tab 1 content</Tab>
                  <Tab eventKey={2} title="Register">Tab 2 content</Tab>
                </Tabs>
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
