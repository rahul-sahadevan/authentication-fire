import { ADD_ISSUE,DELETE_ISSUE,UPDATE_ISSUE } from "./actionType";


export const addIssue= (new_issue)=>{

    return {
        type:ADD_ISSUE,
        payload:new_issue
    }

}