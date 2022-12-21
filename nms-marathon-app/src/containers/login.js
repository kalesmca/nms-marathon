import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUserList, updateUser } from '../redux/actions/user';
import {adminList} from '../constants/config';

const LoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState("");
    const [pwd, setPwd] = useState("");
    const [admin, setAdmin] = useState(null)
    const [isPwdErr, setPwdErr] = useState(false);
    const [errMsg, setErrorMsg] = useState("")
    const applicationState = useSelector((state) => state);

    useEffect(() => {
        if (applicationState?.user?.userList?.length) {
            if(admin){
                navigate('dashboard')
            }else {
                const dbUser = applicationState.user.userList.find((item) => item.mobile == mobile)
                dbUser ? navigate('user') : navigate('users-registration')
            }
            
        }

    }, [applicationState])

    const loginUser = () => {

        if(!mobile || mobile.length !==10){
            setErrorMsg("Please enter valid mobile number")
        } else if(admin?.mobile  && !pwd){
            setPwdErr(true)
        } 
        else if(!admin || admin && !isPwdErr && pwd) {
            if(admin){
                dispatch(updateUser(admin)); 
                localStorage.setItem( 'adminRights' , "*****")
            } 
            localStorage.setItem( 'mobile' , mobile)
            dispatch(getUserList())
        }
        
    }
    

    const adminCheck = () =>{
        console.log(adminList)
        const adminUser = adminList.find((item)=> item.mobile == mobile)
        if(adminUser){
            setAdmin(adminUser)
        }
    }

    return (
        
        <div className="login-flex-container">
        <div className="login-container"> 
        <h2 className="header">Login / SignUp</h2>
        <div className="form-containter">
            
            <label >Mobile</label>
            <input type="number"  className="input-box" onBlur={()=>{adminCheck()}} placeholder="Your Mobile number 10 digit.."  value={mobile} onChange={(e) => { setMobile(e.target.value); setErrorMsg("") }}/>
            <span className="err-msg">{errMsg}</span>
            {
                admin && admin.mobile ? (<div><label >Password</label>
                <input  className="input-box" placeholder="Password" value={pwd} onChange={(e)=> {setPwd(e.target.value);setPwdErr(false)}} onBlur={()=> {admin.pwd != pwd ? setPwdErr(true): setPwdErr(false)}}   />
                {isPwdErr ? (<span className="err-msg">Invalid Password</span>):""}

                </div>) : ""
            }
            
            <input className="submit-btn" type="submit" value="Submit" onClick={() => loginUser()}/>
        </div>

        
    </div>
    </div>
    )
}

export default LoginComponent;