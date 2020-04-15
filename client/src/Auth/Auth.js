import auth0 from 'auth0-js';
require('dotenv').config();
// https://auth0.github.io/auth0.js/index.html

export default class Auth {
    constructor(history) {
        this.history = history;
        this.userProfile = null;
        this.requestedScopes = "openid profile email read:courses"
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            // uniform resource identifier
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            // auth0 will send access token tied to particular audience (specified in API seettings)
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            // id authenticates user and token is access token for api calls
            responseType: "token id_token",
            // will return: iss (issuer), sub (subject), aud (audience),
            // exp (expiration time), nbf (not before), iat (issued at)
            scope: this.requestedScopes
        });
    }

    // METHODS
    // don't have to worry about this keyword binding (no manual data-binding required)
    // when authorize called it redirects browser to Auth0 login page
    login = () => {
        this.auth0.authorize()
    };

    handleAuthentication = () => {
        // parseHash built into Auth0js lib
        // parses the hash from the URL
        // get both an error obj and result
        // auth result should have access and id tokens
        this.auth0.parseHash((error, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                // pass setSession authResult data
                console.log("parseHash", authResult)
                this.setSession(authResult)
                // programmatically tell react to redirect url to "/"
                this.history.push("/")
            } else if (error) {
                this.history.push("/")
                alert(`Error ${error.error}. Check the console for details`)
                console.log(error)
            }
        })
    }
    // receives an authResult
    setSession = authResult => {
        console.log("setSess", authResult)
        // set time for access token lifespan (36000 seconds, tick tock)
        const expiresAt = JSON.stringify(
            // Date().getTime() returns the current UTC time in UNIX Epoch format
            authResult.expiresIn*1000+new Date().getTime()
        )
        // goal: calculate UNIX Epoch time that JWT expires
        // UNIX Epoch time is number of milliseconds since Jan 1, 1970
        // 3 steps to calculate UNIX Epoch time of JWT expiration
            // (1) authResult.expiresIn contains expiration in seconds
            // (2) _E^3 seconds -> ms
            // (3) add current Unix Epoch time 
                // above in setSessions
    
    // val for scope param in authResult ?
    // use to set scopes in session for user (authResult.scope) :
    // use the scopes as requested (this.requestedScopes)
    // if !scopes then set to ("")
    const scopes = authResult.scope || this.requestedScopes || "";
    
    // save access token
    localStorage.setItem("access_token", authResult.accessToken);   
    // save id token
    localStorage.setItem("id_token", authResult.idToken);
    // save expiration value to expiresAt result
    localStorage.setItem("expires_at", expiresAt);
    // set scopes to local storage with JSON.stringify
    // tokens content can't be tampered with (crypto signature validated on server)
    localStorage.setItem("scopes", JSON.stringify(scopes))
    };

    isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
    }

    logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("scopes");
        // auth0 checks session cookie on browser to determine if logged in
        this.userProfile = null;
        this.auth0.logout({
            // client ID passed
          clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            // redirect address
          returnTo: "http://localhost:3000"
        });
      };
      // gets access token from local storage
      getAccessToken = () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("No access token found.");
        }
        return accessToken;
      };
      // will return users profile if it's already found
      // initialize in the constructor 
      getProfile = cb => {
        if (this.userProfile) return cb(this.userProfile);
        // endpoint is part of the OAuth standard
        // common on every identity provider
        // alternatively, can get users pf from ID token via JWT-decode (npm)
        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
          if (profile) this.userProfile = profile;
          cb(profile, err);
        });
      };
      // accepts an array of scopes
      // checks local storage for list of scopes
      // if no scopes, defaults to empty string
      // uses scopes.every to iterate over every scope
      userHasScopes(scopes) {
        const grantedScopes = (
          JSON.parse(localStorage.getItem("scopes")) || ""
        ).split(" ")
        return scopes.every(scopes => grantedScopes.includes(scopes))
      }
}
