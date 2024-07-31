import useLocalStorage from "./useLocalStorage";
import useUser from "./useUser"
import { useEffect } from "react";

const useAuth = () => {
    const { user, addUser, removeUser, setUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');

        if(user){
            addUser(JSON.parse(user));
        }

    }, [addUser, getItem]);

    const login = (user) => {
        addUser(user)
    }

    const logout = (user) => {
        removeUser(user)
    }

    return { user, login, logout, setUser };
}

export default useAuth;