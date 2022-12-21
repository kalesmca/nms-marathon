import React,{useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
const DashboardComponent = () => {
    const appState = useSelector((state)=> state);
    useEffect(()=>{
        console.log(appState)
    })
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

            </div>
        </div>
    )
}

export default DashboardComponent;