import React from "react";
import './login.scss';
import { global } from "../../config/locale";
import bannerHeader from '../../assets/images/marathon_banner_header.png'

const LoginHeader = () =>{
    return(
        <div className="login-header-container">
            <img src={bannerHeader} alt="NMS Marathon Banner" className="banner-img" />
        </div>
    )
}

export default LoginHeader;