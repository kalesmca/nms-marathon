import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";

const UserComponent = () => {
    const applicationState = useSelector((state) => state);
    useEffect(()=>{
        console.log(applicationState)
    })
    return(
        <div> UserComponent</div>
    )
}

export default UserComponent;