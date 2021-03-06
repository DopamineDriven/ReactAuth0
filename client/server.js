require('dotenv').config();
const express = require('express');
// validates jwts and sets req.user
const jwt = require('express-jwt');
// retrieves RSA keys from public JSON web key set
// that Auth0 exposes under our domain
const jwksRsa = require('jwks-rsa');
// import express-jwt-authz to validate scopes
const checkScope = require("express-jwt-authz");

// verifies that info inside jwt is valid 
// ensures that the jwt was generated by Auth0
const checkJwt = jwt({
    // dynamically provide signing key based on the key id in header
    // the signing keys provided by JWKS endpoint
        secret: jwksRsa.expressJwtSecret({
        cache: true, // cache the signing key
        rateLimit: true, // limits rate
        jwksRequestsPerMinute: 5, // prevents attackers from requesting more than 1/12s
        jwksUri: `https://${
            process.env.REACT_APP_AUTH0_DOMAIN
        }/.well-known/jwks.json`
    }),
    // validates the audience and the issuer
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
    // matches algorithm type selected in Auth0 dashboard
    algoirthms: ["RS256"]
})

// instantiate express
const app = express();

// declare first endpoint (public)
app.get('/public', (req, res) => {
    res.json({
        message: "Hello from a public API!"
    })
})

// declare next endpoint (private)
app.get('/private', checkJwt, (req, res) => {
    res.json({
        message: "Hello from a private API!"
    })
})

// check scope additional middleware that checks jwt-auth to validate scopes
// requiring that the user has the read:courses scope in access token
// will return two courses if user has read:courses scope in valid jwt
app.get('/course', checkJwt, checkScope(["read:courses"]), (req, res) => {
    res.json({
        courses: [
            { id: 1, title: "Building Apps with React and Redux" },
            { id: 2, title: "Creating Reusable React Components" }
        ]
    })
})
// middleware checking user role
function checkRole(role) {
    return (req, res, next) => {
        const assignedRoles = req.user['http://localhost:3000/roles'];
        if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
            return next();
        } else {
            return res.status(401).send('insufficient role permissions')
        }
    }
}

app.get('/admin', checkJwt, checkRole('admin'), (req, res) => {
    res.json({
        message: "Hello from an admin API!"
    })
})

app.listen(process.env.REACT_APP_PORT, error => {
    if (!error){
        console.log(`🌎 ==> API Server now listening on ${process.env.REACT_APP_AUTH0_AUDIENCE}`)
    }
});