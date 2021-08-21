import React from "react";
import {useForm} from "react-hook-form";

export const ProfilePosts = () => {


    const {register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data)

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register("postText")}></textarea>
                <input type="submit"/>
            </form>
        </div>
    )
};