import React from "react";
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {
    const navigate = useNavigate()

    return (
        <div> LoginComponent
            <button onClick={() => navigate('user')}>Login</button>
        </div>
    )
}

export default LoginComponent;