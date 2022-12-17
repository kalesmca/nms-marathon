import React from "react";
import { Route, Routes } from "react-router-dom";

import DashboardComponent from "../containers/dashboard";
import LoginComponent from '../containers/login';
import UserComponent from '../containers/userComponent';
import HeaderComponent from "./header";
import ApproverComponent from '../containers/approverComponent';
import UserRegistration from "../containers/userRegistration";

const LayoutContainer = () => {
    return (
        <div>
            <HeaderComponent />

            <Routes>
                <Route path="/" element={<LoginComponent />} />
                <Route path="user" element={<UserComponent />} />
                <Route path="dashboard" element={<DashboardComponent />} />
                <Route path="users-update" element={<ApproverComponent />} />
                <Route path="users-registration" element={<UserRegistration />} />



            </Routes>

        </div>
    )
}

export default LayoutContainer;