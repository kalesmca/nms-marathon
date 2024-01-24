import React, { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./login.scss";
import { AUTH_STATUS } from '../../config/constants';
import { getPlayerList } from '../../redux/actions/players';
import { useDispatch, useSelector } from 'react-redux';
import { PopupContext } from '../../config/context';
import Card from 'react-bootstrap/Card';
import { checkIsAdmin } from "../../config/utils";
import Alert from 'react-bootstrap/Alert';

const LoginComponent = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState({});
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.players)
  const { msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj } = useContext(PopupContext)
  useEffect(() => {
    console.log('state:', playerState)
  })

  const submit = () => {

    if (Object.keys(isAdmin).length) {
      if(isAdmin.auth === AUTH_STATUS.SUPER_ADMIN_ACCESS ? password === "volley.ball": password === "volleyball"){
      
        loginConfirmModal()
      } else {
        const obj = {
          title: "Error",
          content: "Admin Password Wrong",
          contentSpinner: true,
          btn1: "Reset"
        }
        setPopupObj(obj)
        setMsgPopupFlag(true);
        setPassword("")
        setMobile("")
        setIsAdmin({})
      }
    } else {
      loginConfirmModal()
    }



  }

  const loginConfirmModal = () => {
    const obj = {
      title: !mobile || mobile?.toString()?.length != 10 ? "Please Enter valid 10 digit Mobile Number" : "Please re-confirm your Mobile Number",
      content: !mobile || mobile?.toString()?.length != 10 ? "Invalid Mobile number" : mobile,
      contentSpinner: true,
      btn2: !mobile || mobile?.toString()?.length != 10 ? "" : "Confirm",
      btn1: "Reset"
    }
    setPopupObj(obj)
    const timer = setTimeout(() => {
      setMsgPopupFlag(true);
    }, 1000);
    return () => clearTimeout(timer);
  }
  const setLocal = (e) => {
    setIsAdmin(checkIsAdmin(mobile));
    if(mobile.length===10){
      dispatch(getPlayerList())
    }
    
    
    const obj = {
      mobile: mobile,
      access: AUTH_STATUS.PENDING
    }
    localStorage.setItem("auth", JSON.stringify(obj));
  }

  const mobileNumberChange = (e) =>{
    if(e.target.value.length<=10){
      setMobile(e.target.value)
    }
  }

  return (
    <div className="login-container">
      <Form >
        <Row className="mb-3">

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Card.Text>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Coach/Player Mobile Number</Form.Label>
                  <Form.Control type="number" placeholder="Mobile Number" value={mobile} 
                    onChange={(e) => { mobileNumberChange(e) }} onBlur={() => { setLocal() }}
                  />
                
                </Form.Group>
                {
                  Object.keys(isAdmin).length ? (<Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Admin Password" value={password} 
                      onChange={(e) => { setPassword(e.target.value) }} 
                    />

                  </Form.Group>) : ""
                }

              </Card.Text>
              <Card.Link >
                <Button variant="primary" onClick={() => { submit() }}>
                  Submit
                </Button>
              </Card.Link>

            </Card.Body>
          </Card>
        </Row>

      </Form>

     
      <Alert variant={"danger"}>

          <div> இனிமேல் பதிவு செய்யும் நபர்களுக்கு T.Shirt வழங்கப்படமாட்டாது.  </div>
          
    
   </Alert>
      

    </div>

  )
}

export default LoginComponent;

