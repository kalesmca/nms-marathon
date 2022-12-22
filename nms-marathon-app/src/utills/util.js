import {adminList, CONSTANTS} from '../constants/config';
export const adminCheck = (mobile) => {
    
}

export const getPaidListByCategory = (userList, category) =>{
    let list = [];
    userList.forEach(item => {
         if(item.category === category && list.chestNumber!= CONSTANTS) list.push(item)
    });
    return list;
}

export const getUnPaidListByCategory = (userList, category) =>{
    let list = [];
    userList.forEach(item => {
         if(item.category === category && list.chestNumber == CONSTANTS) list.push(item)
    });
    return list;
}

export const getListByCategory = (userList, category) =>{
    let list = [];
    userList.forEach(item => {
         if(item.category === category) list.push(item)
    });
    return list;
}

