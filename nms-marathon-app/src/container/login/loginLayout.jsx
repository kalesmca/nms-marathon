import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import LoginHeader from "./loginHeader";
import "./login.scss";
import MessageModal from "../common/modals/msgModals";

const LoginLayout = () => {
  const localAuth = JSON.parse(localStorage.getItem("auth"))


  // if (localAuth && localAuth.mobile) {
  //   return <Navigate to="/authed/dashboard" />;
  // }

  return (
    <div>

      <div className="login-header-container">
        <LoginHeader />
      </div>
      <div>
        <Outlet />
      </div>
      <MessageModal/>

    </div>
  )
}

export default LoginLayout;