import {applyMiddleware, combineReducers, createStore} from "redux";
import {AuthReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"


let reducers = combineReducers({
    Auth: AuthReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;