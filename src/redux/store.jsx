import issueReducer from "./reducers/issueReducer";
import { createStore } from "@reduxjs/toolkit";


const store = createStore(issueReducer)
export default store