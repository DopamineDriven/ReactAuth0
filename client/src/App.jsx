import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Wrapper from './components/Wrapper/Wrapper.jsx';
import Auth from './Auth/Auth.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history)
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar auth={this.auth} />
        <Wrapper>
          <React.Fragment>
            <Route 
              exact path={"/" || "/home"}
              render={props => <Home auth={this.auth} {...props} />} />
            <Route 
              exact path="/profile" 
              component={Profile} />
          </React.Fragment>
        </Wrapper>
        <Footer />
      </BrowserRouter>
    );
  }
};
export default App;
