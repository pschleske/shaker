import { BackButton } from "../components/BackButton"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = event => {
        event.preventDefault()

        axios.post('api/register', {
            username,
            email,
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
                <h3 className='text-xl font-bold'> Register! </h3>
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

                <div className='pb-4'>
                    <label> Email </label>
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
                        value={email}
                        onChange={event => setEmail(event.target.value)}
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
                        onClick={(event) => handleRegister(event)}
                    >Submit</button>
                </div>
            </form>
            <BackButton />
        </div>
    )
}
