import React, {useContext, useState} from 'react';
import style from './PostItem.module.css'
import {profileAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";

const PostItem = (props) => {

    const {user} = useContext(Context);
    const [editValue, setEditValue] = useState(false);
    const [areaText, setAreaText] = useState(props.text);

    const onEditMenu = () => {
        setEditValue(true)
    };
    const offEditMenu = () => {
        setEditValue(false)
    };

    const getPosts = async () => {
        const newPosts = await profileAPI.getPosts();
        user.setPosts(newPosts.posts);
    };
    const deletePost = async (postId) => {
        try {
            let response = await profileAPI.deletePost(postId);
            await getPosts();
            return response
        } catch (e) {
            console.log(e)
        }
    };
    const updatePost = async (postId, postText) => {
        try{
            let response = await profileAPI.updatePost(postId, postText);
            offEditMenu();
            await getPosts();
            return response
        } catch(e) {

        }
    };

    return (
        <div className={style.post}>
            {!editValue ? <>
                    <button onClick={onEditMenu}>edit</button>
                    <button onClick={async () => {
                        await deletePost(props.postId)
                    }}>delete
                    </button>
                    <p>{props.text}</p>
                </>
                :
                <>
                    <button onClick={async () => {
                        await updatePost(props.postId, areaText)
                    }}>Confirm</button>
                    <button onClick={offEditMenu}>Cancel</button>
                    <textarea onChange={(e) => setAreaText(e.currentTarget.value)} value={areaText}></textarea>
                </>
            }
        </div>
    );
};

export default PostItem;