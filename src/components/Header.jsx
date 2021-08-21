import React, {useContext} from "react";
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {Context} from "../index";

export const Header = () => {

    const {user} = useContext(Context);

    return (
        <div className={style.headerWrapper}>
            <div className={style.leftSide}>
                <p>Test SPA</p>
            </div>
            <div className={style.rightSide}>
            { user.isAuth ?  <button className={style.btnRed}>LogOut</button> :
                <>
                <NavLink to='/register'>
                    <button className={style.btnRed}>Register</button>
                </NavLink>
                <NavLink to='/login'>
                    <button className={style.btnRed}>LogIn</button>
                </NavLink>
                </>}
            </div>
        </div>
    )
};