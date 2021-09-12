import React, {useContext, useEffect} from "react";
import style from "./ProfileAvaStatus.module.css";
import {profileAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {Loader} from "../../../common/Loader";


export const ProfileAvaStatus = observer(() => {

    const {profile} = useContext(Context);
    const userName = profile.userName;
    const avatar = profile.avaUrl;

    const uplAva = async (profileImg) => {
        try {
            let response = await profileAPI.uploadAvatar(profileImg);
            return response.data
        } catch (e) {
            console.log(e)
        }
    };

    const avatarSelected = (e) => {
        if (e.target.files.length) {
            uplAva(e.target.files[0]).then(r => {
                profile.setAvaUrl(r.avaUrl)
            })
        }
    };

    const getProfileData = async () => {
        return await profileAPI.getProfileData()
    };

    useEffect(() => {
        profile.setPreload(true);
        getProfileData().then(res => {
            profile.setAvaUrl(res.data.avaUrl);
            profile.setUserName(res.data.userName);
            profile.setPreload(false);
        }).finally(profile.setPreload(false))
    }, []);

    return (
        <div>
            <p>Hello {userName}</p>
            {profile.preload ? <Loader/> :
                <>
                    <div>
                        <img src={avatar} className={style.ava}/>
                    </div>
                    <input onChange={avatarSelected} type="file" name="profileImg"/>
                </>
            }
        </div>
    )
});