require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// instatiate express
const app = express();

app.get('/public', (req, res) => {
    res.json({
        message: "hello from a public API!"
    })
    .catch(error)
})

app.get('/private', (req, res) => {
    res.json({
        message: "hello from a public API!"
    })
    .catch(error)
})