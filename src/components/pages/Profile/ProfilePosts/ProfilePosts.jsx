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

    const {register, handleSubmit, reset} = useForm();
    const [form] = Form.useForm();


    const onSubmit = async (data) => {
        const res = await profileAPI.sendPost(data.postText);
        const newPosts = await profileAPI.getPosts();
        profile.setPosts(newPosts.posts)
    };
    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        profileAPI.getPosts().then(res => {
            profile.setPosts(res.posts);
        })
    }, []);

    const userPosts = profile.posts;

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
                    <Input size="large" {...register("postText")}/>
                </Form.Item>
                <Form.Item>
                    <Button onClick={onReset} size="large" shape="round" type="primary" htmlType="submit" className="login-form-button">
                        Send
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {userPosts.map(p => <PostItem key={p.post_id} userName={userName} avatar={avatar} postId={p.post_id} text={p.post_text}/>)}
            </div>
        </div>
    )
});