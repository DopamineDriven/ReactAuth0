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

----------------------------------------------------------
- Note: can delete node_modules from terminal via rm -rf node_modules/
----------------------------------------------------------


## Setting Up Auth0
- Login via User/PW, Github, Microsoft, or Google
- Create Tenant Domain
    - A tenant is a logical isolation unit
    - Conceptualize tenant as a development environment
    - Will have a separate Tenant for prod, dev, and QA
    - Allows changes to one environment without affecting others

## Login and Signup Options
- Custom UI
- Universal and Embedded Lock options
    - Both use lock widget

### Lock Widget provided by Auth0
- Universal and Embedded lock options
- Benefits
    - Easily integrates with Auth0
    - Adapts to config settings
    - UI is great on any device
    - Remembers last used connection
    - Automatic internalization
    - Detailed password policy check for signups
        - Honors settings specified in dashboard
    - Customizable
        - Color schemes
        - Behaviors to match needs

### Universal Lock
- Hosted by Auth0
- Most secure
- Avoids cross-domain issues
- Single, centralized login for SSO (single sign-on)
- Less maintenance work  

### Embedded Lock
- Embedded within app
- Places login form inside React app
- Inherently less secure 
    - Requires cross-domain calls between Auth0 and app
    - Recommended to set up custom domain for this option
        - Optimal security purposes

### Custom UI
- Requires one to build UI and call Auth0 APIs
- Auth0 provides an SDK (software development kit) and wide variety of APIs

## Storing Tokens
- Cookies are vulnerable to cross-site request forgery attacks
    - Malicious website, email, or blog causes users web browser to perform unwanted action on a trusted site where user is currently logged in 
    - Much smaller limit on storage (4k/domain)
    - Sent on all requests (wastes bandwidth)
- If React app has dedicated server then storing tokens in an HttpOnly Cookie w/ secure flag enabled is recommended
    - protects from cross-site scripting
    - such cookies cannot be accessed by JavaScript
    - Hence, why they're generated on a server

### Cross-site Scripting (XSS)
- Attacker injects client-side script
    - risk comes from mishandling user content
    - for example, not HTML encoding
- React protects against XSS
    - Automatically escapes vars 
    - Behaviors to avoid:
        - using dangerouslySetInnerHTML (unescaping)
        - pass user-supplied vals to props (hrefs on anchors)
- Not recommended to store tokens in local storage
    - vulnerable to XSSAs
- Handle tokens on backend ideally
    - Superior XSS protection 
    - Authorization code flow worth considering
- For SPAS
    - Store tokens in memory
        - Use silent auth to avoid user having to login again if they leave page locally

- http://browsercookielimits.squawky.net/
---------------------------------------------------------------------
#### Note about package.json
- run-p means run in parallel
- so, "run-p start:client start:server" means to run the client and server in parallel
----------------------------------------------------------------------

### OAuth2
- Protocol that allows one to share info w/ another app
    - w/out sharing username or password
- Each permission granted = scope
- OAuth in action
    - LinkedIn network growth
    - click on button to sync contacts
    - presented with consent form to see, edit, download, delete google contacts
    - these are scopes
    - if allow is clicked, linkedin can access google data even though it does not have google password
    - this is granting requested scopes
    - google confirms access token provided has read contact scope, returns contacts to linkedin
    - all of this happens via OAuth2 protocol

### Fine-grained authorization using Scopes
- Scopes
    - Delegate permission
    - Specificy actions an app can perform on behalf of user

### Customizing pipeline authentication behavior with Auth0
- Rules
    - written in JS 
    - run as part of auth process
    - https://auth0.com/docs/rules/current
    - verification email stores users role in app_metadata which the user cannot change
    -  for setting roles to a user
        - addRolesToUser function checks if a users email ends in a certain domain
        - if so, they add admin role to user
        - else, admin is not assigned; they are a plain user
        - simplistic example
- users can change user_metadata
- users cannot change app_metadata

### Session Cookie
- Contains unique random id via the server
    - server determines authorization via session (stored in server)
    - each time user calls API server uses id to determine who user is
    - then queries db to determine authorization rights for user
    - simple
    - secure when using http only cookies over https 
- Handle authentication but not authorization
    - merely an identifier
    - no authorization data included
    - similar to an ID one carries
    - server determines authorization
    - impacts performance since db must be queried to determine user rights on each call
- downside can be mitigated by storying user sessions in an in-memory cache to avoid database call overhead
    - which is to say, to avoid cs to ss calls on each query


### JWT Scopes
- create own custom scopes 
    - assign different scopes to different users stored in a jwt
    - caution
        - scopes were designed to specify what an app is allowed to do with a third party on a user's behalf
    - However, Auth0 does support this
        - can design different scopes (permissions) to different users upon login using Auth0 rules 
        - jwts = cryptographically secure; hence, can trust scopes in jwt token 
        - improves performance --> avoid db call 
    - TRADEOFF
        - using scopes for granular permissions quickly leads to bloated jwts containing dozens of scopes
        - simple app? good method
        - complex app? not such a good method
    - example:
        - a user may have a delete products scope, BUT they may only have the right to delete a product that they created
        - do not scale well for complex authorization scenarios

### JWT with Roles*(best one-size-fits-all)
- Roles group users by permissions
    - grant different permissions to each role 
    - include role info within access tokens
    - simple and scalable
    - what I used in my project 8) (Consilience repo)

#### Bottom Line
- use scopes for original purpose
    - delegating permissions for app to interact with 3rd party data
- use roles for handling your own apps permissions


## Steps to configure context:
- (1) Declare context
- (2) Declare provider (provides data/functions)
- (3) Declare consumer (consumes data/functions)

### Declaring Provider
- Typically provider declared near entry point of app (App.jsx)
    - This way, all child components can consume data and functions provided
