import React, { Component } from 'react';

class Callback extends Component {
    componentDidMount = () => {
        // Handle authentication if expected values are in url
        // looking for access_token, id_token, and error
        // then test this.props.location.hash; gives current url
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        } else {
            throw new Error ("invalid callback URL")
        }
    }
    render() {
        return (
            <div className="text-white">
                <h1>Loading...</h1>
            </div>
        );
    }
}

export default Callback;