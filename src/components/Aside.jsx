import React from "react";
import {NavLink} from "react-router-dom";
import {Layout, Menu} from 'antd';
import {UserOutlined, UsergroupAddOutlined, MessageOutlined} from '@ant-design/icons';

export const Aside = () => {

    const {Sider} = Layout;

    return (
        <Sider theme="light">
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined/>}>
                    <NavLink a="true" to='/profile'>My profile</NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
                    <NavLink a="true" to='/users'>Users</NavLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<MessageOutlined />}>
                    <NavLink a="true" to='/dialogs'>Public Chat</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    )
};