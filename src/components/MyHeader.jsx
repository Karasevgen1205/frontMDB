import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {authAPI} from "../DAL/API";
import {Layout, Row, Col, Button} from 'antd';

const {Header} = Layout;

export const MyHeader = observer(() => {


    const {profile} = useContext(Context);

    const logOut = async () => {
        try {
            await authAPI.logout();
            profile.setIsAuth(false)
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Header className="header">
            <div className="logo"/>
            <Row justify="end">
                {profile.isAuth
                    ?
                    <Col span={1}>
                        <Button danger shape="round" type="primary" onClick={logOut}>Log Out</Button>
                    </Col>
                    :
                    <>
                        <Col span={1}>
                            <NavLink to='/register'>
                                <Button shape="round" type="primary">Register</Button>
                            </NavLink>
                        </Col>
                        <Col span={1} offset={1}>
                            <NavLink to='/login'>
                                <Button shape="round" type="primary">Log In</Button>
                            </NavLink>
                        </Col>
                    </>}
            </Row>
        </Header>
    )
});