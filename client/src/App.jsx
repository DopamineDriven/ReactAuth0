import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Wrapper from './components/Wrapper/Wrapper.jsx';
import Auth from './Auth/Auth.js';
import Callback from './pages/Callback.jsx';
// route history globally
import Public from './pages/Public.jsx';
import Private from './pages/Private.jsx';
import Courses from './pages/Courses.jsx';
import PrivateRoute from './PrivateRoute.jsx';
// React 16.3 -> added new contextAPI; can have as many contexts as desired

class App extends Component {
  
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history)
  }

  render() {
    return (
      <React.Fragment>
        <Navbar auth={this.auth} />
          <Wrapper>
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
            <PrivateRoute 
              exact path="/profile" 
              component={Profile} 
              auth={this.auth}
            />
            <PrivateRoute 
              exact path="/private" 
              component={Private} 
              auth={this.auth}
            />
            <PrivateRoute 
              exact path="/courses" 
              component={Courses}
              auth={this.auth}
              scopes={["read:courses"]}
            />
          </Wrapper>
        <Footer />
      </React.Fragment>
    );
  }
};
export default App;
