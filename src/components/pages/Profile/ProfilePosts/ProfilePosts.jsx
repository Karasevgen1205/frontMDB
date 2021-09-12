import React, {useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {profileAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import PostItem from "./PostItem";

export const ProfilePosts = observer( () => {

    const {profile} = useContext(Context);

    const {register, handleSubmit, reset} = useForm();

    const onSubmit = async (data) => {
        const res = await profileAPI.sendPost(data.postText);
        reset()
        const newPosts = await profileAPI.getPosts();
        profile.setPosts(newPosts.posts)
    };

    useEffect(()=>{
       profileAPI.getPosts().then(res => {
           profile.setPosts(res.posts);
       })
    }, []);

    const userPosts = profile.posts;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register("postText")}></textarea>
                <input type="submit" value="Send Post"/>
            </form>
            <div>
                {userPosts.map(p => <PostItem key={p.post_id} postId={p.post_id} text={p.post_text}/>)}
            </div>
        </div>
    )
});