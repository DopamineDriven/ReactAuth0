import React, { Component } from 'react';
import { Router, Route, Redirect } from "react-router-dom";
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Wrapper from './components/Wrapper/Wrapper.jsx';
import Auth from './Auth/Auth.js';
import Callback from './pages/Callback.jsx';
// route history globally
import history from './history/history.jsx';
import Public from './pages/Public.jsx';
import Private from './pages/Private.jsx';
import Courses from './pages/Courses.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history)
  }

  render() {
    return (
      <Router history={history} keyLength={12}>
        <Navbar auth={this.auth} />
        <Wrapper>
          <React.Fragment>
            <Route 
              exact path={"/" || "/home"}
              render={props => <Home auth={this.auth} {...props} />} 
            />
            <Route 
              exact path="/callback" 
              render={props => <Callback auth={this.auth} {...props} />} 
            />
            <Route 
              exact path="/public" 
              render={props => <Public auth={this.auth} {...props} />} 
            />
            <Route 
              exact path="/profile" 
              render={props => 
                // user must be logged in
                this.auth.isAuthenticated() ? (
                  <Profile auth={this.auth} {...props} />
                ) : (
                  <Redirect to="/" />
                )} 
            />
            <Route 
              exact path="/private" 
              render={props => 
                // user must be logged in
                this.auth.isAuthenticated() ? (
                  <Private auth={this.auth} {...props} />
                ) : (
                  this.auth.login()
                )} 
            />
            <Route 
              exact path="/courses" 
              render={props => 
                // user must be logged in and granted specified scope
                this.auth.isAuthenticated() &&
                this.auth.userHasScopes(["read:courses"]) ? (
                  <Courses auth={this.auth} {...props} />
                ) : (
                  this.auth.login()
                )} 
            />
          </React.Fragment>
        </Wrapper>
        <Footer />
      </Router>
    );
  }
};
export default App;
