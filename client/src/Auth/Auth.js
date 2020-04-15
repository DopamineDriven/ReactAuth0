import auth0 from 'auth0-js';
require('dotenv').config();
// https://auth0.github.io/auth0.js/index.html
const REDIRECT_ON_LOGIN = "redirect_on_login"

// private vars stored outside class
let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;

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
      localStorage.setItem(
        REDIRECT_ON_LOGIN, 
        JSON.stringify(this.history.location)
      );
      this.auth0.authorize()
    };

    handleAuthentication = () => {
        // parseHash built into Auth0js lib
        // parses the hash from the URL
        // auth result should have access and id tokens
        this.auth0.parseHash((error, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                // pass setSession authResult data
                console.log("parseHash", authResult)
                this.setSession(authResult)
                // redirects user to location they were at after logging in
                const redirectLocation = 
                  localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
                    ? "/" 
                    : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN))
                this.history.push(redirectLocation)
            } else if (error) {
                this.history.push("/")
                alert(`Error ${error.error}. Check the console for details`)
                console.log(error)
            }
            // clean up local storage one finished
            localStorage.removeItem(REDIRECT_ON_LOGIN)
        })
    }
    // receives an authResult
    setSession = authResult => {
        console.log("setSess", authResult)
        // set time for access token lifespan (36000 seconds, tick tock)
            // Date().getTime() returns the current UTC time in UNIX Epoch format
        _expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
        
    // val for scope param in authResult ?
    // use to set scopes in session for user (authResult.scope) :
    // use the scopes as requested (this.requestedScopes)
    // if !scopes then set to ("")
    _scopes = authResult.scope || this.requestedScopes || "";
    _accessToken = authResult.accessToken
    _idToken = authResult.idToken
    }

    isAuthenticated() {
      return new Date().getTime() < _expiresAt;
    }

    logout = () => {
      this.auth0.logout({
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        returnTo: "http://localhost:3000"
      })
    };


    getAccessToken = () => {
      if (!accessToken) {
        throw new Error("No access token found.");
      }
      return _accessToken;
    };

    // endpoint is part of the OAuth standard
    // common on every identity provider
    // alternatively, can get users pf from ID token via JWT-decode (npm)
    getProfile = cb => {
      if (this.userProfile) return cb(this.userProfile);
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
      const grantedScopes = (_scopes || "").split(" ")
      return scopes.every(scope => grantedScopes.includes(scope))
    }

    
  }
