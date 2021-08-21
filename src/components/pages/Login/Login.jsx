import React from "react";
import {useForm} from "react-hook-form";
import styles from "./Login.module.css"

export const Login = () => {

    const {register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data)

    return (
        <div>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <input className={styles.input} placeholder="Email" {...register("email")} />
                    <br/>
                    <input className={styles.input} placeholder="Password" type="password" {...register("password")}/>
                    <br/>
                    <input className={styles.btnBlue} type="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
}