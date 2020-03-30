import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        const { isAuthenticated, login } = this.props.auth
        return (
            <row className="text-white">
                <div className="d-flex justify-content-center">
                {isAuthenticated() ? (
                    <Link to="/profile">View Profile</Link>
                ) : (
                <button
                    className="btn btn-lg justify-content-center login-button heading-subtitle bg-white"
                    onClick={login}
                    type="btn btn-lg"
                >
                    <strong>Login</strong>
                </button>
                )}
                </div>
            </row>
        )
    }
}


export default Home;
