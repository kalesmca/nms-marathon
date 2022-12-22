import {adminList, CONSTANTS} from '../constants/config';
export const adminCheck = (mobile) => {
    
}

const getListByPaymentCategory = (userList, paymentCategory) =>{
    let list = [];
    userList.forEach(item => {
        if(paymentCategory === 'UN-PAID'){
            if(item.chestNumber === CONSTANTS.paymentPending) list.push(item)
        } else {
            if(item.chestNumber !== CONSTANTS.paymentPending) list.push(item)
        }
    });
    return list;
}

export const getUserListByFilter = (userList, category, paymentType) =>{
    if(paymentType === 'ALL' && category == 'ALL'){
        return userList;
    } else if(paymentType === 'ALL' && category != 'ALL'){
        return getListByCategory(userList, category)
    } else if(paymentType != 'ALL' && category === 'ALL'){
        return getListByPaymentCategory(userList, paymentType)
    } else {
        let list = getListByCategory(userList, category);
        const finalList = getListByPaymentCategory(list, paymentType)
        return finalList;
    }
    
}

const getListByCategory = (userList, category) =>{
    let list = [];
    userList.forEach(item => {
         if(item.category === category) list.push(item)
    });
    return list;
}

