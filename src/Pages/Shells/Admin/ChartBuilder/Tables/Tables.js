import React from "react";
import { Card, Select, List, Tag, Typography } from "antd";
import {
    FieldTimeOutlined,
    FieldStringOutlined,
    FieldBinaryOutlined,
    FieldNumberOutlined
} from '@ant-design/icons';
import measures from "./queries/measures";


const fieldIconMap = {
    STRING: <FieldStringOutlined />,
    BOOL: <FieldBinaryOutlined />,
    FLOAT: <FieldNumberOutlined />,
    NUMERIC: <FieldNumberOutlined />,
    INTEGER: <FieldNumberOutlined />,
    DATE: <FieldTimeOutlined />,
    DATETIME: <FieldTimeOutlined />,
    TIME: <FieldTimeOutlined />,
    TIMESTAMP: <FieldTimeOutlined />,
};
const { Text } = Typography;

export default function () {
    return (
        <Card size={'small'} title={'Datos'}>
            <Select
                placeholder={'Tablas'}
                style={{width: '100%'}}>

            </Select>
            <List
                style={{paddingTop: 8}}
                size={'small'}
                bordered={false}
                split={false}
                dataSource={measures}
                renderItem={column => (
                    <List.Item style={{padding: '0 0 6px'}}>
                        <Tag style={{width: '100%'}}>
                            {fieldIconMap[column.type]} <Text strong>{column.name}</Text>
                            <Text style={{float: 'right'}} type={'secondary'}>⠿</Text>
                        </Tag>
                    </List.Item>
                )}
            />
        </Card>
    );
}
