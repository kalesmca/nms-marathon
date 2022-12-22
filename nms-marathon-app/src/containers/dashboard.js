import React,{useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../redux/API/apiService';
import {getUserByMobile} from '../redux/actions/user';
import {getUserListByFilter} from '../utills/util'
import {CONSTANTS} from '../constants/config'
const DashboardComponent = () => {
    const applicationState = useSelector((state)=> state);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([])
    const [category, setCategory] = useState("ALL")
    const [paymentType, setPaymentType] = useState('ALL')
    useEffect(()=>{
        console.log(applicationState)
        const filteredUsers = getUserListByFilter(applicationState.user.userList, category, paymentType)
        setUserList(filteredUsers)
    },[applicationState])

    const changePaymentType = (e) =>{
        setPaymentType(e.target.value);
        const filteredUsers = getUserListByFilter(applicationState.user.userList, category, e.target.value)
        setUserList(filteredUsers)
    }
    const changeCategory = (e) =>{
        setCategory(e.target.value);
        const filteredUsers = getUserListByFilter(applicationState.user.userList, e.target.value, paymentType)
        setUserList(filteredUsers)

    }


    const updatePaymentStatus = async(user) => {
        user.chestNumber = user.category+'-'+ getUserListByFilter(applicationState.user.userList, user.category, 'PAID').length+1
        await updateUser(user);
        dispatch(getUserByMobile(localStorage.getItem('mobile')))
    }
    return(
        <div className="reg-flex-container dashboard-flex ">
            <div className="reg-container dashboard-cont">
                <div className="header">

                </div>
                <div className="form-containter">
                    <span className="list-container">
                        <label ><b>Category</b></label>
                        <select className="input-box filter-box" id="gender" value={category} onChange={(e)=> {changeCategory(e)}}>
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
                        <select className="input-box filter-box" id="gender" value={paymentType} onChange={(e)=>{changePaymentType(e)}}>
                        {
                                CONSTANTS.typeOfList.map((payType, payIndex) =>{
                                    return(
                                        <option key={payIndex} value={payType}>{payType}</option>
                                    )
                                })
                            }
                                
                        </select>
                    </span>
                    
                </div>

                

            </div>
            <div className="user-container">
                    TOTAL COUNT = {userList.length}
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
                        userList?.length ? userList.map((user, userIndex) =>{
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
                        <tr><td colSpan={7}> <center>No data found</center></td></tr>
                    }
                   
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default DashboardComponent;