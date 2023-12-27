import React from "react";
import {useSelector} from 'react-redux';
// import {gender} from '../../config/constants'
import { updateUser } from "../../redux/API/apiService";

const SourceDataComponent = () =>{
    const playersState = useSelector((state)=> state.players)
    const update = () =>{
        
        let playerlist = playersState.playerList
        let selectedPlayer = {}
        playerlist.forEach((player) =>{
            if(player.id === "k7lIJO3PlfIJpeWwVqzq"){
                player.gender = 'FEMALE';
                player.selectedEvents = [
                    {
                        eventName: "50M",
                        eventId:"U_10_G_EVENTS_1",
                        selection: false,
                        disable:false
                    },
                    {
                        eventName: "80M",
                        eventId:"U_10_G_EVENTS_2",
                        selection: false,
                        disable:false
                    }
                  ];
                  player.playerCategory = "U_10_G"
                selectedPlayer = player
            }
        })
        console.log('selected player', selectedPlayer);
        updateUser(selectedPlayer);

    }
    return(
        <div>
            SourceDataComponent
            <div>
                <button onClick={()=>{update()}}>update with data</button>
            </div>
            <div>
                {JSON.stringify(playersState.playerList)}
            </div>
        </div>
    )
}

export default SourceDataComponent