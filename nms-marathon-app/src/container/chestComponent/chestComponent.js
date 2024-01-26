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
        let chestIndex = 100
        let flag = true
        finalRes.map((player, pIndex)=>{
            if(player.playerCategory === 'U_19_B' && flag === true){
                chestIndex = 100;
                flag = false
            }
            chestIndex = chestIndex+1
            while(flag ? excludeList().includes(chestIndex): excluedList2().includes(chestIndex)){
                chestIndex = chestIndex+1;  
            }
            // if(excludeList().includes(pIndex+1)){
            //     chestIndex = chestIndex+1;
            // }
            player.chestNumber = chestIndex;
        })
        setPlayerList(finalRes)
    }, [playersState])

   const excludeList = () =>{
    return [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,137,144,147,153,154,155,156,162,163,198,200,201,202,203,204,205,206,207,315,322,323,324,330,449,550,551,609,624,675,676,677,678,679,691,696,744,759,760,761,762,763]
   }

   const excluedList2 = ()=>{
    var arr = [];
    for(let i=401;i<=500;i++){
        arr.push(i)
    }
    let arr2= [104,105,106,107,108,109,110,111,112,113,114,115,116,117,126,134,140,141,142,143,144,145,146,151,162,165,184,188,189,190,191,192,193,194,195,196,234,253,254,255,256,257,258,294,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,321,325,333,339,350,351,352,353,354,355,356,357,358,400,501,502,503,504,505,506,507,508,509,514,518,520,522,535,538,539,540,541,587,636,639,642,643,644,645,646,647,648,649,650,651,652,662,664,676,705,722,742,746,760,761,762,763,764,765,774,782,783,785,794,799,800,803,805,806,807]
    let conArr = [...arr, ...arr2];
    return conArr;
   }
    
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
                                                        <td>{player.chestNumber}</td>{
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
