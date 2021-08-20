import React from "react";
import {useSelector} from "react-redux";
import {getIsAuth, getPreloader} from "../../../redux/selectors";
import {Redirect} from "react-router-dom";
import {Loader} from "../../common/Loader";


export const Users = () => {

    let isAuth = useSelector(getIsAuth);
    let preload = useSelector(getPreloader);

/*    if (!isAuth) {
        return <Redirect to={"/login"}/>
    }*/

    return (
        <div>
            {preload ? <Loader/> :
                <p>Users</p>
            }
        </div>
    )
};