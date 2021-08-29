import React, {useContext, useEffect, useState} from "react";
import {userAPI} from "../../../DAL/API";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {Loader} from "../../common/Loader";
import UserItem from "./UserItem";

export const Users = observer(() => {

    const {user} = useContext(Context);

    const getUsers = async () => {
        return await userAPI.getUsers()
    };

    useEffect(() => {
        user.setPreload(true)
        getUsers().then(res => {
            user.setUsers(res.data.users);
            user.setPreload(false);
        }).finally(() => {
            user.setPreload(false)
        })
    }, []);

    const allUsers = user.users;

    return (
        <div>
            <p>Users</p>
            {allUsers.map(u => <UserItem key={u.email} avaUrl={u.file_name} userName={u.user_name} email={u.email}/>)}
        </div>
    )
});