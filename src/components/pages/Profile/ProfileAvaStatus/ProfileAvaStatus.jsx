import React, {useContext, useEffect} from "react";
import style from "./ProfileAvaStatus.module.css";
import {userAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";


export const ProfileAvaStatus = observer(() => {

    const {user} = useContext(Context);
    const userName = user.userName;
    const avatar = user.avaUrl;

    const uplAva = async (profileImg) => {
        try {
            let response = await userAPI.uploadAvatar(profileImg);
            return response.data
        } catch (e) {
            console.log(e)
        }
    };

    const avatarSelected = (e) => {
        if (e.target.files.length) {
            uplAva(e.target.files[0]).then(r => {
                user.setAvaUrl(r.avaUrl)
            })
        }
    };

    const getProfileData = async () => {
        return await userAPI.getProfileData()
    };

    useEffect(() => {
        user.setPreload(true);
        getProfileData().then(res => {
            user.setAvaUrl(res.data.avaUrl);
            user.setUserName(res.data.userName);
            user.setPreload(false);
        }).finally(user.setPreload(false))
    }, []);

    return (
        <div>
            <p>Hello {userName}</p>
            <div>
                <img src={avatar} className={style.ava}/>
            </div>
            <input onChange={avatarSelected} type="file" name="profileImg"/>
        </div>
    )
});