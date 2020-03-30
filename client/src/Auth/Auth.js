import auth0 from 'auth0-js';
require('dotenv').config();
// https://auth0.github.io/auth0.js/index.html

export default class Auth {
    constructor(history) {
        this.history = history;
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            // uniform resource identifier
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            // id authenticates user and token is access token for api calls
            responseType: "token id_token",
            // will return: iss (issuer), sub (subject), aud (audience),
            // exp (expiration time), nbf (not before), iat (issued at)
            scope: "openid profile email"
        });
    }

    // METHODS
    // don't have to worry about this keyword binding (no manual data-binding required)
    // when authorize called it redirects browser to Auth0 login page
    login = () => {
        this.auth0.authorize()
    };


}