import { GET_USER, ADD_USER } from '../../constants/actions';
import { db } from "../../firebase-config";
import {
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";
import { batch } from 'react-redux';
import {adminList} from '../../constants/config';

import { async } from "@firebase/util";

const usersCollectionRef = collection(db, "users");

export const getUserList = () => async (dispatch, getState) => {
    try {
        const data = await getDocs(usersCollectionRef);
        let dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log('data list:', dataList)

        dispatch(updateUserList(dataList))
    }
    catch (error) {
        console.log('error:', error);
    }

}

export const addUser = (obj) => async (dispatch, getState) => {
    try {
        await addDoc(usersCollectionRef, obj);
        dispatch(updateUser(obj))
    }
    catch (error) {
        console.log('error:', error);
    }

}

export const getUserByMobile = (mobile) => async (dispatch, getState) => {
    try {
        const admin = admin.find((item)=> item.mobile == mobile);
        const data = await getDocs(usersCollectionRef);
        let dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const dbData = admin? admin: dataList.find((item) => item.mobile == mobile)
        console.log('dbData:', dbData);
        if (dbData) {
            batch(() => {
                dispatch(updateUserList(dataList))
                dispatch(updateUser(dbData))
            })
        }
    } catch (err) {
        console.log('server error')
    }

}
export const updateUser = (data) => {
    return {
        type: ADD_USER,
        data: data
    }
}

export const updateUserList = (data) => {
    return {
        type: GET_USER,
        data: data
    }
}

