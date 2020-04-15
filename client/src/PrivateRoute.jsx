import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';


const PrivateRoute = ({ component: Component, auth, scopes, ...rest }) => {
    return (
        <Route 
            { ...rest }
            render={props => {
                // (1) redirect to login if not logged in
                if (!auth.isAuthenticated()) return auth.login();

                // (2) display message if user lacks required scope(s)
                if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
                    return (
                        <h1>
                            Unauthorized - scope(s) listed below required to view this page:{" "}
                            {scopes.join(",")}.
                        </h1>
                    );
                }
                // (3) render component
                return (
                    <Component auth={auth} {...props} />
                )
            }} 
        />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    scopes: PropTypes.array
};

PrivateRoute.defaultProps = {
    scopes: []
};

export default PrivateRoute;
