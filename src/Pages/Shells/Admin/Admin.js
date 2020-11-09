import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import { Switch, Route, Link } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DashboardOutlined,
    SettingOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import StatusBar from "../../../Components/StatusBar";
import Footer from "../../../Components/Footer";

import DashboardBuilder from "./DashboardBuilder";
import ChartBuilder from "./ChartBuilder";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;


export default function () {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <Layout id={'components-admin-shell'} style={{ minHeight: '100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    <SubMenu key={'console'} icon={<DashboardOutlined />} title={'Tablero'}>
                        <Menu.Item key={'/dashboard-builder'}>
                            <Link to={'/builder'}>Editor</Link>
                        </Menu.Item>

                        <Menu.Item key={'/chart-builder'}>
                            <Link to={'/builder'}>Editor</Link>
                        </Menu.Item>

                        <Menu.Item key={'/dashboard-list'}>
                            Listado
                        </Menu.Item>

                    </SubMenu>

                    <Menu.Divider />

                    <SubMenu key={'settings'} icon={<SettingOutlined />} title={'Configuración'}>
                        <Menu.Item key={'/my-profile'}>
                            Mi perfil
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key={'/help'} icon={<QuestionCircleOutlined />}>
                        Ayuda
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Row type={'flex'}>
                        <Col xs={4}>
                            {
                                React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                })
                            }
                        </Col>
                        <Col xs={20}>
                            <StatusBar />
                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        minHeight: 280,
                    }}>
                    <Switch>
                        <Route path={'/builder'} >
                            <ChartBuilder />
                        </Route>
                    </Switch>
                </Content>

                <Footer />

            </Layout>
        </Layout>
    )
}
