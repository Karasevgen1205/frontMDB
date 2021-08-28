import React, {useContext} from 'react';
import style from './PostItem.module.css'
import {userAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";

const PostItem = (props) => {

    const {user} = useContext(Context);

    const deletePost = async (postId) => {
        try {
            let response = await userAPI.deletePost(postId);
            const newPosts = await userAPI.getPosts();
            user.setPosts(newPosts.posts);
            return response
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className={style.post}>
            <button onClick={ async () => { await deletePost(props.postId)}}>delete</button>
            <p>{props.text}</p>
        </div>
    );
};

export default PostItem;