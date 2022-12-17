import {GET_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER} from '../../constants/actions';

const initState = {
    customerList : [{
        name: "Nandhini",
        age: 28,
        degree: "ME",
        city: "Rajapalayam",
        isEditable : false
    }],
    flag:false
}

const customerReducer = (state=initState, action) =>{
    switch(action.type) {
        case GET_CUSTOMERS :{
            return {...state}
        }
        case ADD_CUSTOMER :{
            return {...state, customerList: [...state.customerList, ...[action.payload]] }
        }
        case UPDATE_CUSTOMER:{
            return { ...state, customerList: action.payload}
        }
        default :{
            return { ...state}
        }
    }

}

export default customerReducer;