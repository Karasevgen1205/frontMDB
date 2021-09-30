import React, {useContext, useEffect, useState} from "react";
import styles from "./App.module.css"
import {MyHeader} from "./components/MyHeader";
import {Aside} from "./components/Aside";
import {MyContent} from "./components/MyContent";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import axios from "axios";
import {API_URL} from "./DAL/API";
import {Loader} from "./components/common/Loader";
import {Layout} from 'antd';
import 'antd/dist/antd.css';

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
            {/*            <div className={styles.globalWrapper}>
                <Header/>
                <Aside/>
                {preloadValue ? <div className={styles.loaderWrapper}><Loader/></div> : <Content/>}
            </div>*/}

            <Layout className="layout">
                <MyHeader/>
                <Layout style={{ minHeight: '100vh' }}>
                    <Aside/>
                    {preloadValue ? <div className={styles.loaderWrapper}><Loader/></div> : <MyContent/>}
                </Layout>
            </Layout>
        </BrowserRouter>
    )
});

export default App;
