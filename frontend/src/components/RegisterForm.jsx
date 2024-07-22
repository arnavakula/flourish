import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';


const RegisterForm = () => {
    const { setAuthUser, setIsLoggedIn } = useAuth();
    const [registerInfo, setRegisterInfo] = useState({});
    const navigate = useNavigate();
    
    const handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            const response = await axios.post('http://localhost:8000/user/register', registerInfo, { withCredentials: true });

            setIsLoggedIn(true);
            setAuthUser(response.data.user);
            navigate('/');
        } catch(err) {
            console.error('Login error:', err);
        }
    }

    console.log(registerInfo);

    return (
      <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=900"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register for an account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='flex flex-row'>
                    <div>
                        <label htmlFor="first" className="block text-sm font-medium leading-6 text-gray-900">
                        First Name
                        </label>
                        <div className="mt-2">
                        <input
                            id="first"
                            name="first"
                            required
                            autoComplete="first"
                            onChange={e => setRegisterInfo(prev => ({...prev, 'first': e.target.value}))}
                            className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        
                        </div>
                    </div>

                    <div className='ml-[auto]'>
                        <label htmlFor="last" className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                        </label>
                        <div className="mt-2">
                        <input
                            id="last"
                            name="last"
                            required
                            autoComplete="last"
                            onChange={e => setRegisterInfo(prev => ({...prev, 'last': e.target.value}))}
                            className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        
                        </div>
                    </div>
                </div>
                
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    required
                    autoComplete="username"
                    onChange={e => setRegisterInfo(prev => ({...prev, 'username': e.target.value}))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    onChange={e => setRegisterInfo(prev => ({...prev, 'email': e.target.value}))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-[#134b1f] hover:text-[#14421d]">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={e => setRegisterInfo(prev => ({...prev, 'password': e.target.value}))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                        className="flex w-full justify-center rounded-md bg-[#134b1f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#14421d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold leading-6 text-[#134b1f] hover:text-[#14421d]">
                Login
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }

  export default RegisterForm;