import * as axios from "axios"

export const API_URL = `http://localhost:3001/api`

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true, //автоматическая подцепка куки к запросу
    responseType: "json",
    headers: {
        "content-type": "application/json",
        "Accept": "application/json"
    }
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

instance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status == 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials:true});
            localStorage.setItem('token', response.data.accessToken)
            return instance.request(originalRequest)
        } catch (e) {
            console.log("не авторизован")
        }
    }
    throw error;
});



export const authAPI = {
    register(email, password, user_name) {
        return instance.post(`register`, {email, password, user_name});
    },
    login(email, password) {
        return instance.post(`login`, {email, password});
    },
    logout() {
        return instance.post(`logout`);
    }
};

export const userAPI = {
    uploadAvatar(profileImg) {
        const formData = new FormData();
        formData.append("profileImg", profileImg);
        return instance.post(`avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    sendPost(textPost) {
        return instance.post(`post`, {textPost});
    },
    getProfileData() {
        return instance.get(`profile`);
    }

};

