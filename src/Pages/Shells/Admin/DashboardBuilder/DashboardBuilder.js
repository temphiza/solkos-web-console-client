import React from "react";
import {Layout} from 'antd';
import Dashboard from "./Dashboard";
import Toolbar from "./Toolbar";
import {StateProvider} from "./store";

const { Content } = Layout;


export default function () {
    return (
        <StateProvider>
            <Layout style={{height: '100%'}}>
                <Toolbar />
                <Content>
                    <Dashboard/>
                </Content>
            </Layout>
        </StateProvider>
    )
}
