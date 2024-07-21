// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
       const fetchAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/status', { withCredentials: true });
                
                setIsLoggedIn(response.data.authenticated);

                if(response.data.authenticated){
                    setAuthUser(response.data.user);
                }
                
            } catch(err) {
                console.err('Error fetching authentication status: ', err);
                setIsLoggedIn(false);
                setAuthUser(null);
            }
       }
       
       fetchAuthStatus();
    }, [])
    

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


