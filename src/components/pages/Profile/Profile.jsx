import React from "react";
import {ProfileAvaStatus} from "./ProfileAvaStatus/ProfileAvaStatus";
import {ProfilePosts} from "./ProfilePosts/ProfilePosts";


export const Profile = () => {

    return (
        <div>
            <ProfileAvaStatus/>
            <ProfilePosts/>
        </div>
    )
}