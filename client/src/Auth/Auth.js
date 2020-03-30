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

    handleAuthentication = () => {
        this.auth0.parseHash((error, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult)
                this.history.push("/")
            } else if (error) {
                this.history.push("/")
                alert(`Error ${error.error}. Check the console for details`)
                console.log(error)
            }
        })
    }

    setSession = authResult => {
        console.log(authResult)
        // set time for access token lifespan (36000 seconds, tick tock)
        const expiresAt = JSON.stringify(
            authResult.expiresIn*1000+new Date().getTime()
        )

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    };

    isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
    }

    logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        this.userProfile = null;
        this.auth0.logout({
          clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
          returnTo: "http://localhost:3000"
        });
      };
    
      getAccessToken = () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("No access token found.");
        }
        return accessToken;
      };
    
      getProfile = cb => {
        if (this.userProfile) return cb(this.userProfile);
        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
          if (profile) this.userProfile = profile;
          cb(profile, err);
        });
      };
}
