import React from "react";
import './login.scss';
import { global } from "../../config/locale";

const LoginHeader = () =>{
    return(
        <div>
            <div className="header">{global.label.clubName}</div>
            <p className="theme">உலகிற்கே உணவு கொடுக்கும் உன்னதப் பணி செய்பவனே விவசாயி.</p>

        </div>
    )
}

export default LoginHeader;