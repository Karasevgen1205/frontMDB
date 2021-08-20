import React from "react";
import style from "./Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth} from "../redux/selectors";
import {logout} from "../redux/auth-reducer";
import {NavLink} from "react-router-dom";

export const Header = () => {

    let isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logout())
    };

    return (
        <div className={style.headerWrapper}>
            <div className={style.leftSide}>
                <p>Test SPA</p>
            </div>
            <div className={style.rightSide}>
                {isAuth ? <button className={style.btnRed} onClick={logOut}>LogOut</button>
                    : <>
                        <NavLink to='/register'>
                            <button className={style.btnRed} >Register</button>
                        </NavLink>
                        <NavLink to='/login'>
                            <button className={style.btnRed} >LogIn</button>
                        </NavLink>
                    </>}
            </div>
        </div>
    )
};