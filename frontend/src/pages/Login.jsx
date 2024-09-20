import NavBar from '../components/NavBar';
import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(authUser){
            navigate('/');
        }
    
    })

    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default Login;