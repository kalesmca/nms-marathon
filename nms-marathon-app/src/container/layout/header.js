import React, { useEffect, useState } from "react";
import { AUTH_STATUS } from '../../config/constants';
import "./header.scss";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { setAuthStatus } from '../../redux/actions/players';
import { global } from "../../config/locale";
import logoutIcon from "../../assets/power-off-solid.svg"
import signout from '../../assets/signout.svg'
import Dropdown from 'react-bootstrap/Dropdown';

const HeaderComponent = () => {
    const playerState = useSelector((state) => state?.players)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [selectedNav, setSelectedNav] = useState("Dashboard")

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
            {/* <img src={logoutIcon} alt="SVG Image"></img> */}
            {
                playerState?.authStatus === "ADMIN_ACCESS" || playerState?.authStatus === "SUPER_ADMIN_ACCESS" ? (
                    // true? (

                    <div>
                        <Dropdown className="d-inline mx-2" value={selectedNav} >
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    {selectedNav}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                   
                                <Dropdown.Item key={"1d"} value={"Dashboard"} onClick={(e) => { setSelectedNav("Dashboard") }}><Link to="/authed/dashboard">Dashboard</Link></Dropdown.Item>
                                <Dropdown.Item  key={"2d"} value={"Player List"} onClick={(e) => { setSelectedNav("Player List") }}><Link to="/authed/player-list">Player List</Link></Dropdown.Item>
                                {playerState?.authStatus === "SUPER_ADMIN_ACCESS" && (<Dropdown.Item  key={"3d"} value={"Registration"} onClick={(e) => { setSelectedNav("Registration") }}><Link to="/authed/registration">Registration</Link></Dropdown.Item>)}
                                <Dropdown.Item  key={"4d"} value={"T-shirt"} onClick={(e) => { setSelectedNav("T-shirt") }}><Link to="/authed/tshirt">T-shirt</Link></Dropdown.Item>
                                <Dropdown.Item  key={"5d"} value={"Chest-Number"} onClick={(e) => { setSelectedNav("Chest-Number") }}><Link to="/authed/chest-number">Chest-Number</Link></Dropdown.Item>

                                <Dropdown.Item  key={"6d"} value={"Source"} onClick={(e) => { setSelectedNav("Source") }}><Link to="/authed/source">Source</Link></Dropdown.Item>
                                {/* <Dropdown.Item  value={"Dashboard"} onClick={(e) => { setSelectedNav("Dashboard") }}>{"Dashboard"}</Dropdown.Item> */}

                                      

                                    
                                </Dropdown.Menu>
                            </Dropdown>
                    </div>

                    // <div className="nav-links">

                    //     <nav>

                    //         <div className='link'>
                    //             {/* <i className="fas fa-home" onClick={() => { navigation("/dashboard") }}></i> */}
                    //             <Link to="/authed/dashboard">Dashboard</Link>
                    //         </div>
                    //         <div className='link'>
                    //             {/* <i className="fas fa-address-card" onClick={() => { navigation("/member-list") }}></i> */}
                    //             <Link to="/authed/player-list">Player List</Link>
                    //         </div>
                    //         <div className='link'>
                    //             {/* <i className="fas fa-chart-line" onClick={() => { navigation("/member-info") }}></i> */}
                    //             <Link to="/authed/registration">Registration</Link>
                    //         </div>
                    //         <div className='link'>
                    //             {/* <i className="fas fa-chart-line" onClick={() => { navigation("/member-info") }}></i> */}
                    //             <Link to="/authed/tshirt">T-shirt</Link>
                    //         </div>
                    //         <div className='link'>
                    //             {/* <i className="fas fa-chart-line" onClick={() => { navigation("/member-info") }}></i> */}
                    //             <Link to="/authed/source">Source</Link>
                    //         </div>


                    //     </nav>



                    // </div>
                ) : ""
            }
            {
                logOutFlag || playerState.authStatus != AUTH_STATUS.PENDING ? (<div className="logout-container">
                    
                    <span onClick={() => { logout() }} >
                    <a className="logout" >Log-out</a>
                    </span>
                    <span onClick={() => { logout() }} >
                         <img src={logoutIcon} alt="SVG Image"></img>
                    </span>
                    
                    {/* <Button variant="primary" onClick={() => { logout() }}>
                        Logout
                    </Button> */}

                </div>) : ""
            }


        </div>
    )
}

export default HeaderComponent;