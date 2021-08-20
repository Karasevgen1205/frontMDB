import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {login} from "../../../redux/auth-reducer";
import {getIsAuth, getPreloader} from "../../../redux/selectors";
import {Redirect} from "react-router-dom";
import {Loader} from "../../common/Loader";
import styles from "./Login.module.css"

export const Login = () => {

    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const onSubmit = data => dispatch(login(data.email, data.password));

    let isAuth = useSelector(getIsAuth);
    let preload = useSelector(getPreloader);

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            {preload ? <Loader/> :
                <div className={styles.wrapper}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <input className={styles.input} {...register("email")} />
                        <br/>
                        <input className={styles.input} type="password" {...register("password")}/>
                        <br/>
                        <input className={styles.btnBlue} type="submit" value="Login"/>
                    </form>
                </div>
            }
        </div>
    )
}