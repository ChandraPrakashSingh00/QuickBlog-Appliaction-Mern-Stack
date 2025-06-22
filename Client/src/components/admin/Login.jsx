import React from 'react'
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext'; // Adjust the path as necessary
import toast from 'react-hot-toast';

const Login = () => {

const {axios, navigate, setToken} = useAppContext(); // Ensure you have the context set up correctly

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const {data} = await axios.post('/api/admin/login', {email, password});
        if(data.success){
            setToken(data.token);
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Authorization'] = data.token;
        } else {
            toast.error(error.message);
        }
    }
    catch(error){
        toast.error(error.message);
    }
}

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center'>
            <div className='w-full py-6 text-center'>
              <h1 className='font-bold text-3xl'> <span className='text-primary'>Admin</span>Login</h1>
              <p className='font-light'>Enter Your Credentials to access the admin panel </p>
            </div>

            <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
               <div className='flex flex-col'>
                <label>Email</label>
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder='Your Email id' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
               </div>
               
               <div className='flex flex-col'>
                <label>Password</label>
                <input onChange={e => setPassword(e.target.value)} value={password}
                type="text" placeholder='Password' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
               </div>

               <button className='w-full font-medium py-3 bg-primary text-white cursor-pointer hover:bg-primary/90 rounded transition' type='submit'>Submit</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
