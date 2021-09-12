import React, {useContext} from "react";
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {authAPI} from "../DAL/API";

export const Header = observer(() => {

    const {profile} = useContext(Context);

    const logOut = async () => {
        try {
            const response = await authAPI.logout();
            profile.setIsAuth(false)
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className={style.headerWrapper}>
            <div className={style.leftSide}>
                <p>Test SPA</p>
            </div>
            <div className={style.rightSide}>
                {profile.isAuth ? <button className={style.btnRed} onClick={logOut}>LogOut</button> :
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
});