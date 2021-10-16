import React, {useContext, useEffect, useMemo, useState} from "react";
import {userAPI} from "../../../DAL/API";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {Loader} from "../../common/Loader";
import UserItem from "./UserItem";
import {Input} from "antd";

export const Users = observer(() => {

    const {users} = useContext(Context);
    const [preloadValue, setPreloadValue] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setPreloadValue(true)
        userAPI.getUsers().then(res => {
            users.setUsers(res.data.allUsers);
            setPreloadValue(false);
        }).finally(() => {
            setPreloadValue(false)
        })
    }, []);


    const searchedUsers = useMemo(() => {
        return users.users.filter(user => user.user_name.toLowerCase().includes(searchValue.toLowerCase()))
    }, [searchValue, users]);

    return (
        <div>
            <p>Users</p>
            <Input size="large" value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)} placeholder="enter the name"/>
            {preloadValue ? <Loader/> :
                searchedUsers.map(u => <UserItem
                    key={u.email}
                    isFriend={u.isFriend}
                    id={u.user_id}
                    avaUrl={u.file_name}
                    userName={u.user_name}
                    email={u.email}/>)}
        </div>
    )
});