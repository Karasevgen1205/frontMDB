import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";
import {Context} from "../../index";

const AppRouter = () => {

    const {user} = useContext(Context);

    return (
        <Switch>
            <Redirect exact from="/" to="/profile" />
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exect/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exect/>
            )}
            <Redirect to="/login"/>
        </Switch>
    );
};

export default AppRouter;