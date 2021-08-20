import {applyMiddleware, combineReducers, createStore} from "redux";
import {AuthReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {ProfileReducer} from "./profile-reducer";


let reducers = combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;