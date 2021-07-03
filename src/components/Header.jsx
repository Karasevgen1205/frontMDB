import React from "react";
import style from "./Header.module.css"
import {useSelector} from "react-redux";
import {getIsAuth} from "../redux/selectors";

export const Header = () => {

    let isAuth = useSelector(getIsAuth);

    return (
        <div className={style.headerWrapper}>
            <div className={style.leftSide}>
                <p>Site name</p>
            </div>
            <div className={style.rightSide}>
                {isAuth ?<button>LogOut</button> : null}
            </div>
        </div>
    )
};