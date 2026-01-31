import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './bulkReg.scss';
import {
  U_10_TIME,
  U_14_TIME,
  U_19_TIME,
  initPlayerData,
  EVENTS,
  initError,
  AUTH_STATUS,
  tShirtSizeList,
} from '../../config/constants';
import { formatAppDate } from '../../config/utils';
import Alert from 'react-bootstrap/Alert';
import { addPlayer, getPlayerList } from '../../redux/actions/players';
import { useDispatch, useSelector } from 'react-redux';
import { PopupContext } from '../../config/context';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import qrImage from '../../assets/paraman.jpeg';
// import qrImage from '../../assets/paraman_unAmount.jpeg';


import GooglePayButton from '@google-pay/button-react';

function BulkPlayerRegistration() {
  const playerState = useSelector((state) => state.players);
  const [playerObj, setPlayerObj] = useState(initPlayerData);
  const [errObj, setErrObj] = useState(initError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [playerObjList, setPlayerList] = useState([initPlayerData]);
    const chestNumber = playerState.playerList[(playerState.playerList.length ? playerState.playerList.length-1:0)]?.chestNumber+1;
    console.log("last player =", chestNumber)
  const { setMsgPopupFlag, setNavigationPath, popupObj, setPopupObj } = useContext(PopupContext);
  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem('auth'));
    if (!localAuth || !localAuth.mobile) {
      navigate('');
    }
    console.log("playerState",playerState);
    let chestNumber = playerState.playerList[(playerState.playerList.length ? playerState.playerList.length-1:0)]?.chestNumber+1;
    console.log("last player =", chestNumber)
    setPlayerObj({
      ...playerObj,
      registerMobile: localAuth?.mobile,
      createdBy: localAuth?.mobile,
      createdOn: formatAppDate(new Date()),
      chestNumber:chestNumber
    });
  }, []);

  const dateChage = (dateValue, genderValue, index, field) => {
    if (!dateValue) {
      const obj = {
        title: 'Warning',
        content: 'Please Select your Date of Birth First',
        btn1: 'Reset',
      };
      setPopupObj(obj);
      setMsgPopupFlag(true);
    }
    var d1 = new Date(dateValue);
    const time = d1.getTime();
    let playerCategory;
    if (time > U_10_TIME) {
      playerCategory = genderValue === 'MALE' ? 'U_10_B' : 'U_10_G';
    
    } else if (time > U_14_TIME && time < U_10_TIME) {
      playerCategory = genderValue === 'MALE' ? 'U_14_B' : 'U_14_G';
      
    } else if (time > U_19_TIME && time < U_14_TIME) {
      playerCategory = genderValue === 'MALE' ? 'U_19_B' : 'OPEN_G';
      
    } else if (time < U_19_TIME) {
      playerCategory = genderValue === 'MALE' ? 'OPEN_B' : 'OPEN_G';
     
    }
    handleChange(index, field, genderValue)
    handleChange(index, 'playerCategory', playerCategory)

  };

  const eventDefauleSelection = (category) => {
    EVENTS[category].map((tempEvent) => {
      tempEvent.selection = false;
      tempEvent.disable = false;
    });
    return EVENTS[category];
  };

  const submit = () => {
   
    console.log('playerObj list', playerObjList);
      setTimeout(()=>{
        playerObjList.map((player, index) =>{
            player.chestNumber = chestNumber + index +1;
            dispatch(addPlayer(player));
        })
      },100)

      setTimeout(()=>{
      const path =
        playerState.authStatus === AUTH_STATUS.ADMIN_ACCESS ||
        playerState.authStatus === AUTH_STATUS.SUPER_ADMIN_ACCESS
          ? '/authed/player-list'
          : '/authed/dashboard';
      setNavigationPath(path);
      setPopupObj({
        title: 'SUCCESS',
        content: 'Player added successfully. Payment Status will update with in 2-3 Days',
      });
      setMsgPopupFlag(true);
      dispatch(getPlayerList());

      },1000)
      
    }
   
  // this is for Atheletics
  const eventChange = (e, eIndex, event) => {
    let tempObj = playerObj;
    if (!e.target.checked) {
      tempObj.events[eIndex].selection = e.target.checked;
      const index = tempObj.selectedEvents.findIndex((exEvent) => event.id === exEvent.id);
      tempObj.selectedEvents.splice(index, 1);
      tempObj.events.map((eve) => {
        eve.disable = false;
      });
    } else {
      if (playerObj.selectedEvents.length < 2) {
        tempObj.selectedEvents.push(event);
        tempObj.events[eIndex].selection = e.target.checked;
        if (tempObj.selectedEvents.length >= 2) {
          tempObj.events.map((eve) => {
            if (!eve.selection) {
              eve.disable = true;
            }
          });
        }
      }
    }
    setPlayerObj({ ...playerObj, ...tempObj });
  };

 
  useEffect(() => {
    console.log(playerObj);
  });
 
  const handleChange = (index, field, value) => {
  const updatedPlayers = [...playerObjList];
  updatedPlayers[index] = {
    ...updatedPlayers[index],
    [field]: value
  };
  setPlayerList(updatedPlayers);
};

console.log("length = ", playerObjList.length)
const addNewForm = () =>{
    setPlayerList([...playerObjList, [initPlayerData]]);
}
const removeLastForm = () =>{

    setPlayerList(prev => prev.slice(0, -1));

}
  return (
    <div className="bulk-reg-form">
      <Form>
        {playerObjList.map((player, index) => {
          return (<Alert variant={'secondary'}>
            <Row>
              <Col>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Player Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter palyer Name"
                    value={player.name}
                    onChange={(e) => {
                      handleChange(index, "name", e.target.value);
                    }}
                   
                  />
                  
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="DOB as per Aadhar card"
                    value={player.dob}
                    
                    onChange={(e) => {
                      handleChange(index, "dob", e.target.value);
                    }}
                  />
                  
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} controlId={"gender"+index}>
                  <Form.Label>Gender : </Form.Label>
                  <Form.Check
                    inline
                    label="MALE"
                    name={"group1"+index}
                    type={'radio'}
                    id={`inline-${'Male'}-2-${index}`}
                    checked={player.gender === 'MALE' ? true : false}
                    onClick={() => {
                      dateChage(player.dob, 'MALE', index, "gender");
                    }}
                  />
                  <Form.Check
                    inline
                    label="FEMALE"
                    name={"group1"+index}
                    type={'radio'}
                    checked={player.gender === 'FEMALE' ? true : false}
                    onClick={() => {
                      dateChage(player.dob, 'FEMALE', index, "gender");
                    }}
                    id={`inline-${'FeMale'}-2-${index}`}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div>
              Player Category :{' '}
              {player.playerCategory ? player.playerCategory : 'Select your Date of Birth'}
            </div>
          </Alert>)
        })}

        <div className="add-alert">
          <Button variant="primary" onClick={()=>{addNewForm()}}> + </Button>
          {
            playerObjList.length>1 && (<Button variant="primary" onClick={()=>{removeLastForm()}}> - </Button>)
          }
          
        </div>

        <Button
          variant="primary"
          onClick={() => {
            submit();
          }}
        >
          Submit
        </Button>
      </Form>
      <div></div>
    </div>
  );
}

export default BulkPlayerRegistration;
