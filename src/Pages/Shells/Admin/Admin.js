import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DashboardOutlined,
    SettingOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import StatusBar from "../../../Components/StatusBar";
import Footer from "../../../Components/Footer";
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
                        <Menu.Item key={'/chart-builder'}>
                            Editor
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
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',

                        minHeight: 280,
                    }}
                >
                    <ChartBuilder />
                </Content>

                <Footer />

            </Layout>
        </Layout>
    )
}
