import React, { useState } from "react";
import {feMaleCategory, maleCategory, gender, tShirtSizes} from '../constants/config'

const initObj = {
    name: "",
    mobile: "",
    category: "",
    isPaid: false,
    city: "",
    tShirtSize: "",
    chestNumber:"",
    gender:"FEMALE"

}

const UserRegistration = () => {
    console.log('gneee:', gender)
    const [obj, setObj] = useState(initObj);
    const [errMsg, setErrorMsg] = useState("")

    return (
        <div className="reg-flex-container">
            <div className="reg-container">
                <h3 className="header">Registration</h3>
                <div className="form-containter">
                    <label ><b>Name</b></label>
                    <input className="input-box" placeholder="Your name.." />
                    <label ><b>Mobile</b></label>
                    <input className="input-box" placeholder="Your Mobile number 10 digit.." />
                    {errMsg ? (<span className="err-msg">{errMsg}</span>) : ""}
                    
                    <label ><b>City</b></label>
                    <input className="input-box" placeholder="Your City.." />
                    <label ><b>Gender</b></label>
                    <select className="input-box" id="gender" value={obj.gender} name="gender"  onChange={(e)=> setObj({...obj, gender:e.target.value}) }>
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

                    <input className="submit-btn" type="submit" value="Submit" />



                </div>


            </div>
        </div>

    )
}

export default UserRegistration;