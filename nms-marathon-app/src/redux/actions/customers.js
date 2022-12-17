import {GET_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER} from '../../constants/actions';
export const getCustomers = () => {
    
    return {type: GET_CUSTOMERS}
}

export const addCustomer = (data) =>{
    return {type: ADD_CUSTOMER, payload: data}
}

export const updateCustomer = (data) =>{
    
    return {type: UPDATE_CUSTOMER, payload: data}
}

