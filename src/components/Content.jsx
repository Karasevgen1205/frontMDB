import React from "react";
import styles from "./Content.module.css";
import AppRouter from "./routes/AppRouter";

export const Content = () => {

    return (
            <div className={styles.contentWrapper}>
                <AppRouter/>
            </div>
    )
};