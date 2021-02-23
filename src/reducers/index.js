import currentUser from "reducers/userReducers";
import {combineReducers} from "redux";

const rootReducer = combineReducers({currentUser});

export default rootReducer;
