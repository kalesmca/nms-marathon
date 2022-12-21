import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserByMobile } from '../redux/actions/user';

const UserComponent = () => {
    const applicationState = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        if(localStorage.getItem('mobile')){
            dispatch(getUserByMobile(localStorage.getItem('mobile')))
        }
        
    }, [])
    return (
        <div className="user-container">
            <table id="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Chest number</th>
                        <th>Category</th>
                        <th>T-shirt Size</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicationState?.user?.mobile ? (
                            <tr>
                                <td>{applicationState?.user?.name}</td>
                                <td>{applicationState?.user?.mobile}</td>
                                <td>{applicationState?.user?.chestNumber}</td>
                                <td>{applicationState?.user?.category}</td>
                                <td>{applicationState?.user?.tShirtSize}</td>

                            </tr>
                        ):
                        <tr><td colSpan={5}> <center>No data found</center></td></tr>
                    }
                   
                </tbody>
            </table>
        </div>
    )
}

export default UserComponent;