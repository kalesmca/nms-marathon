import userEvent from "@testing-library/user-event";
import React, { useState, useEffect, useContext } from "react";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerList } from '../../redux/actions/players';
import Dropdown from 'react-bootstrap/Dropdown';
import { PopupContext } from "../../config/context";
import { EVENTS, PAYMENT_STATUS } from '../../config/constants';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import { JsonToExcel } from "react-json-to-excel";
import { db } from "../../firebase-config";
import {DB} from '../../config/constants';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { async } from "@firebase/util";

const initEvent = { eventName: "ALL", eventId: "ALL" };
const ChestNumberComponent = () => {
    const playersState = useSelector((state) => state.players)
    const [playerList, setPlayerList] = useState(playersState.playerList);
    const [playerCategory, setPlayerCategory] = useState("ALL")
    const [events, setEvents] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("ALL")
    const authData = JSON.parse(localStorage.getItem("auth"));

    const [selectedEvent, setSelectedEvent] = useState(initEvent)
    const { msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj } = useContext(PopupContext)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('appSate:', playersState);
    })
    useEffect(() => {
        // dispatch(getPlayerList());
    }, [])
    function groupByKey(array, key) {
        return array
          .reduce((hash, obj) => {
            if(obj[key] === undefined) return hash; 
            return Object.assign(hash, { [obj[key].toLowerCase()]:( hash[obj[key].toLowerCase()] || [] ).concat(obj)})
          }, {})
     }

     function compare( a, b ) {
        if ( a.playerCategory < b.playerCategory ){
          return -1;
        }
        if ( a.playerCategory > b.playerCategory ){
          return 1;
        }
        return 0;
      }
      
      
    useEffect(() => {
        // setPlayerList(playersState.playerList);
        const paidList = playersState.playerList.filter((player)=>{
            return player.paymentStatus != "PAYMENT_NOT_VERIFIED" && player.paymentStatus !="NOT_PAID"

        })
        const result = Object.groupBy(paidList, ({ playerCategory }) => playerCategory);
        let outer = []
        console.log('group::', result)
        Object.keys(result).map((key)=>{
            let sortedArr = []
        let sortedObj = groupByKey(result[key], 'clubName')
        console.log('sorted obj:', sortedObj)
        Object.keys(sortedObj).map((key)=>{
            sortedArr = [...sortedArr, ...sortedObj[key]]

        })
        outer = [...outer, ...sortedArr]
        })
        
        let girlsList = [];
        let boysList =[];
        outer.map((data)=>{
            if(data.playerCategory === "U_19_G" || data.playerCategory === "U_10_G"){
                girlsList = [...girlsList, ...[data]] 
            } else {
                boysList = [...boysList, ...[data]]
            }
        })
        boysList.sort( compare );
        girlsList.sort(compare)
        let finalRes = [...boysList, ...girlsList]
        console.log('outer',outer);
        console.log('final:', finalRes)
        setPlayerList(finalRes)
    }, [playersState])
    
    // useEffect(() => {
    //     setEvents(EVENTS[playerCategory])
    // }, [playerCategory])
    const categoryQuery = (e) => {
        console.log(e);
        setPlayerCategory(e);
        setSelectedEvent(initEvent)
        setEvents(EVENTS[e])

    }
    // const groupBy = (input, key) => {
    //     return input.reduce((acc, currentValue) => {
    //       let groupKey = currentValue[key];
    //       if (!acc[groupKey]) {
    //         acc[groupKey] = [];
    //       }
    //       acc[groupKey].push(currentValue);
    //       return acc;
    //     }, {});
    //   };
    const selectEvent = (event) => {
        console.log(event)
        setSelectedEvent(event);
    }

    const viewPlayer = (player) => {
        setPopupObj({ componentName: "ViewPlayerComponent", props: player, title: player.name })
        setMsgPopupFlag(true)
    }

    const getQueryValidation = (player) => {
        let searchKeyFlag = true;
        searchKeyFlag = !searchKey ? true : (player.name.toLowerCase().includes(searchKey.toLowerCase()) || player.upi.toLowerCase().includes(searchKey.toLowerCase())) ? true : false;
        if ((playerCategory === "ALL" || player.playerCategory === playerCategory) &&
            (selectedEvent.eventId === "ALL" || selectedEvent.eventId == player.selectedEvents[0].eventId || selectedEvent.eventId === player.selectedEvents[1]?.eventId) &&
            (searchKeyFlag) &&
            (paymentStatus === "ALL" || player.paymentStatus === paymentStatus)
        ) {
            return true;
        } else {
            return false
        }


    }
    
    const editPlayer = (player) =>{
        setPopupObj({ componentName: "ViewPlayerComponent", props: player, title: player.name })
        setMsgPopupFlag(true)
    }

    const deletePlayer = (player) =>{
        const userDoc = doc(db, DB.players, player.id);
        deleteDoc(userDoc);
        
        setTimeout(()=>{
            dispatch(getPlayerList());
        },1000)

    }
    let queryIndex = 0;

    return (
        
        <div>
            {
                playersState?.authStatus === "ADMIN_ACCESS" || playersState?.authStatus === "SUPER_ADMIN_ACCESS" ? (
                    // true ? (
                    <div>
                        {/* <div> 
                        <JsonToExcel
                                title="Download as Excel"
                                data={playerList}
                                fileName="sample-file"
                            />
                        </div> */}
                        <Form >
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">

                                    <Form.Control type="text" placeholder="Search By Player Name" value={searchKey}
                                        onChange={(e) => { setSearchKey(e.target.value) }}
                                    />

                                </Form.Group>


                            </Row>
                        </Form>
                        <div>
                            <Dropdown className="d-inline mx-2" value={playerCategory} >
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    {playerCategory}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        Object.keys(EVENTS).map((key, kIndex) => {
                                            return (<Dropdown.Item index={kIndex} value={key} onClick={(e) => { categoryQuery(key) }}>{key}</Dropdown.Item>)

                                        })
                                    }

                                    <Dropdown.Divider />
                                    <Dropdown.Item value={"ALL"} onClick={(e) => { categoryQuery("ALL") }}>ALL</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            {
                                events?.length ? (<Dropdown className="d-inline mx-2" value={selectedEvent.eventName} >
                                    <Dropdown.Toggle id="dropdown-autoclose-true">
                                        {selectedEvent.eventName}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            events.map((event, kIndex) => {
                                                return (<Dropdown.Item index={kIndex} value={event.eventName} onClick={(e) => { selectEvent(event) }}>{event.eventName}</Dropdown.Item>)

                                            })
                                        }

                                        <Dropdown.Divider />
                                        <Dropdown.Item value={"ALL"} onClick={(e) => { selectEvent({ eventName: "ALL", eventId: "ALL" }) }}>ALL</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>) : ""
                            }

                            <Dropdown className="d-inline mx-2" value={paymentStatus} >
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    {paymentStatus}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        PAYMENT_STATUS.map((status, kIndex) => {
                                            return (<Dropdown.Item index={kIndex} value={status} onClick={(e) => { setPaymentStatus(status) }}>{status}</Dropdown.Item>)

                                        })
                                    }

                                    <Dropdown.Divider />
                                    <Dropdown.Item value={"ALL"} onClick={(e) => { setPaymentStatus("ALL") }}>ALL</Dropdown.Item>

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
                                        <th>Club</th>
                                        <th>Pay Status</th>
                                        <th>Created_ON</th>
                                        <th>sortlist</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        playerList?.length ? playerList.map((player, pIndex) => {
                                            if (getQueryValidation(player)) {
                                                queryIndex = queryIndex +1;

                                                return (
                                                    // <tr key={pIndex} >

                                                    <tr key={pIndex} onClick={() => { authData?.access==="SUPER_ADMIN_ACCESS" && viewPlayer(player) }}>
                                                        <td>{pIndex + 1}</td>
                                                        <td>{player.name}</td>
                                                        <td>{player.playerCategory}</td>
                                                        <td>Not-yet</td>{
                                                            player?.selectedEvents?.length ? 
                                                            (<td>{player?.selectedEvents.map((event, eIndex) => {
                                                                return (<div key={eIndex}>{event.eventName}</div>)
                                                            })}</td>) : ""
                                                        }
                                                        <td>{player.clubName}</td>
                                                        
                                                        <td>{player.paymentStatus}</td>
                                                        <td>{player.createdOn}</td>
                                                        <td>{queryIndex}</td>
                                                        {/* <td onClick={()=>deletePlayer(player)}>Delete</td> */}
                                                        {/* <td><button onClick={()=>{editPlayer(player)}}>Edit</button></td> */}
                                                    </tr>
                                                )
                                            }

                                        }) : <tr>
                                            <td colSpan={6}> No Data Found</td>
                                        </tr>
                                    }

                                </tbody>
                            </Table>
                        </div>
                    </div>
                ) : ""
            }

        </div>

    )
}

export default ChestNumberComponent;