import React, { Component } from 'react';

class Private extends Component {
    state = {
        message: ""
    }

    // getAccessToken = () => {
    //     const accessToken = localStorage.getItem("access_token");
    //     if (!accessToken) {
    //       throw new Error("No access token found.");
    //     }
    //     return accessToken;
    //   };

    componentDidMount() {
        fetch('/private', {
            // passing authorization header with Bearer and access token 
            headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
        })
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('network response was not ok')
        })
        .then(response => this.setState({ message: response.message }))
        .catch(error => this.setState({ message: error.message }))
    }

    render() {
        return (
            <p className="text-white">
                {this.state.message}
            </p>
        );
    }
}

export default Private;
