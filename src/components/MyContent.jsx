import React from "react";
import AppRouter from "./routes/AppRouter";
import {Layout} from "antd";

export const MyContent = () => {

    const { Content} = Layout;

    return (
            <Layout >
                <Content style={{ padding: '10px 50px' }}>
                    <div className="site-layout-content">
                        <AppRouter/>
                    </div>
                </Content>
            </Layout>
    )
};