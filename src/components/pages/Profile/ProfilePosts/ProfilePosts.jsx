import React, {useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {userAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import PostItem from "./PostItem";

export const ProfilePosts = observer( () => {

    const {user} = useContext(Context);

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        const res = await userAPI.sendPost(data.postText);
        const newPosts = await userAPI.getPosts();
        user.setPosts(newPosts.posts)
    };

    useEffect(()=>{
       userAPI.getPosts().then(res => {
           user.setPosts(res.posts);
       })
    }, []);

    const userPosts = user.posts;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register("postText")}></textarea>
                <input type="submit"/>
            </form>
            <div>
                {userPosts.map(p => <PostItem key={p.post_id} postId={p.post_id} text={p.post_text}/>)}
            </div>
        </div>
    )
});