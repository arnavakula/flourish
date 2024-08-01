import { AuthContext } from '../context/AuthContext';
import useLocalStorage from './useLocalStorage';
import { useContext } from 'react';

const useAuth = () => {
    const { setItem, removeItem } = useLocalStorage();
    const { authUser, setAuthUser } = useContext(AuthContext);

    const login = (user) => {
        setAuthUser(user);
        setItem('user', user);
    }

    const logout = () => {
        setAuthUser(null);
        removeItem('user');
    }

    return { authUser, setAuthUser, login, logout };
}

export default useAuth;