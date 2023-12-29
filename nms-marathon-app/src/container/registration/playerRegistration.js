import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./registration.scss";
import { U_6_TIME,U_8_TIME,U_10_TIME,U_12_TIME, U_14_TIME, U_17_TIME,initPlayerData, EVENTS, initError, AUTH_STATUS } from '../../config/constants';
import { formatAppDate } from '../../config/utils';
import Alert from 'react-bootstrap/Alert';
import {addPlayer, getPlayerList} from '../../redux/actions/players';
import { useDispatch, useSelector } from 'react-redux';
import {PopupContext } from '../../config/context';
import { useNavigate } from 'react-router-dom' ;
import Image from 'react-bootstrap/Image';
import qrImage from '../../assets/200_qr_kalimuthu.jpeg'
import GooglePayButton from '@google-pay/button-react';

function PlayerRegistration() {
  const playerState = useSelector((state)=>state.players)
  const [playerObj, setPlayerObj] = useState(initPlayerData);
  const [errObj, setErrObj] = useState(initError)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {setMsgPopupFlag, setNavigationPath,popupObj, setPopupObj} = useContext(PopupContext);
  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem("auth"))
    if(!localAuth || !localAuth.mobile){
      navigate("")
    } 
    setPlayerObj({...playerObj, registerMobile:localAuth?.mobile, createdBy: localAuth?.mobile, createdOn: formatAppDate(new Date())})
  },[])

  const dateChage = (dateValue, genderValue) => {
    var d1 = new Date(dateValue);
    const time = d1.getTime();
   
    if (time > U_6_TIME) {
        
      const playerCategory = genderValue === "MALE" ? "U_6_B" : "U_6_G"
      const defaultEvents = eventDefauleSelection(playerCategory)
      setPlayerObj({ ...playerObj, dob: dateValue, 
                    playerCategory: playerCategory, events: defaultEvents, selectedEvents:[],gender:genderValue  });
    
    }else if (time > U_8_TIME && time < U_6_TIME) {
        
      const playerCategory = genderValue === "MALE" ? "U_8_B" : "U_8_G"
      const defaultEvents = eventDefauleSelection(playerCategory)
      setPlayerObj({ ...playerObj, dob: dateValue, 
                    playerCategory: playerCategory, events: defaultEvents, selectedEvents:[],gender:genderValue  });
    
    }else if (time > U_10_TIME && time < U_8_TIME) {
        
      const playerCategory = genderValue === "MALE" ? "U_10_B" : "U_10_G"
      const defaultEvents = eventDefauleSelection(playerCategory)
      setPlayerObj({ ...playerObj, dob: dateValue, 
                    playerCategory: playerCategory, events: defaultEvents, selectedEvents:[],gender:genderValue  });
    
    }else if (time > U_12_TIME && time < U_10_TIME) {

        const playerCategory = genderValue === "MALE" ? "U_12_B" : "U_12_G"
        const defaultEvents = eventDefauleSelection(playerCategory)
        setPlayerObj({ ...playerObj, dob: dateValue, 
                      playerCategory: playerCategory, events: defaultEvents, selectedEvents:[],gender:genderValue  });
      
      }else if (time > U_14_TIME && time < U_12_TIME) {
        const playerCategory = genderValue === "MALE" ? "U_14_B" : "U_14_G"
        const defaultEvents = eventDefauleSelection(playerCategory)
        setPlayerObj({ ...playerObj, dob: dateValue, 
                      playerCategory: playerCategory, events: defaultEvents, selectedEvents:[],gender:genderValue  });
      }else if (time > U_17_TIME && time < U_14_TIME) {
        const playerCategory = genderValue === "MALE" ? "U_17_B" : "U_17_G"
        const defaultEvents = eventDefauleSelection(playerCategory)
        setPlayerObj({ ...playerObj, dob: dateValue, 
                      playerCategory: playerCategory, events: defaultEvents, selectedEvents:[], gender:genderValue });
      } else if(time< U_17_TIME) {
        const obj = {
          title : "Age Restriction",
          content: "U-17 '01/01/2007' after born players only allowed please change date. ",
          btn1:"Reset"
      }
      setPopupObj(obj);
      setMsgPopupFlag(true);
        
      }
   
   
  }

  const eventDefauleSelection = (category) =>{
    EVENTS[category].map((tempEvent) => {
      tempEvent.selection = false;
      tempEvent.disable = false;
    })
    return EVENTS[category]
  }
  
  const submit = () => {
    let invalidForm = false 
    let tempErrObj = errObj;
    console.log('playerObj', playerObj)
    Object.keys(tempErrObj).map((key) =>{
      if((tempErrObj[key].touched && tempErrObj[key].err) || !tempErrObj[key].touched ){
        invalidForm = true
      }
      if(!tempErrObj[key].touched) { 
        tempErrObj[key].err = true;
        tempErrObj[key].touched = true;
      }
    })
    if(invalidForm) { 
      setErrObj({...errObj, ...tempErrObj})
    } else { 
      console.log(playerObj)   
       
      dispatch(addPlayer(playerObj));
      // dispatch(getPlayerList());
      const path = (playerState.authStatus === AUTH_STATUS.ADMIN_ACCESS || playerState.authStatus === AUTH_STATUS.SUPER_ADMIN_ACCESS) ? "/authed/player-list" : "/authed/dashboard" 
      setNavigationPath(path);
      setPopupObj({title:"SUCCESS", content: "Player added successfully. Payment Status will update with in 2-3 Days"})
      setMsgPopupFlag(true)
    }
    console.log('invalidForm :', invalidForm)
  }
  const eventChange = (e, eIndex, event) =>{
    let tempObj = playerObj;
    if(!e.target.checked){
      tempObj.events[eIndex].selection = e.target.checked;
      const index = tempObj.selectedEvents.findIndex((exEvent)=> event.id === exEvent.id)
      tempObj.selectedEvents.splice(index,1);
      tempObj.events.map((eve)=>{
        eve.disable = false
      })

    } else {
      if(playerObj.selectedEvents.length < 2){
        tempObj.selectedEvents.push(event);
        tempObj.events[eIndex].selection = e.target.checked;
          if(tempObj.selectedEvents.length >= 2){
            tempObj.events.map((eve)=>{
              if(!eve.selection){
                eve.disable = true;
              }
              
            })
          }

      }

    }    
    setPlayerObj({...playerObj, ...tempObj})
  }

  const getValidation = (key) =>{
    let tempErrObj = errObj;
    tempErrObj[key].touched = true;
    if(key==='mobile' || key==='upi' ){
      tempErrObj[key].err = !playerObj[key] || playerObj[key]?.toString().length !=10 ? true : false
    } else if(key === "adharNumber") {
      tempErrObj[key].err = !playerObj[key] || playerObj[key]?.toString().length !=12 ? true : false
    } else {
      tempErrObj[key].err = !playerObj[key] ? true : false
    }
    setErrObj({...errObj, ...tempErrObj})
    
  }

  return (
    <div className='reg-form'>
      <Form >
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Player Name</Form.Label>
          <Form.Control type="text" placeholder="Enter palyer Name" value={playerObj.name}
             onChange={(e) => { setPlayerObj({ ...playerObj, name: e.target.value }) }} onBlur={(e)=> {getValidation("name")}}
          />
          {
            errObj.name.err && errObj.name.touched && <div className='err'> Valid Player Name</div>
          }
          
        </Form.Group>

        {/* <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Aadhar Number</Form.Label>
          <Form.Control type="number" placeholder="Player Aadhar Number" value={playerObj.adharNumber} 
            onChange={(e) => { setPlayerObj({ ...playerObj, adharNumber: e.target.value }) }} onBlur={(e)=> {getValidation("adharNumber")}}
          />
          {
            errObj.adharNumber.err && errObj.adharNumber.touched && <div className='err'> 12 Digit AdharNumber</div>
          }
        </Form.Group> */}
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Club/School Name</Form.Label>
          <Form.Control type="text" placeholder="Optional" value={playerObj.clubName}
            onChange={(e) => { setPlayerObj({ ...playerObj, clubName: e.target.value }) }} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="DOB as per Aadhar card" value={playerObj.dob} onBlur={(e)=> {getValidation("dob")}}
            onChange={(e) => { dateChage(e.target.value, playerObj.gender) }}
            
          />
          {
            errObj.dob.touched && errObj.dob.err && <div className='err'> Please select Date of Birth</div>
          }
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="gender">
          <Form.Label>Gender : </Form.Label>
          <Form.Check
            inline
            label="MALE"
            name="group1"
            type={"radio"}
            id={`inline-${"Male"}-2`}
            checked={playerObj.gender === "MALE" ? true : false}
            onClick={() => {dateChage(playerObj.dob, "MALE") }}
          />
          <Form.Check
            inline
            label="FEMALE"
            name="group1"
            type={"radio"}
            checked={playerObj.gender === "FEMALE" ? true : false}
            onClick={() => {dateChage(playerObj.dob, "FEMALE") }}
            id={`inline-${'FeMale'}-2`}
          />
        </Form.Group>

      </Row>

      <Alert variant={"primary"}>
     
          <div>01/01/2018 After Born U_6</div>
          <div>01/01/2016 After Born U_8</div>
          <div>01/01/2014 After Born U_10</div>

          <div>01/01/2012 After Born U_12</div>
          <div>01/01/2010 After Born U_14</div>
          <div>01/01/2007 After Born U_17</div>
        </Alert>


      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label className='player-category'> Player Category:: </Form.Label>
        <Form.Label className='player-category-selection'> {playerObj.playerCategory ? playerObj.playerCategory : "Select your Date of Birth"} </Form.Label>
      </Form.Group>

      {/* <Row className="mb-3">
        <Col sm={{ span: 10, offset: 1 }}>
          {
            playerObj.events.map((event, eIndex) => {
              return (
                <Form.Check index={eIndex} label={event.eventName} checked={event.selection}
                  disabled={event.disable} type="checkbox" onChange={(e) => { eventChange(e, eIndex, event) }} />
              )
            })
          }
        </Col>
      </Row> */}
      <Alert variant={"warning"}>
     
          <div>Entrance fee RS-200/player</div>
          {/* <div>GPay : 9944419808 (NMS Sports club)</div> */}
          <div>
            <img src={qrImage} style={{width:"150px"}} alt="Pay 200 for Each player" href="upi://pay?pa=nirushnigi-1@okicici&pn=N M S Sports club&aid=uGICAgIC1_uz4Fg" ></img>
            {/* <Image src="../../assets/kalimuthu_qr_code.jpeg" thumbnail /> */}

          </div>
         
        </Alert>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>UPI Mobile Number</Form.Label>
          <Form.Control type="number" placeholder="Google-Pay Number" value={playerObj.upi} onBlur={(e)=> {getValidation("upi")}}
            onChange={(e) => { setPlayerObj({ ...playerObj, upi: e.target.value }) }}
          />
          {
            errObj.upi.touched && errObj.upi.err && <div className='err'> Valid GPay Number</div>
          }
        </Form.Group>

        {/* <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contact Mobile</Form.Label>
          <Form.Control type="number" placeholder="Mobile Number" value={playerObj.mobile}
            onChange={(e) => { setPlayerObj({ ...playerObj, mobile: e.target.value }) }} onBlur={(e)=> {getValidation("mobile")}}
          />
          {
            errObj.mobile.touched && errObj.mobile.err && <div className='err'> Valid mobile Number</div>
          }
        </Form.Group> */}

        
      </Row>


      <Button variant="primary" onClick={() => { submit() }}>
        Submit
      </Button>
      {/* <GooglePayButton>

      </GooglePayButton> */}
    </Form>
    </div>
    
    
  );
}

export default PlayerRegistration;