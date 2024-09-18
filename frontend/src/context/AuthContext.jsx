import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const apiUrl = import.meta.env.VITE_API_URL;
    const { getItem, setItem, removeItem } = useLocalStorage();
    const [authUser, setAuthUser] = useState(getItem('user'));
    

    useEffect(() => {
       const fetchAuthStatus = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user/status`, { withCredentials: true });
            
                if(response.data.authenticated){
                    setAuthUser(response.data.user);
                    setItem('user', response.data.user);
                }
                
            } catch(err) {
                console.err('Error fetching authentication status: ', err);
                setAuthUser(null);
                removeItem('user');
            }
       }
       
       fetchAuthStatus();
    }, [])

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

