import React,{useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../redux/API/apiService';
import {getUserByMobile} from '../redux/actions/user';
import {getPaidListByCategory} from '../utills/util'
import {CONSTANTS} from '../constants/config'
const DashboardComponent = () => {
    const applicationState = useSelector((state)=> state);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(applicationState)
    })

    const updatePaymentStatus = async(user) => {
        user.chestNumber = user.category+'-'+ getPaidListByCategory(applicationState.user.userList, user.category).length+1
        await updateUser(user);
        dispatch(getUserByMobile(localStorage.getItem('mobile')))
    }
    return(
        <div className="reg-flex-container">
            <div className="reg-container dashboard-cont">
                <div className="header">

                </div>
                <div className="form-containter">
                    <span className="list-container">
                        <label ><b>Category</b></label>
                        <select className="input-box filter-box" id="gender" >
                            {
                                CONSTANTS.allCategory.map((category, catIndex) =>{
                                    return(
                                        <option key={catIndex} value={category}>{category}</option>
                                    )
                                })
                            }
                        
                                
                        </select>
                    </span>
                    <span className="list-container">
                        <label ><b>Payment Type</b></label>
                        <select className="input-box filter-box" id="gender" >
                        {
                                CONSTANTS.typeOfList.map((payType, payIndex) =>{
                                    return(
                                        <option key={payIndex} value={payType}>{payType}</option>
                                    )
                                })
                            }
                                
                        </select>
                    </span>
                    <span className="list-container">
                        <label ><b>Category</b></label>
                        <select className="input-box filter-box" id="gender" >
                        <option value={"item"}>item</option>
                                
                        </select>
                    </span>
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
                                    <td>{
                                        user.chestNumber === CONSTANTS.paymentPending ? (<button onClick={()=> updatePaymentStatus(user)}>Paid</button>) :""
                                        }
                                        
                                    </td>
    
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