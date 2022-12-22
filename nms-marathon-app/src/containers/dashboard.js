import React,{useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../redux/API/apiService';
import {getUserByMobile} from '../redux/actions/user';
const DashboardComponent = () => {
    const applicationState = useSelector((state)=> state);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(applicationState)
    })

    const updatePaymentStatus = async(user) => {
        user.chestNumber = user.category+'0001'
        await updateUser(user);
        dispatch(getUserByMobile(localStorage.getItem('mobile')))
    }
    return(
        <div className="reg-flex-container">
            <div className="reg-container dashboard-cont">
                <div className="header">

                </div>
                <div className="form-containter">
                    <select className="input-box" id="gender" >
                       <option value={"item"}>item</option>
                            
                    </select>
                </div>

                <div className="user-container">
            <table id="user-table">
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Chest number</th>
                        <th>Category</th>
                        <th>T-shirt Size</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicationState?.user?.userList ? applicationState?.user?.userList.map((user, userIndex) =>{
                            return(
                                <tr key={userIndex}>
                                    <td>{userIndex+1}</td>
                                    <td>{user?.name}</td>
                                    <td>{user?.mobile}</td>
                                    <td>{user?.chestNumber}</td>
                                    <td>{user?.category}</td>
                                    <td>{user?.tShirtSize}</td>
                                    <td><button onClick={()=> updatePaymentStatus(user)}>Paid</button></td>
    
                                </tr>
                            )
                        }):
                        <tr><td colSpan={5}> <center>No data found</center></td></tr>
                    }
                   
                </tbody>
            </table>
        </div>

            </div>
        </div>
    )
}

export default DashboardComponent;