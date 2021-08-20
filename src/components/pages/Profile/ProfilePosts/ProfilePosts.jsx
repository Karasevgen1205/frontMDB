import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {sendPost} from "../../../../redux/profile-reducer";


export const ProfilePosts = () => {

    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const onSubmit = data => dispatch(sendPost(data.postText));

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register("postText")}></textarea>
                <input type="submit"/>
            </form>
        </div>
    )
};