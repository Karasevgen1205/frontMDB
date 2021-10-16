import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {profileAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import PostItem from "./PostItem";
import {Button, Form, Input} from "antd";

export const ProfilePosts = observer(() => {

    const {profile} = useContext(Context);
    const avatar = profile.avaUrl;
    const userName = profile.userName;

    const {register, handleSubmit} = useForm();
    const [form] = Form.useForm();


    const onSubmit = async (data) => {
        await profileAPI.sendPost(data.postText);
        const newPosts = await profileAPI.getPosts();
        profile.setPosts(newPosts.posts)
    };

    useEffect(() => {
        profileAPI.getPosts().then(res => {
            profile.setPosts(res.posts);
        })
    }, []);

    const userPosts = profile.posts;
    console.log(userPosts)
    const postsSort = userPosts.slice().sort(function(a, b) {
        return b.post_id - a.post_id;
    });

    return (
        <div>
            <Form
                form={form}
                name="normal_login"
                onFinish={handleSubmit(onSubmit)}
            >
                <Form.Item
                    name="postText"
                >
                    <Input  size="large" {...register("postText")}/>
                </Form.Item>
                <Form.Item>
                    <Button onClick={form.setFieldsValue({ postText: '' })} size="large" shape="round" type="primary" htmlType="submit" className="login-form-button">
                        Send
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {postsSort.map(p => <PostItem key={p.post_id} userName={userName} avatar={avatar} postId={p.post_id} text={p.post_text}/>)}
            </div>
        </div>
    )
})