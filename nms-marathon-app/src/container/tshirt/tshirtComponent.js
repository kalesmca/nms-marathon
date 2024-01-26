import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import {EVENTS, TSHIRT_COUNT_LIST} from '../../config/constants';
import { useDispatch, useSelector } from 'react-redux';

const TshirtComponent = () =>{
    const [category, setCategory] = useState("ALL")
    const [tshirtCountObj, setTshirtCount] = useState(TSHIRT_COUNT_LIST)
    const playersState = useSelector((state) => state?.players)
    const playerList = playersState?.playerList;
    const [totalCount, setTotalCount] = useState(0)

    useEffect(()=>{
        getTshirtCountList()
    },[category])
    const getTshirtCountList = () =>{
        console.log('player state:', playerList);
        let obj = JSON.parse(JSON.stringify(TSHIRT_COUNT_LIST)) 
        let tShirtPlayerList = playerList.filter((player)=>{
            return player.paymentStatus != "PAYMENT_NOT_VERIFIED"&& player.paymentStatus !="NOT_PAID"
        })
        tShirtPlayerList.map((player) =>{
            if(category !== "ALL"){
                if(player.playerCategory === category){
                    if(player.tShirtSize && player.tShirtSize !== "NO"){
                        obj[player.tShirtSize] = obj[player.tShirtSize] + 1;
                    }
                    
                }
            } else {
                if(player.tShirtSize && player.tShirtSize !== "NO"){
                    obj[player.tShirtSize] = obj[player.tShirtSize] + 1;
                }
            }
            

        })
        setTshirtCount(obj);
        let count =0;
        Object.keys(obj).map((item)=>{
            count = count + obj[item] 
        })
        setTotalCount(count)
    }
    return(
        <div className="tshirt-container">
            <div className="query-section">
            <Dropdown className="d-inline mx-2" value={category} >
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    {category}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                       Object.keys(EVENTS).map((event, kIndex) => {
                                            return (<Dropdown.Item index={kIndex} value={event} onClick={(e) => { setCategory(event) }}>{event}
                                            </Dropdown.Item>)

                                        })
                                    }

                                    <Dropdown.Divider />
                                    <Dropdown.Item value={"ALL"} onClick={(e) => { setCategory("ALL") }}>ALL</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
            </div>
            <div className="data-section">
            <div>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Size</th>
                                        <th>Count</th>
                                        
                                      
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(tshirtCountObj).map((item,index)=>{
                                            return (
                                                <tr>
                                        <td>{index+1}</td>
                                        <td>{item}</td>
                                        <td>{tshirtCountObj[item]}</td>
                                    </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td colSpan={2}>
                                            Total
                                        </td>
                                        <td>{totalCount}</td>
                                    </tr>
                                    

                                </tbody>
                            </Table>
                        </div>
            </div>
        </div>
    )
}

export default TshirtComponent;