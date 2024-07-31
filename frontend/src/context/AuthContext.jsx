import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const { getItem, setItem, removeItem } = useLocalStorage();
    const [authUser, setAuthUser] = useState(getItem('user'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
       const fetchAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/status', { withCredentials: true });
                
                setIsLoggedIn(response.data.authenticated);

                if(response.data.authenticated){
                    setAuthUser(response.data.user);
                    setItem('user', response.data.user);
                }
                
            } catch(err) {
                console.err('Error fetching authentication status: ', err);
                setIsLoggedIn(false);
                setAuthUser(null);
                removeItem('user');
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

