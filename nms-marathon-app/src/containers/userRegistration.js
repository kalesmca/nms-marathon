import React,{useState} from "react";

const initObj = {
    name:"",
    mobile:"",
    category:"",
    isPaid:false,
    isAdmin:false,
    city:"",
    tShirtSize:""

}
const UserRegistration = () => {
    const [obj, setObj] = useState()
    return(
        <div className="reg-container"> 
            <h2 className="header">Registration</h2>
            <div className="form-containter">
                <label for="fname">Name</label>
                <input  className="input-box" placeholder="Your name.." />
                <label for="fname">Mobile</label>
                <input  className="input-box" placeholder="Your Mobile number 10 digit.." />
                <label for="fname">City</label>
                <input  className="input-box" placeholder="Your City.." />
                <label for="fname">T-shirt Size</label>
                <select className="input-box" id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                    </select>

                <input className="submit-btn" type="submit" value="Submit" />

                

            </div>

            
        </div>
    )
}

export default UserRegistration;