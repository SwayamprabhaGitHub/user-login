import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedin: false,
    login: (token) => {},
    logout: () => {}
})

export default AuthContext;