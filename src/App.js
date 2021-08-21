import React from "react";
import styles from "./App.module.css"
import {Header} from "./components/Header";
import {Aside} from "./components/Aside";
import {Content} from "./components/Content";
import {BrowserRouter} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <div className={styles.globalWrapper}>
                <Header/>
                <Aside/>
                <Content/>
            </div>
        </BrowserRouter>
    )
}

export default App;
