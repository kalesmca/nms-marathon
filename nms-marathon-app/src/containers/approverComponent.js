import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";

const ApproverComponent = () => {
    const applicationState = useSelector((state) => state);
    useEffect(()=>{
        console.log(applicationState)
    })
    return(
        <div> ApproverComponent</div>
    )
}

export default ApproverComponent;