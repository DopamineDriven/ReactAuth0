import React, {Component} from 'react';

class Profile extends Component {
    // store user profile data in state
    // class-field syntax
    state = {
        profile: null,
        error: ""
    }
    // this.loadUserProfile() declared separately to clearly convey intent
    componentDidMount() {
        this.loadUserProfile()
    };

    loadUserProfile() {
        this.props.auth.getProfile((profile, error) => {
            this.setState({ profile, error })
        })
    };

    render() {
        // destructuring profile via this.state
        const { profile } = this.state;
        // if !profile set, return null
        if (!profile) return null;
        return (
            <>
            <div className="row text-white d-flex justify-content-center">

                <p className={"text-white d-flex justify-content-center"}>{profile.nickname}</p>
                <img 
                    style={{ maxWidth: 50, maxHeight: 50 }}
                    src={profile.picture} 
                    alt="profile pic"
                />
                <pre className={"text-white"}>
                    {JSON.stringify(profile, null, 2)}
                </pre>
            </div>
            </>
        )
    }
}

export default Profile;