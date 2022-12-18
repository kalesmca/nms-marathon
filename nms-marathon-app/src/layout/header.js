import React from "react";
import { NavLink } from "react-router-dom";


const HeaderComponent = () => {
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "none" : "underline"
        };
    };
    return (
        <div className="header-container">
            <div class="header">
                <h1>NMS SPORTS CLUB</h1>
                <p>உலகிற்கே உணவு கொடுக்கும் உன்னதப் பணி செய்பவனே விவசாயி.</p>
            </div>

            <div class="navbar">
                {/* <a href="#" class="active">Home</a>
                <a href="#">Link</a>
                <a href="#">Link</a> */}
                <NavLink style={navLinkStyles} to="/dashboard">
                    Dashboard
                </NavLink>
                <NavLink style={navLinkStyles} to="/users-update">
                     User-Action
                 </NavLink>
                <a href="#" class="right">Link</a>
            </div>

        </div>


        // <div>Header Component
        //     <nav className="primary-nav">

        //         <NavLink style={navLinkStyles} to="/dashboard">
        //             Dashboard
        //         </NavLink>
        //         <NavLink style={navLinkStyles} to="/users-update">
        //             User-Action
        //         </NavLink>
        //     </nav>
        // </div>
    )
}

export default HeaderComponent;