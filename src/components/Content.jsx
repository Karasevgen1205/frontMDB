import React from "react";
import styles from "./Content.module.css"
import {Register} from "./pages/Register";
import {useSelector} from "react-redux";
import {getIsAuth} from "../redux/selectors";



export const Content = () => {

    let isAuth = useSelector(getIsAuth)

    return (
        <div className={styles.contentWrapper}>
            <Register/>
        </div>
    )
};