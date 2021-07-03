import * as axios from "axios"

const instance = axios.create({
    /*baseURL: "http://localhost:3001",*/
    withCredentials: true,
    responseType: "json",
    headers: {
        "content-type": "application/json",
        "Accept": "application/json"
    }
});

export const authAPI = {
    register(email, password) {
        return instance.post(`/user/register`, {email, password});
    }
};

