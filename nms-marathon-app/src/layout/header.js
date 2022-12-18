import React from "react";
import { NavLink } from "react-router-dom";


const HeaderComponent = () => {
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
        };
    };
    return (
        <div className="header-container">
            <div className="header">
                <h1>NMS SPORTS CLUB</h1>
                <p>உலகிற்கே உணவு கொடுக்கும் உன்னதப் பணி செய்பவனே விவசாயி.</p>
            </div>

            <div className="navbar">

                <NavLink style={navLinkStyles} to="/dashboard">
                    Dashboard
                </NavLink>
                <NavLink style={navLinkStyles} to="/users-update">
                    User-Action
                </NavLink>
                <a href="#" className="right">Link</a>
            </div>

        </div>
    )
}

export default HeaderComponent;