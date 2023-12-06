import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Homepage = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await axios.delete('/api/logout')
        navigate('/')
    }

    return (
        <>
            <h1>Homepage</h1>
            <div>
                <button className='bg-blue-500 text-white rounded-xl w-28 h-8'
                    onClick={handleLogout}
                >Logout</button>
            </div>
        </>
    )
}
