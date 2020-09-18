import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DashboardOutlined,
    WifiOutlined,
    ToolOutlined,
    SettingOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import StatusBar from "../../../Components/StatusBar";
import Footer from "../../../Components/Footer";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;


export default function () {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <Layout id={'components-admin-shell'} style={{ minHeight: '100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    <SubMenu key={'Console'} icon={<DashboardOutlined />} title={'Consola'}>
                        <Menu.Item key={'/live-tracking'}>
                            Seguimiento
                        </Menu.Item>
                        <Menu.Item key={'/live-data'}>
                            Datos en tiempo real
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key={'devices'} icon={<WifiOutlined />} title={'Dispositivos'}>
                        <Menu.Item key={'/coolers'}>
                            Enfriadores
                        </Menu.Item>

                        <Menu.Item key={'/device-viewer'}>
                            Detalle
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key={'maintenance'} icon={<ToolOutlined />} title={'Mantenimiento'}>
                        <Menu.Item key={'/maintenance-planner'}>
                            Planificación
                        </Menu.Item>

                        <Menu.Item key={'/maintenance-history'}>
                            Historial
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
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
                </Content>

                <Footer />

            </Layout>
        </Layout>
    )
}
