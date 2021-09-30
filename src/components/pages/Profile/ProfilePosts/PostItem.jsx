import React, {useContext, useState} from 'react';
import {profileAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Avatar, Button, Card, Form, Input} from "antd";

const PostItem = (props) => {

    const {profile} = useContext(Context);
    const [editValue, setEditValue] = useState(false);
    const [areaText, setAreaText] = useState(props.text);
    const { Meta } = Card;
    const { TextArea } = Input;

    const onEditMenu = () => {
        setEditValue(true)
    };
    const offEditMenu = () => {
        setEditValue(false)
    };

    const getPosts = async () => {
        const newPosts = await profileAPI.getPosts();
        profile.setPosts(newPosts.posts);
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
            console.log(e)
        }
    };


    return (
        <div >
            {!editValue ?
                <>
                    <Card
                        style={{ width: "100%" }}
                        actions={[
                            <EditOutlined onClick={onEditMenu} key="edit" />,
                            <DeleteOutlined onClick={async () => {
                                await deletePost(props.postId)
                            }} key="delete" />
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={props.avatar} />}
                            title={props.userName}
                            description={props.text}
                        />
                    </Card>
                    <br/>
                </>
                :
                <>
                    <TextArea value={areaText} allowClear onChange={(e) => setAreaText(e.currentTarget.value)} />
                    <Button
                        onClick={async () => {await updatePost(props.postId, areaText)}}
                            size="large" shape="round" type="primary" htmlType="submit" className="login-form-button">
                        Confirm
                    </Button>
                    <Button
                        onClick={offEditMenu}
                        size="large" shape="round" type="primary" htmlType="submit" className="login-form-button">
                        Cancel
                    </Button>
                </>
            }
        </div>
    );
};

export default PostItem;