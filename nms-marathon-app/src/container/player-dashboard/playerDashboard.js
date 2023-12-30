import React,{useState, useEffect, useContext} from "react";
import Table from 'react-bootstrap/Table';
import {useDispatch, useSelector} from 'react-redux';
import {getPlayerList} from '../../redux/actions/players';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {PopupContext } from '../../config/context';
import Alert from 'react-bootstrap/Alert';

const PlayerDashboard = () =>{
    const playersState = useSelector((state)=> state.players)
    const [playerList, setPlayerList] = useState(playersState.regPlayerList)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {setMsgPopupFlag, setNavigationPath,popupObj, setPopupObj} = useContext(PopupContext);

    useEffect(()=>{
        console.log('appSate:',playersState);
    })
    useEffect(()=>{
        const localAuth = JSON.parse(localStorage.getItem("auth"))
        if(!localAuth || !localAuth.mobile){
        navigate("")
        } 
        // else {
        //     dispatch(getPlayerList());
        // }
        
    }, [])
    useEffect(()=>{
        setPlayerList(playersState.regPlayerList)
    },[playersState])

    const navigation = () =>{
        setNavigationPath("registration");
      setPopupObj({title:"SUCCESS", content: "Add more player"})
      setMsgPopupFlag(true)
    }
    return(
        <div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            playerList?.length ? playerList.map((player, pIndex) =>{
                               
                                    return(
                                        <tr key={pIndex}>
                                            <td>{pIndex+1}</td>
                                            <td>{player.name}</td>
                                            <td>{player.playerCategory}</td>
                                            <td>{player.chestNumber}</td>
                                            {/* <td>{player.selectedEvents.map((event, eIndex)=>{
                                                return(<div key={eIndex}>{event.eventName}</div>)
                                            })}</td> */}
                                            <td>{player.paymentStatus}</td>
                                        </tr>
                                    )
                                
                                
                            }) : <tr>
                                <td colSpan={6}> No Data Found</td>
                            </tr>
                        }
                        
                    </tbody>
                </Table>
            </div>
            <div>
            <Button variant="primary" onClick={() => { navigation() }}>
        Add More Player
      </Button>
            </div>
            <div>
            <Alert variant={"warning"}>
     
     <div>Payment Status will Update within 3 Days</div>
     

</Alert>
            </div>
        </div>
    )
}

export default PlayerDashboard;