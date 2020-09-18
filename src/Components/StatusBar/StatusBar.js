import React from "react";
import { Avatar, Dropdown, Menu, Badge, Divider, Tooltip, Drawer, Space } from "antd";
import {
    DownOutlined,
    LogoutOutlined,
    ProfileOutlined,
    BellOutlined,
    QuestionCircleOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useHistory} from "react-router-dom";

import Logs from "./Logs";


export default () => {
    const user = {email: 'neri@emeraldigital.com'};
    const [visible, setVisible] = React.useState(false);

    const history = useHistory();

    function handleSignOut() {
        history.push('/');
    }

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <div className={'status-bar'}>

            <span className={'status-bar-button-icon'}>
                <Space>
                    <QuestionCircleOutlined style={{'fontSize': 18}}/>

                    <Tooltip title={'Ver notificaciones'}>
                        <Badge dot>
                            <BellOutlined onClick={showDrawer} style={{'fontSize': 18}}/>
                        </Badge>
                    </Tooltip>
                </Space>
            </span>
            <Divider type={'vertical'}/>
            <Avatar src={'https://firebasestorage.googleapis.com/v0/b/emerald-digital-home.appspot.com/o/faustino-neri-600x600.jpeg?alt=media&token=812cff72-3368-485a-8ed5-6f748dfb077d'} />
            <Dropdown overlay={
                <Menu>
                    <Menu.Item>
                        <UserOutlined />
                        <span>Mi perfil</span>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item onClick={handleSignOut}>
                        <LogoutOutlined />
                        <span>Salir</span>
                    </Menu.Item>
                </Menu>
            }>
                <a className={'status-bar-user-name'} onClick={e => e.preventDefault()}>
                    {user.email} <DownOutlined />
                </a>
            </Dropdown>

            <Drawer
                title={'Notificaciones'}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={480}
            >
                <Logs />
            </Drawer>
        </div>
    )
}
