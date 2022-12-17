import { DEPOSIT_MONEY, GET_WALLET_DATA, UPDATE_TRANSACTION_STATE } from '../../constants/actions';
import ApiService from '../API/apiService';
import { batch } from 'react-redux';
import axios from 'axios';
import { CONSTANTANTS } from '../../config/constants';


export const depositAmount = (data) => async (dispatch, getState) => {

    const { transaction } = getState();
    const availableBalance = data.isDeposit ? transaction.availableBalance + data.amount : transaction.availableBalance - data.amount;
    data = { ...data, currentBalance: availableBalance }
    data.id= Math.floor(new Date().getTime() / 1000);
    let resp;
    await axios.post(CONSTANTANTS.base_URL+'/transactions', data)
        .then((response) => {
            console.log(response);
            resp = response;
            console.log('resp::', resp);
            console.log('trans :', transaction);
            data = {
                ...data, ...{
                    availableBalance: availableBalance,
                    date: data.date,
                    transactionList: [...transaction.transactionList, ...[data]],
                }
            }
            data.type = UPDATE_TRANSACTION_STATE;
            const dashboardData = { availableBalance: availableBalance, lastUpadteDate: data.date }
            axios.patch(CONSTANTANTS.base_URL+'/dashboard/d1', dashboardData)
                .then((transResp) => {
                    batch(() => {
                        console.log('data:', data)
                        dispatch(updateTransactionList(data));
                        // dispatch()
                    })
                })



        })
        .catch(function (error) {
            console.log(error);
            batch(() => {
                dispatch(updateTransactionList(data));
                // dispatch()
            })

        });

    // dispatch({
    //     type: DEPOSIT_MONEY,
    //     data: data
    // })
}

export const getWalletData = () => async (dispatch, getState) => {
    const data = { type: UPDATE_TRANSACTION_STATE }
    const url = CONSTANTANTS.base_URL+'/dashboard';
    console.log('url::', url)
    await axios.get(url)
        .then((dashboardRes) => {
            console.log(dashboardRes);
            data.availableBalance = dashboardRes.data[0].availableBalance;
            data.date = dashboardRes.data[0].lastUpadteDate;
            // data.transactionList = 
            axios.get(CONSTANTANTS.base_URL+'/transactions')
                .then((transRes) => {
                    console.log(' trans resp:', transRes);
                    data.transactionList = transRes.data;
                    console.log(data)
                    batch(() => {
                        dispatch(updateTransactionList(data));
                    })
                });
        })
}



export const updateTransactionList = (data) => {
    return data;

}





