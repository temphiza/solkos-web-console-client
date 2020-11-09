import React, {useContext} from "react";
import {Layout, Menu, Modal, Input, message} from "antd";
import {
    FolderOpenOutlined,
    BarChartOutlined,
    FilterOutlined,
    FieldStringOutlined,
    PictureOutlined,
    LineOutlined,
    FunctionOutlined,
    FormatPainterOutlined,
    LayoutOutlined,
    SaveOutlined,
    ControlOutlined
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import DashboardList from "./Dashboard/DashboardList";

import {SET_FILE_NAME, ADD_ITEM, SAVE_DASHBOARD, store} from "./store";


const { Sider } = Layout;


function SaveModal({visible, onClose}) {
    const [{ fileName }, dispatch] = useContext(store);
    const [nextVisible, setVisible] = React.useState(false);
    const [nextFileName, setFileName] = React.useState(fileName);

    React.useEffect(() => setVisible(visible), [visible]);

    function handleClose() {
        if(onClose) {
            onClose();
        }

        setVisible(false);
    }

    function handleSave(){
        dispatch({type: SET_FILE_NAME, fileName: nextFileName});
        message.success(`Tablero ${nextFileName} creado correctamente.`);
        handleClose();
    }

    return (
        <Modal
            onOk={handleSave}
            onCancel={handleClose}
            visible={nextVisible}
            title={'Guardar'}>
            <Input
                value={nextFileName}
                onChange={({target: { value }}) => setFileName(value)}/>
        </Modal>
    )
}


export default function () {
    const [showSaveModal, setShowSaveModal] = React.useState(false);
    const [{fileName, id: dashboardId, items}, dispatch] = useContext(store);
    const [showDashboardList, setShowDashboardList] = React.useState(false);

    function handleAddTestItem() {
        dispatch({
            type: ADD_ITEM,
            item: {
                id: uuidv4()
            }
        });
    }

    function handleSave(){
        if (!!dashboardId) {
            dispatch({
                type: SAVE_DASHBOARD
            });

            message.success(`Tablero ${fileName} guarado correctamente.`);
        }
        else {
            setShowSaveModal(true);
        }
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={true}
            width={60}
            style={{background: 'white', marginRight: 16}}>
            <Menu
                mode={'inline'}
                theme={'dark'}
                inlineCollapsed={true}
                selectable={false}
                style={{height: '100%'}}>
                <Menu.Item
                    key={'showDashboardList'}
                    icon={<FolderOpenOutlined />}
                    onClick={() => setShowDashboardList(true)}>
                    Abrir
                </Menu.Item>
                <Menu.Item
                    disabled={!dashboardId && _.isEmpty(items)}
                    key={'save'}
                    icon={<SaveOutlined />} onClick={handleSave}>
                    Guardar
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key={'addChart'} icon={<BarChartOutlined />} onClick={handleAddTestItem}>
                    Gráfico
                </Menu.Item>
                <Menu.Item key={'addFilter'} icon={<FilterOutlined />}>
                    Filtro
                </Menu.Item>
                <Menu.Item key={'addText'} icon={<FieldStringOutlined />}>
                    Texto
                </Menu.Item>
                <Menu.Item key={'addImage'} icon={<PictureOutlined />}>
                    Imagen
                </Menu.Item>
                <Menu.Item key={'addDivider'} icon={<LineOutlined />}>
                    Separador
                </Menu.Item>
                <Menu.Item key={'addButton'} icon={<FunctionOutlined />}>
                    Botón
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key={'addTheme'} icon={<FormatPainterOutlined />}>
                    Tema
                </Menu.Item>
                <Menu.Item key={'layout'} icon={<LayoutOutlined />}>
                    Layout
                </Menu.Item>
                <Menu.Item key={'controls'} icon={<ControlOutlined />}>
                    Controles
                </Menu.Item>
            </Menu>

            <SaveModal visible={showSaveModal} onClose={() => setShowSaveModal(false)}/>
            <DashboardList visible={showDashboardList} onClose={() => setShowDashboardList(false)}/>
        </Sider>
    )
}
