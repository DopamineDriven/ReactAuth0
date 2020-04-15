require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// const PORT = process.env.PORT || process.env.REACT_APP_PORT;

// instantiate express
const app = express();

// declare first endpoint (public)
app.get('/public', (req, res) => {
    res.json({
        message: "hello from a public API!"
    })
    .catch(error)
})

// declare next endpoint (private)
app.get('/private', (req, res) => {
    res.json({
        message: "hello from a public API!"
    })
    .catch(error)
})

app.listen(process.env.REACT_APP_PORT, error => {
    if (error) throw error
    console.log(`🌎 ==> API Server now listening on ${process.env.REACT_APP_AUTH0_AUDIENCE}`)
});