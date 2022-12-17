import {GET_TASKS} from '../../constants/actions';

const initState = {
    taskList : [{
       category: "INVERSTMENT",
       subCategory: "Post_Office",
       catId: "00216",
       amt: 2000,
       isExpense: false,
       taskId:65489,
       note: "for Father",
       date: new Date(),
       type: "INCOME",
        typeId: "1"
    }],
    flag:false
}

const taskReducer = (state=initState, action) =>{
    switch(action.type) {
        case GET_TASKS :{
            return {...state}
        }
        default :{
            return { ...state}
        }
    }

}

export default taskReducer;