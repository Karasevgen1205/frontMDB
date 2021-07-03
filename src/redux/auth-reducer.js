import {authAPI} from "../DAL/API";


let initialState = {
    isReg: null,
    isAuth: false
};

export const AuthReducer = (state = initialState, action) => {
    return state
};

export const registration = (email, password) => async (dispatch) => {
    try {
        let response = await authAPI.register(email, password);
        console.log(`add user ${email}`)

    } catch (error) {
        alert("Error");
    }
};