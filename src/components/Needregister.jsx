import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Needregister = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='flex justify-center items-center '>
                <button onClick={() => navigate('/register')}> Register here </button>
            </div>
        </>
    )
}
