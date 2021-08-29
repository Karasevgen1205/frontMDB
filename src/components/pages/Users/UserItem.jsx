import React from 'react';
import defaultAvatar from '../../../assets/images/noAvatar.png';
import style from "./UserItem.module.css"
import {URL_AVA} from "../../../DAL/API";

const UserItem = (props) => {
    return (
        <div className={style.wrapper}>
            <p>{props.userName}</p>
            <img className={style.userAva} src={props.avaUrl === "none" ? defaultAvatar : URL_AVA+props.avaUrl} alt="avatar"/>
        </div>
    );
};

export default UserItem;