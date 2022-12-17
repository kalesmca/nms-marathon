import {GET_USER} from '../../constants/actions';


const initState = {
        userList: []
}

const user = (state=initState, action) =>{
    switch(action.type) {
        case GET_USER :{
            return {...state, userList: action.data}
        }
        default :{
            return { ...state}
        }
    }

}

export default user;