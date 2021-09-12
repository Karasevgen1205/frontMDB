import React, {useContext, useEffect, useState} from "react";
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

    const {profile} = useContext(Context);

    const [preloadValue, setPreloadValue] = useState(false);

    const checkAuth = async () => {
        const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
        localStorage.setItem('token', response.data.accessToken);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setPreloadValue(true)
            checkAuth().then(data => {
                profile.setIsAuth(true);
            }, reason => {
                setPreloadValue(false)
            }).finally(() => setPreloadValue(false))
        }
    }, []);

    return (
        <BrowserRouter>
            <div className={styles.globalWrapper}>
                <Header/>
                <Aside/>
                {preloadValue ? <div className={styles.loaderWrapper}><Loader/></div> : <Content/>}
            </div>
        </BrowserRouter>
    )
});

export default App;
