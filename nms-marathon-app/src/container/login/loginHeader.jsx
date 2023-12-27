import React from "react";
import './login.scss';
import { global } from "../../config/locale";

const LoginHeader = () =>{
    return(
        <div>
            <div className="header">{global.label.clubName}</div>
        </div>
    )
}

export default LoginHeader;