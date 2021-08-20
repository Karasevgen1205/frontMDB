import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {registration} from "../../../redux/auth-reducer";
import {getIsAuth, getPreloader} from "../../../redux/selectors";
import {Redirect} from "react-router-dom";
import {Loader} from "../../common/Loader";
import styles from "./Register.module.css"

export const Register = () => {

    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const onSubmit = data => dispatch(registration(data.email, data.password, data.user_name));

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
                        <input className={styles.input} placeholder="Email" {...register("email")} />
                        <br/>
                        <input className={styles.input} placeholder="NickName" {...register("user_name")} />
                        <br/>
                        <input className={styles.input} placeholder="Password" type="password" {...register("password")}/>
                        <br/>
                        <input className={styles.btnBlue} type="submit" value="Register"/>
                    </form>
                </div>
            }
        </div>
    )
}