import React from 'react';
// instantiate AuthContext
const AuthContext = new React.createContext();
export default AuthContext;

// Steps to configure context:
// (1) Declare context
// (2) Declare provider (provides data/functions)
// (3) Declare consumer (consumes data/functions)