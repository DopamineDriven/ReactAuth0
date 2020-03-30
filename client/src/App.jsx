import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Wrapper from './components/Wrapper/Wrapper.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Wrapper>
        <React.Fragment>
          <Route exact path={"/" || "/home"} component={Home} />
          <Route exact path="/profile" component={Profile} />
        </React.Fragment>
      </Wrapper>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
