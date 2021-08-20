import React from "react";
import styles from "./Content.module.css"
import {Login} from "./pages/Login/Login";
import {Redirect, Route, Switch} from "react-router-dom";
import {Profile} from "./pages/Profile/Profile";
import {Users} from "./pages/Users/Users";
import {Register} from "./pages/Register/Register";

export const Content = () => {

    return (
            <div className={styles.contentWrapper}>
                <Switch>
                    <Redirect exact from="/" to="/profile" />
                    <Route path="/register">
                        <Register/>
                    </Route>
                   <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                </Switch>
            </div>
    )
};