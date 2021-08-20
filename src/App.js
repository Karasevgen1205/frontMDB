import React, {useEffect} from "react";
import styles from "./App.module.css"
import {Header} from "./components/Header";
import {Aside} from "./components/Aside";
import {Content} from "./components/Content";
import {useDispatch} from "react-redux";
import {checkAuth} from "./redux/auth-reducer";
import {BrowserRouter} from "react-router-dom";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(checkAuth())
        }
    }, []);

    return (
        <BrowserRouter>
            <div className={styles.globalWrapper}>
                <Header/>
                <Aside/>
                <Content/>
            </div>
        </BrowserRouter>

    );
}

export default App;
