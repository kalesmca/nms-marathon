import { GET_USER, ADD_USER } from '../../constants/actions';
import { db } from "../../firebase-config";
import {
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";
import { async } from "@firebase/util";

const usersCollectionRef = collection(db, "users");

export const getUser = () => async (dispatch, getState) => {
    try {
        const data = await getDocs(usersCollectionRef);
        let dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log('data list:', dataList)

        dispatch(updateUser(dataList))
    }
    catch (error) {
        console.log('error:', error);
    }

}

export const addUser = (obj) => async (dispatch, getState) => {
    try {
        await addDoc(usersCollectionRef, obj);
        

        dispatch(updateUser(dataList))
    }
    catch (error) {
        console.log('error:', error);
    }

}

export const updateUser = (data) => {
    return {
        type: GET_USER,
        data: data
    }
}

