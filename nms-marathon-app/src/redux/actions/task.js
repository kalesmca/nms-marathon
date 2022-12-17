import {ADD_TASK } from '../../constants/actions';

export const addTask = (data) =>{
    return {type: ADD_TASK, payload: data}
}