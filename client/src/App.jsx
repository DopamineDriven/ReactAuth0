import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Wrapper from './components/Wrapper/Wrapper.jsx';
import Auth from './Auth/Auth.js';
import Callback from './pages/Callback.jsx';
import Public from './pages/Public.jsx';
import Private from './pages/Private.jsx';
import Courses from './pages/Courses.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import AuthContext from './utils/AuthContext.jsx';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history)
    }
  }
  render() {
    // destructure reference to this.state
    const { auth } = this.state;
    return (
      // no longer have to pass auth down as props to private components
      // can instead use auth context consumer in PrivateRoute.jsx
      <AuthContext.Provider value={auth}>
        <React.Fragment>
          <Navbar auth={auth} />
            <Wrapper>
              <Route 
                exact path={"/" || "/home"}
                render={props => <Home auth={auth} {...props} />} 
              />
              <Route 
                exact path="/callback" 
                render={props => <Callback auth={auth} {...props} />} 
              />
              <Route 
                exact path="/public" 
                component={Public}
              />
              <PrivateRoute 
                exact path="/profile" 
                component={Profile} 
              />
              <PrivateRoute 
                exact path="/private" 
                component={Private} 
              />
              <PrivateRoute 
                exact path="/courses" 
                component={Courses}
                scopes={["read:courses"]}
              />
            </Wrapper>
          <Footer />
        </React.Fragment>
      </AuthContext.Provider>
    );
  }
};
export default App;
