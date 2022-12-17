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
        <div>Header Component
            <nav className="primary-nav">
                {/* <Link to="/">Home</Link> */}
                {/* <Link to="/about">About</Link> */}
                <NavLink style={navLinkStyles} to="/dashboard">
                    Dashboard
                </NavLink>
                <NavLink style={navLinkStyles} to="/users-update">
                    User-Action
                </NavLink>
            </nav>
        </div>
    )
}

export default HeaderComponent;