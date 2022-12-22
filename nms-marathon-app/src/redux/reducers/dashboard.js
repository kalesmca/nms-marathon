import {GET_USER, ADD_USER} from '../../constants/actions';


const initState = {
        userList: [],
        
        
}

const user = (state=initState, action) =>{
    switch(action.type) {
        case GET_USER :{
            return {...state, userList: action.data}
        }
        case ADD_USER :{
            return {...state, ...action.data}
        }
        
        default :{
            return { ...state}
        }
    }

}

export default user;