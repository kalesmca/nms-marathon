import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getUserByMobile, getUserList} from '../redux/actions/user'


const HeaderComponent = () => {
    const applicationState = useSelector((state) => state);
    const dispatch = useDispatch();
    const [admin, setAdmin] = useState({})
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
        };
    };
    useEffect(() => {
        if(!applicationState?.user?.userList?.length){
            localStorage.getItem('mobile') ? dispatch(getUserByMobile(localStorage.getItem('mobile'))) : dispatch(getUserList())
        }
    }, [])
    return (
        <div className="header-container">
            <div className="header">
                <h1>NMS SPORTS CLUB</h1>
                <p>உலகிற்கே உணவு கொடுக்கும் உன்னதப் பணி செய்பவனே விவசாயி.</p>
            </div>
            {
                applicationState.user.isAdmin ? (
                    <div className="navbar">

                        <NavLink style={navLinkStyles} to="/dashboard">
                            Dashboard
                        </NavLink>
                        <NavLink style={navLinkStyles} to="/users-update">
                            User-Action
                        </NavLink>
                        <NavLink style={navLinkStyles} to="/">
                            Log-out
                        </NavLink>
                    </div>
                ) : ""
            }



        </div>
    )
}

export default HeaderComponent;