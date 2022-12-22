import React, { useState, useEffect } from "react";
import {feMaleCategory, maleCategory, gender, tShirtSizes, CONSTANTS} from '../constants/config'
import {addUser} from '../redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initObj = {
    name: "",
    mobile: "",
    category: "M-U14",
    isPaid: false,
    city: "",
    tShirtSize: "SMALL",
    chestNumber: CONSTANTS.paymentPending,
    gender:"MALE"

}

const errMsgs = {
    name: "",
    mobile:""
}

const UserRegistration = () => {
    const [obj, setObj] = useState(initObj);
    const [errMsg, setErrorMsg] = useState(errMsgs);
    const applicationState = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
       console.log(localStorage.getItem('mobile'), applicationState) 
       setObj({...obj, ...{mobile:localStorage.getItem('mobile')}})

    },[])

    const mobileNumberValidation = () => {
        if(!obj.mobile || obj.mobile.length !==10 ){
            setErrorMsg( {...errMsg, mobile:'Please enter valid mobile number.'})
        } else{
            applicationState?.user?.userList?.map((user)=>{
                if(user.mobile == obj.mobile){
                    setErrorMsg( {...errMsg, mobile:'Mobile number exist.'})

                }
            })
        }
    }

    const saveUser = () => {
        if(!obj.mobile){
            setErrorMsg( {...errMsg, mobile:'Please enter valid mobile number.'})
        } else if(!obj.name){
            setErrorMsg( {...errMsg, mobile:'Please enter your name'})
        }
        if(!errMsg.name && !errMsg.mobile){
            localStorage.setItem('mobile', obj.mobile)
            dispatch(addUser(obj));
            navigate('/user')
        }

    }
    return (
        <div className="reg-flex-container">
            <div className="reg-container">
                <h3 className="header">Registration</h3>
                <div className="form-containter">
                    <label ><b>Name</b></label>
                    <input className="input-box" onBlur={()=> {!obj.name ? setErrorMsg({...errMsg, name:'Please enter you Name'}) : setErrorMsg({...errMsg, name:''})}}
                     placeholder="Your name.." value={obj.name} onChange={(e) => { setObj({...obj, name: e.target.value});setErrorMsg({...errMsg, name:''}) } } />
                     {errMsg.name ? (<div className="err-msg">{errMsg.name}</div>) : ""}
                    <label ><b>Mobile</b></label>
                    <input className="input-box" autoFocus type="number" onBlur={()=> mobileNumberValidation()} placeholder="Your Mobile number 10 digit.." value={obj.mobile} onChange={(e) => {setObj({...obj, mobile: e.target.value}); setErrorMsg({...errMsg, mobile:''})}}  />
                    {errMsg.mobile ? (<div className="err-msg">{errMsg.mobile}</div>) : ""}
                    
                    <label ><b>City</b></label>
                    <input className="input-box" placeholder="Your City.." value={obj.city} onChange={(e) => setObj({...obj, city: e.target.value})} />
                    <label ><b>Gender</b></label>
                    <select className="input-box" id="gender" value={obj.gender} name="gender"  onChange={(e)=> {setObj({...obj, gender:e.target.value, category: e.target.value === 'MALE'? 'M-U14': "F-U14" }) } }>
                        {
                            gender.map((item, genderIndex) =>{
                                return(<option key={genderIndex} value={item}>{item}</option>)
                            })
                        }
                    </select>
                    <label ><b>Category</b></label>
                    <select className="input-box"  value={obj.category} onChange={(e)=> setObj({...obj, category:e.target.value}) }>
                        {
                            obj.gender === 'MALE' ? 
                            maleCategory.map((item, categoryIndex) =>{
                                return(<option key={categoryIndex} value={item}>{item}</option>)
                            }) :
                            feMaleCategory.map((item, categoryIndex) =>{
                                return(<option key={categoryIndex} value={item}>{item}</option>)
                            }) 
                        }
                    </select>
                
                    <label ><b>T-shirt Size</b> </label>
                    <select className="input-box" id="gender" value={obj.tShirtSize} name="gender"  onChange={(e)=> setObj({...obj, tShirtSize:e.target.value}) }>
                        {
                            tShirtSizes.map((item, tIndex) =>{
                                return(<option key={tIndex} value={item}>{item}</option>)
                            })
                        }
                    </select>

                    <input className="submit-btn" type="submit" value="Submit" onClick={()=> saveUser()}/>



                </div>


            </div>
        </div>

    )
}

export default UserRegistration;