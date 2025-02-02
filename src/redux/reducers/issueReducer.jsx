import { ADD_ISSUE } from "../actions/actionType";



const intialState = [{issue:'empty'}]

const issueReducer = (state = intialState , action)=>{

    if(action.type === ADD_ISSUE){
        return [...state,action.payload]
    }
    else{
        return state
    }



}

export default issueReducer