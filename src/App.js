import React, {useContext, useEffect} from "react";
import styles from "./App.module.css"
import {Header} from "./components/Header";
import {Aside} from "./components/Aside";
import {Content} from "./components/Content";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import axios from "axios";
import {API_URL} from "./DAL/API";
import {Loader} from "./components/common/Loader";

const App = observer(() => {

    const {user} = useContext(Context);

    const checkAuth = async () => {
        const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
        localStorage.setItem('token', response.data.accessToken);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            user.setPreload(true);
            checkAuth().then(data => {
                user.setIsAuth(true);
            }, reason => {
                user.setIsAuth(false);
            }).finally(() => user.setPreload(false))
        }
    }, []);

    return (
        <BrowserRouter>
            <div className={styles.globalWrapper}>
                <Header/>
                <Aside/>
                {user.preload ? <Loader/> : <Content/>}
            </div>
        </BrowserRouter>
    )
});

export default App;
