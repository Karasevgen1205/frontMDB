import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from "./ProfileAvaStatus.module.css"
import {getProfileData, uploadAvatar} from "../../../../redux/profile-reducer";
import {getAvatarUrl} from "../../../../redux/selectors";


export const ProfileAvaStatus = () => {

/*    const dispatch = useDispatch();

    const uplAva = (profileImg) => {
        dispatch(uploadAvatar(profileImg))
    };

    const avatarSelected = (e) => {
        if (e.target.files.length) {
            uplAva(e.target.files[0])
        }
    };*/

    return (
        <div>
            <p>Hello </p>
            <div >
                <img className={style.ava}/>
            </div>
            <input type="file" name="profileImg"/>
        </div>
    )
};