import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const Register = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(authUser){
            navigate('/');
        }
    
    })

    return (
        <>
            <RegisterForm />
        </>
    )
}

export default Register;