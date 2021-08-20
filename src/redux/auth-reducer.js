import {API_URL, authAPI, userAPI} from "../DAL/API";
import axios from "axios";

const AUTH_STATUS = "AUTH_STATUS";
const PRELOAD_STATUS = "PRELOAD_STATUS";


let initialState = {
    isAuth: false,
    preloader: false
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_STATUS: {
            return {...state, isAuth: action.isAuthValue}
        }
        case PRELOAD_STATUS: {
            return {...state, preloader: action.isPreloadValue}
        }
        default:
            return state
    }
};

export const setAuthStatus = (value) => {
    return {
        type: AUTH_STATUS,
        isAuthValue: value
    }
};
export const setPreloadStatus = (value) => {
    return {
        type: PRELOAD_STATUS,
        isPreloadValue: value
    }
};
export const checkAuth = () => async (dispatch) => {
    try {
        dispatch(setPreloadStatus(true));
        const response = await axios.get(`${API_URL}/refresh`, {withCredentials:true});
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuthStatus(true));
        dispatch(setPreloadStatus(false));
    } catch (e) {
        dispatch(setPreloadStatus(false));
        console.log(e.response?.data?.message)
    }
};
export const registration = (email, password, user_name) => async (dispatch) => {
    try {
        dispatch(setPreloadStatus(true));
        let response = await authAPI.register(email, password, user_name);
        dispatch(setPreloadStatus(false));
        console.log(response)
    } catch (error) {
        dispatch(setPreloadStatus(false));
        alert("Error");
    }
};
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch(setPreloadStatus(true));
        let response = await authAPI.login(email, password);
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuthStatus(true));
        dispatch(setPreloadStatus(false));
    }catch (e) {
        dispatch(setPreloadStatus(false));
        console.log(e.response?.data?.message)
    }
};
export const logout = () => async (dispatch) => {
    try{
        let response = await authAPI.logout();
        dispatch(setAuthStatus(false));
        localStorage.removeItem('token');
        console.log(response)
    }catch (e) {
        console.log(e.response?.data?.message)
    }
};
