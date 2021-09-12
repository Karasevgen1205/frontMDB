import React, {useContext, useEffect} from 'react';
import defaultAvatar from '../../../assets/images/noAvatar.png';
import style from "./UserItem.module.css";
import styles from "../Register/Register.module.css";
import {observer} from "mobx-react-lite";
import {URL_AVA, userAPI} from "../../../DAL/API";
import {Context} from "../../../index";

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
            <p>{props.userName}</p>
            <img className={style.userAva} src={props.avaUrl === "none" ? defaultAvatar : URL_AVA+props.avaUrl} alt="avatar"/>
            {props.isFriend == 0 ? <input className={styles.btnBlue} onClick={follow} type="submit" value="Follow"/> :
            <input className={styles.btnBlue} onClick={unfollow} type="submit" value="UnFollow"/>}
        </div>
    );
});

export default UserItem;