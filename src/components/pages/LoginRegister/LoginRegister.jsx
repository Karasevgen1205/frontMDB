import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./LoginRegister.module.css"
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {authAPI} from "../../../DAL/API";
import {Redirect, useLocation} from "react-router-dom";

export const LoginRegister = observer(() => {

    const {profile} = useContext(Context);
    const location = useLocation().pathname;

    const {register, handleSubmit, reset} = useForm();
    const onSubmitReg = async (data) => {
        try {
            profile.setPreload(true);
            if (location === "/login") {
                await authAPI.login(data.email, data.password);
                profile.setIsAuth(true);
            }
            if (location === "/register") {
                await authAPI.register(data.email, data.password, data.user_name);
                profile.setIsReg(true);
            }
            reset();
            profile.setPreload(false);
        } catch (e) {
            profile.setPreload(false);
            console.log(e)
        }
    };

    if (profile.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmitReg)}>
                    <input className={styles.input} placeholder="Email" {...register("email")} />
                    <br/>

                    {location === "/register" && <> <input className={styles.input}
                                                           placeholder="NickName" {...register("user_name")} />
                        <br/> </>}

                    <input className={styles.input} placeholder="Password" type="password" {...register("password")}/>
                    <br/>

                    <input className={styles.btnBlue} type="submit"
                           value={location === "/register" ? "Register" : "Login"}/>

                    {profile.isReg && <p>Register is Success. Now log in</p>}
                </form>
            </div>
        </div>
    )
});