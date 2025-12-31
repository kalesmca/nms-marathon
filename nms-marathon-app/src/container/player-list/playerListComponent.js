import userEvent from '@testing-library/user-event';
import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerList } from '../../redux/actions/players';
import Dropdown from 'react-bootstrap/Dropdown';
import { PopupContext } from '../../config/context';
import { EVENTS, PAYMENT_STATUS } from '../../config/constants';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import { JsonToExcel } from "react-json-to-excel";
import { db } from '../../firebase-config';
import { DB } from '../../config/constants';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { async } from '@firebase/util';

const initEvent = { eventName: 'ALL', eventId: 'ALL' };
const PlayerListComponent = () => {
  const playersState = useSelector((state) => state.players);
  const allList = structuredClone(playersState.playerList);
  const [playerList, setPlayerList] = useState(playersState.playerList);
  const [playerCategory, setPlayerCategory] = useState('ALL');
  const [events, setEvents] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('ALL');
  const [filteredPlayerList, setFilteredList] = useState(playersState.playerList)
  const [selectedEvent, setSelectedEvent] = useState(initEvent);
  const {
    msgPopupFlag,
    setMsgPopupFlag,
    navigationPath,
    setNavigationPath,
    popupObj,
    setPopupObj,
  } = useContext(PopupContext);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('appSate:', playersState);
  });
  useEffect(() => {
    // dispatch(getPlayerList());
    const timer = setTimeout(() => {
      getFilteredList()
    }, 500); // wait 500ms after last keystroke

    return () => clearTimeout(timer);
    
  }, [searchKey, paymentStatus, playerCategory]);
  useEffect(() => {
    setPlayerList(playersState.playerList);
  }, [playersState]);
  // useEffect(() => {
  //     setEvents(EVENTS[playerCategory])
  // }, [playerCategory])
  const categoryQuery = (e) => {
    console.log(e);
    setPlayerCategory(e);
    setSelectedEvent(initEvent);
    setEvents(EVENTS[e]);
  };
  const selectEvent = (event) => {
    console.log(event);
    setSelectedEvent(event);
  };

  const viewPlayer = (player) => {
    setPopupObj({ componentName: 'ViewPlayerComponent', props: player, title: player.name });
    setMsgPopupFlag(true);
  };

  // This filter method for Marathon
  const getFilteredList = () => {
    let keyFilteredList = structuredClone(allList);
    // if (searchKey) {
    keyFilteredList = allList.filter((player) => {
      return (
        (!searchKey ||
          player.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          String(player.upi).includes(searchKey.toLowerCase()) ||
          String(player.createdBy).includes(searchKey.toLowerCase())) &&
        (playerCategory === 'ALL' || player.playerCategory === playerCategory)
        && (paymentStatus === 'ALL' || player.paymentStatus === paymentStatus)
      );
    });
    // }
    // let categoryFilter = keyFilteredList.filter((player)=>{
    //   return (playerCategory === "ALL" || player.playerCategory === playerCategory )
    // })
    setFilteredList(keyFilteredList);
  };


  // this method for Athletics
  const getQueryValidation = (player) => {
    let searchKeyFlag = true;
    searchKeyFlag = !searchKey
      ? true
      : player.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          player.upi.toLowerCase().includes(searchKey.toLowerCase())
        ? true
        : false;
    if (
      (playerCategory === 'ALL' || player.playerCategory === playerCategory) &&
      (selectedEvent.eventId === 'ALL' ||
        selectedEvent.eventId == player.selectedEvents[0].eventId ||
        selectedEvent.eventId === player.selectedEvents[1]?.eventId) &&
      searchKeyFlag &&
      (paymentStatus === 'ALL' || player.paymentStatus === paymentStatus)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const editPlayer = (player) => {
    setPopupObj({ componentName: 'ViewPlayerComponent', props: player, title: player.name });
    setMsgPopupFlag(true);
  };

  const deletePlayer = (player) => {
    const userDoc = doc(db, DB.players, player.id);
    deleteDoc(userDoc);

    setTimeout(() => {
      dispatch(getPlayerList());
    }, 1000);
  };
  return (
    <div>
      {playersState?.authStatus === 'ADMIN_ACCESS' ||
      playersState?.authStatus === 'SUPER_ADMIN_ACCESS' ? (
        // true ? (
        <div style={{marginTop:"225px"}}>
          {/* <div> 
                        <JsonToExcel
                                title="Download as Excel"
                                data={playerList}
                                fileName="sample-file"
                            />
                        </div> */}
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control
                  type="text"
                  placeholder="Search By Player Name"
                  value={searchKey}
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
          </Form>
          <div>
            <Dropdown className="d-inline mx-2" value={playerCategory}>
              <Dropdown.Toggle id="dropdown-autoclose-true">{playerCategory}</Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(EVENTS).map((key, kIndex) => {
                  return (
                    <Dropdown.Item
                      index={kIndex}
                      value={key}
                      onClick={(e) => {
                        categoryQuery(key);
                      }}
                    >
                      {key}
                    </Dropdown.Item>
                  );
                })}

                <Dropdown.Divider />
                <Dropdown.Item
                  value={'ALL'}
                  onClick={(e) => {
                    categoryQuery('ALL');
                  }}
                >
                  ALL
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* {events?.length ? (
              <Dropdown className="d-inline mx-2" value={selectedEvent.eventName}>
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  {selectedEvent.eventName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {events.map((event, kIndex) => {
                    return (
                      <Dropdown.Item
                        index={kIndex}
                        value={event.eventName}
                        onClick={(e) => {
                          selectEvent(event);
                        }}
                      >
                        {event.eventName}
                      </Dropdown.Item>
                    );
                  })}

                  <Dropdown.Divider />
                  <Dropdown.Item
                    value={'ALL'}
                    onClick={(e) => {
                      selectEvent({ eventName: 'ALL', eventId: 'ALL' });
                    }}
                  >
                    ALL
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ''
            )} */}

            <Dropdown className="d-inline mx-2" value={paymentStatus}>
              <Dropdown.Toggle id="dropdown-autoclose-true">{paymentStatus}</Dropdown.Toggle>

              <Dropdown.Menu>
                {PAYMENT_STATUS.map((status, kIndex) => {
                  return (
                    <Dropdown.Item
                      index={kIndex}
                      value={status}
                      onClick={(e) => {
                        setPaymentStatus(status);
                      }}
                    >
                      {status}
                    </Dropdown.Item>
                  );
                })}

                <Dropdown.Divider />
                <Dropdown.Item
                  value={'ALL'}
                  onClick={(e) => {
                    setPaymentStatus('ALL');
                  }}
                >
                  ALL
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Chest No</th>
                  {/* <th>Events</th> */}
                  <th>Pay Status</th>
                  <th>Created_ON</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredPlayerList?.length ? (
                  filteredPlayerList.map((player, pIndex) => {
                    return (
                        <tr
                          key={pIndex}
                          onClick={() => {
                            viewPlayer(player);
                          }}
                        >
                          <td>{pIndex + 1}</td>
                          <td>{player.name}</td>
                          <td>{player.playerCategory}</td>
                          <td>Not-yet</td>
                          {player?.selectedEvents?.length ? (
                            <td>
                              {player?.selectedEvents.map((event, eIndex) => {
                                return <div key={eIndex}>{event.eventName}</div>;
                              })}
                            </td>
                          ) : (
                            ''
                          )}

                          <td>{player.paymentStatus}</td>
                          <td>{player.createdOn}</td>
                          {/* <td onClick={()=>deletePlayer(player)}>Delete</td> */}
                          {/* <td><button onClick={()=>{editPlayer(player)}}>Edit</button></td> */}
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td colSpan={6}> No Data Found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PlayerListComponent;
