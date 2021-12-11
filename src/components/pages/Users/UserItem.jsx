import React, {useContext} from 'react';
import defaultAvatar from '../../../assets/images/noAvatar.png';
import style from "./UserItem.module.css";
import {observer} from "mobx-react-lite";
import {URL_AVA, userAPI} from "../../../DAL/API";
import {Context} from "../../../index";
import {Button, Comment} from "antd";

const UserItem = observer((props) => {

    const {users} = useContext(Context);

    let idFriend = props.id;

    const follow = async () => {
        try {
            let response = await userAPI.follow(idFriend);
            let allUsers = await userAPI.getUsers();
            users.setUsers(allUsers.data.allUsers);
            return console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    };
    const unfollow = async () => {
        try {
            let response = await userAPI.unfollow(idFriend);
            let allUsers = await userAPI.getUsers();
            users.setUsers(allUsers.data.allUsers);
            return console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className={style.wrapper}>

            <Comment
                author={<a style={{fontSize: 28}}>{props.userName}</a>}
                avatar={
                    <img src={props.avaUrl === "none" ? defaultAvatar : URL_AVA + props.avaUrl} alt="avatar" style={{width: '80px', height: '80px'}}/>
                }
                content={
                    <>
                        {props.isFriend === 0
                            ? <Button size="large" shape="round" type="primary" onClick={follow}>Follow</Button>
                            : <Button size="large" shape="round" type="primary" onClick={unfollow}>UnFollow</Button>}
                    </>
                }
            />
        </div>
    );
});

export default UserItem;