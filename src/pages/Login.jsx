import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

import { Needregister } from '../components/Needregister'

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = event => {
        event.preventDefault()

        axios.post('/api/login', {
            username,
            password
        })
            .then(res => {
                const userData = res.data
                navigate('/homepage')
            })
            .catch((err => console.log(err)))
    }

    return (
        <div className='flex flex-col w-screen px-14 pt-10 justify-center'>

            <div className='flex justify-center pb-6'>
                <h3 className='text-xl font-bold'> Sign In! </h3>
            </div>

            <form className='flex flex-col '>

                <div className='pb-4'>
                    <label> Username </label>
                    <input
                        className='
                        w-full
                        mt-1
                        p-2
                        border
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                        bg-inherit'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>

                <div className=''>
                    <label> Password </label>
                    <input
                        className='
                        w-full
                        mt-1
                        p-2
                        border
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                        bg-inherit'
                        type='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div className='py-6 flex justify-center items-center'>
                    <button
                        className='bg-green-500 text-white w-28 h-8 rounded-xl'
                        onClick={() => handleLogin(event)}
                    >Submit</button>
                </div>
            </form>
            <Needregister />
        </div>
    )
}
