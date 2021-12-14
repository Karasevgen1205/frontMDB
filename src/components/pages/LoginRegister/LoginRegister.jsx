import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./LoginRegister.module.css"
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {authAPI} from "../../../DAL/API";
import {Redirect, useLocation} from "react-router-dom";
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

export const LoginRegister = observer(() => {

    const {profile} = useContext(Context);
    const location = useLocation().pathname;

    const {register, handleSubmit, reset} = useForm();
    const onSubmitReg = async (data) => {
        try {
            profile.setPreload(true);
            if (location === "/login") {
                await authAPI.login(data.email, data.password);
                profile.setIsAuth(true);
            }
            if (location === "/register") {
                await authAPI.register(data.email, data.password, data.user_name);
                profile.setIsReg(true);
            }
            reset();
            profile.setPreload(false);
        } catch (e) {
            profile.setPreload(false);
            console.log(e)
        }
    };

    if (profile.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (

        <div className={styles.wrapper}>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={handleSubmit(onSubmitReg)}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input {...register("email")} prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="Email"/>
                </Form.Item>

                {location === "/register" &&
                <Form.Item
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input {...register("user_name")} prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="Username"/>
                </Form.Item>}

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                </Form.Item>
                <Form.Item>
                    <Button size="large" shape="round" type="primary" htmlType="submit" className="login-form-button">
                        {location === "/register" ? "Register" : "Log In"}
                    </Button>
                </Form.Item>
                {profile.isReg && <p style={{color: "green"}}>Register is Success. Now log in</p>}
            </Form>
        </div>
    )
});