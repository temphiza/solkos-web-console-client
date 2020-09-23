import React, { useContext } from "react";
import { Card, Select, List, Tag, Typography } from "antd";
import {
    FieldTimeOutlined,
    FieldStringOutlined,
    FieldBinaryOutlined,
    FieldNumberOutlined
} from '@ant-design/icons';
import { ItemTypes } from '../constants';
import { useDrag } from 'react-dnd';
import { store, SET_TABLE } from "../store";

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

function Field ({column}) {
    const [{ isDragging }, drag] = useDrag({
        item: { column, type: ItemTypes.COLUMN },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                //console.log(item);
                //console.log(`You dropped ${item} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <div ref={drag} style={{width: '100%'}}>
            <Tag style={{
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0)',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}>
                {fieldIconMap[column.type]} <Text strong>{column.name}</Text>
                <Text style={{float: 'right'}} type={'secondary'}>⠿</Text>
            </Tag>
        </div>
    );

}


export default function () {
    const [{ tableId }, dispatch] = useContext(store);

    return (
        <Card size={'small'} title={'Datos'}>
            <Select
                value={tableId}
                onChange={tableId => dispatch({type: SET_TABLE, tableId})}
                placeholder={'Tablas'}
                style={{width: '100%'}}>
                <Select.Option value={'measures'}>Measures</Select.Option>
                <Select.Option value={'events'}>Events</Select.Option>
            </Select>
            <List
                style={{paddingTop: 8}}
                size={'small'}
                bordered={false}
                split={false}
                dataSource={measures}
                renderItem={column => (
                    <List.Item style={{padding: '0 0 6px'}}>
                        <Field column={column} />
                    </List.Item>
                )}
            />
        </Card>
    );
}
