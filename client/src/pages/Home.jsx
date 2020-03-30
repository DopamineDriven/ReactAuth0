import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <row className="text-white">
                <div className="d-flex justify-content-center">
                <button
                    className="btn btn-lg justify-content-center login-button heading-subtitle bg-white"
                    onClick={this.props.auth.login}
                    type="btn btn-lg"
                >
                    <strong>Login</strong>
                </button>
                </div>
            </row>
        )
    }
}


export default Home;
