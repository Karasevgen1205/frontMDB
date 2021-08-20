import {userAPI} from "../DAL/API";
import {setPreloadStatus} from "./auth-reducer";

const PROFILE_DATA = "PROFILE_DATA";


let initialState = {
    avatarUrl: "",
    posts: []
};

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_DATA: {
            return {...state, avatarUrl: action.avaUrl}
        }
        default:
            return state
    }
};


export const setProfileData = (avaUrl) => {
    return {
        type: PROFILE_DATA,
        avaUrl
    }
};


export const uploadAvatar = (profileImg) => async (dispatch) => {
    try {
        let response = await userAPI.uploadAvatar(profileImg);
        console.log(response)
    } catch (e) {
        console.log(e);
    }
};

export const sendPost = (textPost) => async (dispatch) => {
    try {
        let response = await userAPI.sendPost(textPost);
        console.log(response)
    } catch (e) {
        console.log(e)
    }
};

export const getProfileData = () => async (dispatch) => {
    try{
        /*dispatch(setPreloadStatus(true));*/
        let response = await userAPI.getProfileData();
        dispatch(setProfileData(response.data.avaUrl));
        /*dispatch(setPreloadStatus(false));*/
    } catch(e) {
        /*dispatch(setPreloadStatus(false));*/
        console.log(e)
    }
};
