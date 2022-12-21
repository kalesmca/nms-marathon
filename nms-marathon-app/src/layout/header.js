import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


const HeaderComponent = () => {
    const applicationState = useSelector((state) => state);
    const [admin, setAdmin] = useState({})
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
        };
    };
    useEffect(() => {
    }, [applicationState])
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
                        <a href="#" className="right">Link</a>
                    </div>
                ) : ""
            }



        </div>
    )
}

export default HeaderComponent;