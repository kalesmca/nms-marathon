import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../redux/actions/user';

const LoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState("")
    const applicationState = useSelector((state) => state);

    const loginUser = () => {
        dispatch(getUser())

        console.log('applicationState :', applicationState)

    }
    useEffect(() => {
        console.log(' use Effect applicationState :', applicationState)
        if (applicationState?.user?.userList?.length) {
            const dbUser = applicationState.user.userList.find((item) => item.mobile === parseInt(mobile))
            console.log(dbUser)
            dbUser ? navigate('user') : navigate('users-registration')
        }

    }, [applicationState])

    return (
        <div> LoginComponent
            <input value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
            <button onClick={() => loginUser()}>Login</button>

        </div>
    )
}

export default LoginComponent;