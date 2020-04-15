import React, { Component } from 'react';

class Courses extends Component {
    state = {
        courses: []
    }

    componentDidMount() {
        fetch('/course', {
            // passing authorization header with Bearer and access token 
            headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
        })
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('network response was not ok')
        })
        .then(response => this.setState({ courses: response.courses }))
        .catch(error => this.setState({ message: error.message }))
    }

    render() {
        return (
            <ul className="text-white">
                {this.state.courses.map(course => {
                    return (
                    <li key={course.id}>{course.title}</li>
                    )
                })}
            </ul>
        );
    }
}

export default Courses;
