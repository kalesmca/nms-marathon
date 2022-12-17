import {GET_CATEGORYLIST} from '../../constants/actions';

const initState = {
    categoryList : [{
       category: "INVERSTMENT",
       subCategory: "Post_Office",
       catId: "00216",
       isExpense:false
    }],
    flag:false
    
}

const categoryReducer = (state=initState, action) =>{
    switch(action.type) {
        case GET_CATEGORYLIST :{
            return {...state}
        }
        default :{
            return { ...state}
        }
    }

}

export default categoryReducer;