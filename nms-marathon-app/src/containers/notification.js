import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUserList, updateUser } from '../redux/actions/user';
import {adminList} from '../constants/config';

const NotificationComponent = () => {


    useEffect(() => {
        localStorage.clear();   
    }, [])

   


    return (
        
        <div className="login-flex-container">
        <div className="login-container"> 
        {/* <h2 className="header">Login / SignUp</h2> */}
        <div className="form-containter">
            
            <div className="notification-txt"><h1>Coming Soon...</h1></div>
        </div>

        
    </div>
    </div>
    )
}

export default NotificationComponent;