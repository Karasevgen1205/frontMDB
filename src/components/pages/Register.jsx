import React from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {registration} from "../../redux/auth-reducer";

export const Register = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => dispatch(registration(data.email, data.password));

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} />
                <input type="password" {...register("password")}/>
                <input type="submit" value="register" />
            </form>
            <p>Register is success. Log in.</p>
        </div>
    )
}