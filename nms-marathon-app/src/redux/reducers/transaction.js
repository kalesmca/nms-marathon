import {DEPOSIT_MONEY, WITHDRAW_MONEY, ADD_CUSTOMER, UPDATE_TRANSACTION_STATE} from '../../constants/actions';

const initState = {
    lastUpadteDate: new Date(),
    availableBalance : 10,
    transactionList : [],
}

const transaction = (state=initState, action) =>{
    switch(action.type) {
        case DEPOSIT_MONEY :{
            console.log('acton :', action)
            return {
                ...state, ...action.data
            }
        }
        case WITHDRAW_MONEY:{
            return {...state,
                lastUpadteDate: action.date,
                availableBalance: action.availAmount,
                transactionList: [...state.transactionList, [...action.transaction]]
            }
        }
        case UPDATE_TRANSACTION_STATE:{
            return{
                ...state, lastUpadteDate: action.lastUpadteDate,
                availableBalance: action.availableBalance,
                transactionList: action.transactionList

            }
        }
        default :{
            return { ...state}
        }
    }

}

export default transaction;