import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../redux/actions/user';
import {adminList} from '../constants/config';

const LoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState("");
    const [isAdmin, setAdmin] = useState(false)
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

    const adminCheck = () =>{
        console.log(adminList)
    }

    return (
        
        <div className="login-flex-container">
        <div className="login-container"> 
        <h2 className="header">Login / SignUp</h2>
        <div className="form-containter">
            
            <label >Mobile</label>
            <input  className="input-box" onBlur={()=>{adminCheck()}} placeholder="Your Mobile number 10 digit.."  value={mobile} onChange={(e) => { setMobile(e.target.value) }}/>
            
            {
                isAdmin ? (<div><label >Password</label>
                <input  className="input-box" placeholder="Password" /></div>) : ""
            }
            
            <input className="submit-btn" type="submit" value="Submit" onClick={() => loginUser()}/>
        </div>

        
    </div>
    </div>
    )
}

export default LoginComponent;