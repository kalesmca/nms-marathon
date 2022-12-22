import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserByMobile } from '../redux/actions/user';
import {getTShirtSummary} from '../utills/util';

const TShirtComponent = () => {
    const applicationState = useSelector((state) => state);
    const [tShirtList, setTShirtLit] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        if(applicationState?.user?.userList?.length){
            setTShirtLit(getTShirtSummary(applicationState.user.userList))
        }
        
        
    }, [applicationState])
    return (
        <div className="user-container">
            <table id="user-table">
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>Category</th>
                        <th>Small</th>
                        <th>Medium</th>
                        <th>Large</th>
                        <th>XL</th>
                        <th>XXL</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        tShirtList?.length ? tShirtList.map((tShirt, index)=>{
                            return (

                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{tShirt.category}</td>
                                    <td>{tShirt.SMALL}</td>
                                    <td>{tShirt.MEDIUM}</td>
                                    <td>{tShirt.LARGE}</td>
                                    <td>{tShirt.XL}</td>
                                    <td>{tShirt.XXL}</td>
                                    
    
                                </tr>
                            )
                        }) :
                        <tr><td colSpan={5}> <center>No data found</center></td></tr>
                    }
                   
                </tbody>
            </table>
        </div>
    )
}

export default TShirtComponent;