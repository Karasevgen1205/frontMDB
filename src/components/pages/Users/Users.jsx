import React, {useContext, useEffect, useState} from "react";
import {userAPI} from "../../../DAL/API";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {Loader} from "../../common/Loader";
import UserItem from "./UserItem";

export const Users = observer(() => {

    const {users} = useContext(Context);
    const [preloadValue, setPreloadValue] = useState(false);

    useEffect(() => {
        setPreloadValue(true)
        userAPI.getUsers().then(res => {
            users.setUsers(res.data.allUsers);
            setPreloadValue(false);
        }).finally(() => {
            setPreloadValue(false)
        })
    }, []);

    return (
        <div>
            <p>Users</p>
            <input placeholder="enter the name" type="text"/>
            {preloadValue ? <Loader/> :
                users.users.map(u => <UserItem
                    key={u.email}
                    isFriend={u.isFriend}
                    id={u.user_id}
                    avaUrl={u.file_name}
                    userName={u.user_name}
                    email={u.email}/>)}
        </div>
    )
});