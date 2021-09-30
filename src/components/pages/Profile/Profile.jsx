import React from "react";
import {ProfileAvaStatus} from "./ProfileAvaStatus/ProfileAvaStatus";
import {ProfilePosts} from "./ProfilePosts/ProfilePosts";
import {Layout} from "antd";


export const Profile = () => {

    return (
        <Layout>
            <ProfileAvaStatus/>
            <ProfilePosts/>
        </Layout>
    )
}