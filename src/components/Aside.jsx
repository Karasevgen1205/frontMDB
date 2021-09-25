import React from "react";
import styles from "./Aside.module.css"
import {NavLink} from "react-router-dom";

export const Aside = () => {
    return (
        <aside className={styles.asideWrapper}>
            <NavLink className={styles.menuBtn} a="true" to='/profile'>My profile</NavLink>
            <NavLink className={styles.menuBtn} a="true" to='/users'>Users</NavLink>
            <NavLink className={styles.menuBtn} a="true" to='/dialogs'>Public Chat</NavLink>
        </aside>
    )
};