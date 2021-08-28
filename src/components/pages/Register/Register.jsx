import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./Register.module.css"
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {authAPI} from "../../../DAL/API";

export const Register = observer( () => {

    const {user} = useContext(Context);

    const {register, handleSubmit, reset} = useForm();
    const onSubmit = async (data) => {
        try{
            user.setPreload(true);
            const response = await authAPI.register(data.email, data.password, data.user_name);
            reset();
            user.setIsReg(true);
            user.setPreload(false);
        } catch(e) {
            user.setPreload(false);
            console.log(e)
        }

    };

    return (
        <div>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <input className={styles.input} placeholder="Email" {...register("email")} />
                    <br/>
                    <input className={styles.input} placeholder="NickName" {...register("user_name")} />
                    <br/>
                    <input className={styles.input} placeholder="Password" type="password" {...register("password")}/>
                    <br/>
                    <input className={styles.btnBlue} type="submit" value="Register"/>
                    {user.isReg && <p>Register is Success. Now log in</p>}
                </form>
            </div>
        </div>
    )
});