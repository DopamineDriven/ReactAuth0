# Key Standards
- OAuth 2.0 (OA2)
- OpenID Connect (OIDC)
- JSON Web Tokens (JWT)

## Authentication
- Who are you?
- Login with email and password

## Authorization
- What are you allowed to do?
- Check user rights

## Why Use an Auth Provider?
- Security is hard, choose a provider specializing in security
- Customizable
    - Integrated with application
- Free for many apps

## Auth0
- Free tier supports up to 7,000 active users & unlimited logins 
- Security provider used throghout course

## OAuth 2.0
- Security protocol used throughout this course

### Authorization
- What OAuth 2.0 is all about 
- Scopes
    - String that denotes type of access for users
    - List of scopes app requires drives consent screen
    - Typically has a verb on one side, a colon in the middle, and a noun on the other side, for example
        - repo:status
        - write:public_key
        - edit:product
- Can authorize a user on web app without exposing password
- Get info from a third party (google, github, facebook, etc)

### OAuth Roles
- (1) Resource Owner
    - User
- (2) Client
    - App that wants to access users account
    - user must give client permission 
- (3) Auth Server (Auth0)
    - Handles Auth
    - Provides access tokens
- (4) Resource Server
    - Sensitive info
    - API app wants to access


### OAuth Flow
- (1) Auth Request to User (resource owner)
- (2) User accepts consent to sharing certain data
- (3) After accepting, auth grant returned to app
    - Auth Grant is data that proves that the user consented
- (4) App sends Auth grant to Auth0 server
    - Contains both Auth grant and Authentication of App's identity
- (5) Auth0 server sends app an access token
    - access token proves that client allowed to call protected APIs
- (6) Use access token to call APIs from Resource Server
- (7) Assuming Token = Valid, Resource Server returns requested Data

### Grants (AKA Flow)
- Grant: A way to receive an access token
- Different grants for different applications = unique flows 
- Implicit Grant Flow
    - Most likely best fit for SPRAs (singe page react apps)
    - https://auth0.com/docs/api-auth/which-oauth-flow-to-use


### Implicit Grant Flow
- (1) App directs browser to Auth0 sign-in
    - User authentication
- (2) Auth0 redirects app, at callback url of choice
    - Auth0 redirects browser back to specified redirect URI along with access and ID tokens as hash fragments in the URI
- (3) App reads the tokens from the url
    - App extracts tokens from URI 
    - Stores relevant Authentication data in local-storage 

### OAuth 2.0 handles Authorization
- Keeps track of what you're allowed to do by issuing access tokens that contain scopes

### OpenID Connect (OIDC) used to handle Authentication
- Technology that "sits on top" of OAuth
- Like a standard sandwich with OAuth in the middle
    - Authentication (OIDC) - top
    - Authorization (OAuth 2.0) - middle
    - HTTP (interface) - bottom 
- Avoid managing passwords ourselves
- Establish clear standard for handling authentication (OIDC)
- Adds Three Key Items
    - (1) An ID token (typically a JWT)
    - (2) An endpoint for requesting user information
    - (3) A standardized set of scopes (permissions)
- In summary, OIDC standard approach that integrates with OAuth
- https://openid.net/developers/certified/
    - list of OIDC implementations


### OIDC Jargon
- Identity Provider (IP)
    - The entity that holds the users information 
    - Google, Microsoft, Facebook, Twitter (IP)
- Relying Party (RP; your app)
    - Relies on the IPs to authenticate users
    - Renders need for unique username/password for app obsolete
    - Can trust these robust IPs

### JSON Web Tokens (JWTs)
- Access Token Standard
- Used for authorization and secure info exchange
    - Often contains user info
- Pronounced "JOT"
- Digitally signed
    - Content uncompromised
- Can be encrypted

### Why JWT over SAML (Security Assertion Markup Language)?
- JSON less verbose than XML
- Smaller when encoded
- Easier to sign than SAML
- JSON is easy to parse on the client 

### Anatomy of a JWT - Three Parts
- Header
    - Specifies type of token and hash algorithm used to create token's content
- Body
    - Contains the user identity claims
    - Information that JWT claiming to be true about user
    - Commonly includes name and timestamp reflecting JWT issue time 
- Signature 
    - Verifies sender 
    - Ensures content is uncompromised (hasn't been tampered with)

### Base64 Encoded
- JWT is compact
- Header, Body, and Signature are each Base64 encoded
    - Then separated by dots
    - https://en.wikipedia.org/wiki/Base64
    - https://www.base64encode.net/
    - Base64 Index table (values 0-63)
    - values 0-25 -> uppercase A-Z
    - values 26-51 -> lowercase a-z
    - values 52-61 -> numbers 0-9
    - value 62 -> +
    - value 63 -> /

#### Example JWT (Header.Body.Signature)
- Encoded (ASCII--American Standard Code for Information Interchange) 
    - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    - eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
    - SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
- Decoded
    - {"alg":"HS256","typ":"JWT"}
    - {"sub":"1234567890","name":"John Doe","iat":1516239022}
    - IùJÇIHÇ(]Oð¤Ç~:N²%VBË0å

### Two Concerns
- OICD uses an identity token
    - Focuses on claims
    - Each piece of data within = a claim
    - Contains a variety of user data 
    - Can store custom claims as well
- OAuth2.0 uses an access token
    - Focuses on scopes
    - Scopes are permissions 
    - Only user data in this token is the subclaim
    - Example: "scope": "openid profile read:products"
        - Permission to read users basic profile
        - Read product data from what one could assume is a product api

### JWTs cannot be revoked
- Unlike cookies, JWTs cannot be revoked
- Therefore, make their lifespan short
- Why can't they be revoked?
    - Because trusted by client without callback to server
- Auth0 defaults to approx 10 hours for JWT lifespan

### Summary
- (1) Login handled by OIDC (Authentication)
    - Receive token -> JWT
    - Cryptographically secure; app trusts content 
    - lifespan of approx 10 hrs
- (2) Receive access token -- OAuth 2.0 (Authorization)
    - When authorizing app to use data, access token received
    - Access Token may be a JWT or just a plain string 
- (3) Include Access Token in API calls for Authorization

#### Two types of tokens
- (1) Use identity tokens for Authentication (JWTs)
    - Contain claims (user info)
- (2) Use access tokens to access APIs (JWTs or plain strings)
    - Contain scopes (user permissions)

- Note: can delete node_modules from terminal via rm -rf node_modules/