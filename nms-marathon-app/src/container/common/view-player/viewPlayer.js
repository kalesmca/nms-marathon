import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { PAYMENT_STATUS } from '../../../config/constants';
import { updateUser } from '../../../redux/API/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerList } from '../../../redux/actions/players';
import { formatAppDate } from '../../../config/utils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {AUTH_STATUS, T_SHIRT_STATUS} from '../../../config/constants';
import Form from 'react-bootstrap/Form';

const ViewPlayerComponent = (props) => {
  const localAuth = JSON.parse(localStorage.getItem('auth'));
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const playersState = useSelector((state) => state.players);
  const [currentPlayer, setCurrentPlayer] = useState(JSON.parse(JSON.stringify(props.player)))
  const [tShirtFlag, setTShirtFlag] = useState(false);
  const updatePlayer = (status) => {
    let player = JSON.parse(JSON.stringify(props.player));
    player.paymentStatus = status;
    let updateInfoObj = {
      updatedBy: localAuth?.mobile,
      upatedOn: formatAppDate(new Date()),
    };
    if (player.updatedByList) {
      player.updatedByList.push(updateInfoObj);
    } else {
      player.updatedByList = [{ updateInfoObj }];
    }
    updateUser(player);
    const timer = setTimeout(() => {
      dispatch(getPlayerList());
    }, 500);
    return () => clearTimeout(timer);
  };
  const updateEntry = (status) => {
    
    let updateInfoObj = {
      updatedBy: localAuth?.mobile,
      upatedOn: formatAppDate(new Date()),
    };
    if (currentPlayer.updatedByList) {
      currentPlayer.updatedByList.push(updateInfoObj);
    } else {
      currentPlayer.updatedByList = [{ updateInfoObj }];
    }
    updateUser(currentPlayer);
    const timer = setTimeout(() => {
      dispatch(getPlayerList());
    }, 500);
    return () => clearTimeout(timer);
  };
  // console.log(props, playersState);

  const updateTShirtStatus =() =>{
    setTShirtFlag(true)
    let player = JSON.parse(JSON.stringify(props.player));
    player.tShirt = {
      status : T_SHIRT_STATUS[1],
      providedBy: JSON.parse(localStorage.getItem("auth")),
      providedOn: new Date().toString()
    }
    player.tShirtStatus = T_SHIRT_STATUS[0];
    updateUser(player);
    const timer = setTimeout(() => {
      dispatch(getPlayerList());
    }, 200);
    return () => clearTimeout(timer);
    
  }

  const revertTshirtUpdate =() =>{
    setTShirtFlag(true)
    let player = JSON.parse(JSON.stringify(props.player));
    player.tShirt = {
      
    }
    player.tShirtStatus = T_SHIRT_STATUS[1];
    updateUser(player);
    const timer = setTimeout(() => {
      dispatch(getPlayerList());
    }, 200);
    return () => clearTimeout(timer);
    
  }


  
  // const providedBy = props.player?.tShirt?.providedBy

  return (
    <div>
      <Alert variant={'info'}>
        <Container>
          <Row>
            <Col>Name</Col>
            <Col>{props?.player?.name}</Col>
          </Row>
          <Row>
            <Col>Category</Col>
            <Col>{props?.player?.playerCategory}</Col>
          </Row>
          <Row>
            <Col>Club/School</Col>
            <Col>{props?.player?.clubName}</Col>
          </Row>
          <Row>
            <Col>Date of Birth</Col>
            <Col>{props?.player?.dob}</Col>
          </Row>

          <Row>
            <Col>Payment</Col>
            <Col>{props?.player?.paymentStatus}</Col>
          </Row>
          <Row>
            <Col>UPI </Col>
            <Col>{props?.player?.upi}</Col>
          </Row>

          <Row>
            <Col>Created BY</Col>
            <Col>{props?.player?.registerMobile}</Col>
          </Row>
          {/* {localAuth?.access === 'ADMIN_ACCESS' ||
          localAuth?.access === 'SUPER_ADMIN_ACCESS' ? (
            // true ? (

            <Row>
              <Col>
                {props.player.paymentStatus !== 'PAYMENT_VERIFIED' ? (
                  <Button
                    variant="primary"
                    disabled={flag}
                    onClick={() => {
                      setFlag(true);
                      updatePlayer(PAYMENT_STATUS[0]);
                    }}
                  >
                    {' '}
                    PAID{' '}
                  </Button>
                ) : (
                  ''
                )}
              </Col>
              <Col>
                <Button
                  variant="primary"
                  disabled={flag}
                  onClick={() => {
                    setFlag(true);
                    updatePlayer(PAYMENT_STATUS[3]);
                  }}
                >
                  {' '}
                  NMS{' '}
                </Button>
              </Col>
              <Col>
                {' '}
                <Button
                  variant="primary"
                  disabled={flag}
                  onClick={() => {
                    setFlag(true);
                    updatePlayer(PAYMENT_STATUS[2]);
                  }}
                >
                  {' '}
                  UN_PAID{' '}
                </Button>
              </Col>
            </Row>
          ) : (
            ''
          )} */}
          {(localAuth?.access === 'SUPER_ADMIN_ACCESS' || localAuth?.access === 'ADMIN_ACCESS') && props.player.paymentStatus !== "NOT_PAID" && (
            // {localAuth?.access === 'SUPER_ADMIN_ACCESS'  && (

            <div style={{ marginTop: '10px' }}>
              <Row>
                <Col>
                  {props.player?.tShirtStatus == T_SHIRT_STATUS[0] ? (
                    <Alert key={'danger'} variant={'danger'}>
                      T-shirt already provided by : {props.player?.tShirt?.providedBy?.mobile}{' '}
                      <br></br>
                      Time: {props.player?.tShirt?.providedOn}
                      {localAuth?.access === 'SUPER_ADMIN_ACCESS' ? (<Button onClick={()=> revertTshirtUpdate()}>Revert</Button>) :""}
                    </Alert>
                  ) : (
                    <Button disabled = {tShirtFlag}
                      onClick={() => {
                        updateTShirtStatus();
                      }}
                    >
                      Provide T-shirt
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
            
          )}
         
          {/* {
            playersState.authStatus === AUTH_STATUS.SUPER_ADMIN_ACCESS && (
              <div>
                <Row>
                  <div>
                    <span>Name : </span><span><input value={currentPlayer.name} 
                      onChange={(e) =>{
                        setCurrentPlayer({...currentPlayer, name:e.target.value})
                      }}
                    /></span>
                  </div>
                  <div>
                    <span>Club: </span><span><input value={currentPlayer.clubName}
                    onChange={(e) =>{
                        setCurrentPlayer({...currentPlayer, clubName:e.target.value})
                      }}
                    /></span>
                  </div>
                  <div>
                    <span>UPI : </span><span><input value={currentPlayer.upi}
                    onChange={(e) =>{
                        setCurrentPlayer({...currentPlayer, upi:e.target.value})
                      }}
                    /></span>
                  </div>
                  <div>
                     <Row className="mb-3">
                              <Form.Group controlId="gender">
                                <Form.Label>Gender : </Form.Label>
                                <div className="gender-options">
                                  <Form.Check
                                    inline
                                    label="MALE"
                                    name="group1"
                                    type={'radio'}
                                    id={`inline-${'Male'}-2`}
                                    checked={currentPlayer.gender === 'MALE' ? true : false}
                                    onClick={() => {
                                      setCurrentPlayer({...currentPlayer, gender:"MALE"})
                                    }}
                                  />
                                  <Form.Check
                                    inline
                                    label="FEMALE"
                                    name="group1"
                                    type={'radio'}
                                    checked={currentPlayer.gender === 'FEMALE' ? true : false}
                                    onClick={() => {
                                      setCurrentPlayer({...currentPlayer, gender:"FEMALE"})
                                    }}
                                    id={`inline-${'FeMale'}-2`}
                                  />
                                </div>
                              </Form.Group>
                            </Row>
                  </div>
                  <div>
                    <Button onClick={()=>{updateEntry()}}>Update</Button>
                  </div>
                </Row>
              </div>
            )
          } */}
        </Container>
      </Alert>
    </div>
  );
};

export default ViewPlayerComponent;

