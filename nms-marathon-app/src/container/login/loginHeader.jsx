import React from "react";
import './login.scss';
import { global } from "../../config/locale";
import bannerHeader from '../../assets/images/marathon_banner_header.png'

const LoginHeader = () =>{
    return(
        <div className="img-login-header">
            {/* <div className="header">{global.label.clubName}</div> */}
            
            {/* <div>
                <LoginComponent />
            </div> */}
            {/* <p className="theme">உலகிற்கே உணவு கொடுக்கும் உன்னதப் பணி செய்பவனே விவசாயி. sd</p> */}

        </div>
    )
}

export default LoginHeader;