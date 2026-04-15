import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import LeafBackdrop from '../assets/images/leaf-backdrop.jpg'
import Logo from '../assets/images/logo.svg'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


const RegisterForm = () => {
    const { login } = useAuth();
    const [registerInfo, setRegisterInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const handleSubmit = async (evt) => {
      try {
          evt.preventDefault();
          const response = await axios.post(`${apiUrl}/user/register`, registerInfo, { withCredentials: true });

          login(response.data.user);
          navigate('/dashboard');
      } catch(err) {
          console.error('Login error:', err);
          setErrorMessage('Error with registering, try entering new details')
      }
    }

    return (
      <>
      <div className='flex flex-row-reverse min-h-screen max-h-screen bg-[#fafaf7] font-source'>
      <img src={LeafBackdrop} alt='' loading='eager' fetchpriority='high' className='w-[50%] object-cover hidden xl:block'/>
      <div className='flex flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
         <div className='scale-110 px-6'>
          <Link to='/' className='flex items-center gap-[0.25vw]'>
          <ArrowBackRoundedIcon fontSize='small '/>
          <span className='underline'> Back to home</span>
          </Link>
        </div>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              alt='Flourish'
              src={Logo}
              className='mx-auto h-12 w-auto'
            />
            <h2 className='mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900'>
              Create your account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-500'>Join the Flourish community</p>
          </div>

          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
          {errorMessage && (
              <div className='bg-red-500 text-white text-center py-2 rounded-md mb-4'>
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='flex flex-row gap-3'>
                    <div className='flex-1'>
                        <label htmlFor='first' className='block text-sm font-medium leading-6 text-gray-900'>
                        First Name
                        </label>
                        <div className='mt-2'>
                        <input
                            id='first'
                            name='first'
                            required
                            autoComplete='first'
                            onChange={e => setRegisterInfo(prev => ({...prev, 'first': e.target.value}))}
                            className='block w-[100%] rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#134b1f] sm:text-sm sm:leading-6 transition-shadow'
                        />
                        
                        </div>
                    </div>

                    <div className='flex-1'>
                        <label htmlFor='last' className='block text-sm font-medium leading-6 text-gray-900'>
                        Last Name
                        </label>
                        <div className='mt-2'>
                        <input
                            id='last'
                            name='last'
                            required
                            autoComplete='last'
                            onChange={e => setRegisterInfo(prev => ({...prev, 'last': e.target.value}))}
                            className='block w-[100%] rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#134b1f] sm:text-sm sm:leading-6 transition-shadow'
                        />
                        
                        </div>
                    </div>
                </div>
                
              <div>
                <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
                  Username
                </label>
                <div className='mt-2'>
                  <input
                    id='username'
                    name='username'
                    required
                    autoComplete='username'
                    onChange={e => setRegisterInfo(prev => ({...prev, 'username': e.target.value}))}
                    className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#134b1f] sm:text-sm sm:leading-6 transition-shadow'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Email
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    autoComplete='email'
                    onChange={e => setRegisterInfo(prev => ({...prev, 'email': e.target.value}))}
                    className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#134b1f] sm:text-sm sm:leading-6 transition-shadow'
                  />
                </div>
              </div>
  
              <div>
                <div className='flex items-center justify-between'>
                  <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                    Password
                  </label>
                  <div className='text-sm'>
                    <a href='#' className='font-semibold text-[#134b1f] hover:text-[#14421d]'>
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    autoComplete='current-password'
                    onChange={e => setRegisterInfo(prev => ({...prev, 'password': e.target.value}))}
                    className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#134b1f] sm:text-sm sm:leading-6 transition-shadow'
                  />
                </div>
              </div>
  
              <div>
                <button
                  type='submit'
                        className='flex w-full justify-center rounded-md bg-[#134b1f] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#14421d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#134b1f] transition-colors'
                >
                  Create account
                </button>
              </div>
            </form>
  
            <p className='mt-10 text-center text-sm text-gray-500'>
              Already have an account?{' '}
              <Link to='/login' className='font-semibold leading-6 text-[#134b1f] hover:text-[#14421d]'>
                Login
              </Link>
            </p>
          </div>
          
        </div>
        </div>
      </>
    )
  }

  export default RegisterForm;