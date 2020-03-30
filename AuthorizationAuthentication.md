# Key Standards
- OAuth 2.0
- OpenID Connect
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

### Authentication

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
- Identity Provider
    - The entity that holds the users information 
    - Google, Microsoft, Facebook, Twitter (IP)
- Relying Party (your app)
    - Relies on the IPs to authenticate users
    - Renders need for unique username/password for app obsolete
    - Can trust these robust IPs
