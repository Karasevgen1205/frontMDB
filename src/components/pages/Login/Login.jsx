import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./Login.module.css";
import {Context} from "../../../index";
import {authAPI} from "../../../DAL/API";
import {Redirect} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Loader} from "../../common/Loader";

export const Login = observer( () => {

    const {profile} = useContext(Context);

    const {register, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        try{
            profile.setPreload(true);
            const response = await authAPI.login(data.email, data.password);
            profile.setIsAuth(true);
            profile.setPreload(false);
        } catch(e) {
            profile.setPreload(false);
            console.log(e)
        }

    };

    if (profile.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            {profile.preload ? <Loader/> :
                <div className={styles.wrapper}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <input className={styles.input} placeholder="Email" {...register("email")} />
                        <br/>
                        <input className={styles.input} placeholder="Password"
                               type="password" {...register("password")}/>
                        <br/>
                        <input className={styles.btnBlue} type="submit" value="Login"/>
                    </form>
                </div>
            }
        </div>
    )
});