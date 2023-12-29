import React, { useEffect, useState } from "react";
import { AUTH_STATUS } from '../../config/constants';
import "./header.scss";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { setAuthStatus } from '../../redux/actions/players';
import { global } from "../../config/locale";

const HeaderComponent = () => {
    const playerState = useSelector((state) => state?.players)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [logOutFlag, setLogOutFlag] = useState(false);


    const navigation = (path) => {
        navigate(path);
    }
    useEffect(() => {
        const localAuth = JSON.parse(localStorage.getItem("auth"))
        if (localAuth && localAuth.mobile) {
            setLogOutFlag(true)
        } else {
            setLogOutFlag(false)
        }

    }, [])
    const logout = () => {
        localStorage.removeItem("auth");
        dispatch(setAuthStatus(AUTH_STATUS.PENDING))
        navigate("")
    }
    return (
        <div>
            <div className="header">{global.label.clubName}</div>
            <p className="theme">உலகிற்கே உணவு கொடுக்கும் உன்னதப் பணி செய்பவனே விவசாயி.</p>

            {
                playerState?.authStatus === "ADMIN_ACCESS" || playerState?.authStatus === "SUPER_ADMIN_ACCESS" ? (
                    // true? (

                    <div className="nav-links">

                        <nav>

                            <div className='link'>
                                {/* <i className="fas fa-home" onClick={() => { navigation("/dashboard") }}></i> */}
                                <Link to="/authed/dashboard">Dashboard</Link>
                            </div>
                            <div className='link'>
                                {/* <i className="fas fa-address-card" onClick={() => { navigation("/member-list") }}></i> */}
                                <Link to="/authed/player-list">Player List</Link>
                            </div>
                            <div className='link'>
                                {/* <i className="fas fa-chart-line" onClick={() => { navigation("/member-info") }}></i> */}
                                <Link to="/authed/registration">Registration</Link>
                            </div>
                            <div className='link'>
                                {/* <i className="fas fa-chart-line" onClick={() => { navigation("/member-info") }}></i> */}
                                <Link to="/authed/source">Source</Link>
                            </div>


                        </nav>



                    </div>
                ) : ""
            }
            {
                logOutFlag || playerState.authStatus != AUTH_STATUS.PENDING ? (<div>
                    <Button variant="primary" onClick={() => { logout() }}>
                        Logout
                    </Button>

                </div>) : ""
            }


        </div>
    )
}

export default HeaderComponent;