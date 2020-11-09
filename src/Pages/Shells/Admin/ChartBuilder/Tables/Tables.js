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
import {loader} from "graphql.macro";
import { useQuery } from '@apollo/client';

import measures from "./queries/measures";
import events from "./queries/events";
import readings from "./queries/readings";



const GET_TABLES = loader('./queries/getTables.graphql');
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


const consoleId = 1;
const datasetId = 1;

export default function () {
    const [{ tableId }, dispatch] = useContext(store);
    const { loading, data } = useQuery(GET_TABLES, {variables: {consoleId, datasetId}});


    function getOptions() {
        switch (tableId) {
            case 'measures':
                return measures;
            case 'events':
                return events;
            case 'readings':
                return readings;
            default:
                return [];
        }
    }

    return (
        <Card
            style={{height: '100%'}}
            size={'small'}
            title={'Datos'}>
            <Select
                loading={loading}
                value={tableId}
                onChange={tableId => dispatch({type: SET_TABLE, tableId})}
                placeholder={'Tablas'}
                style={{width: '100%'}}>
                {
                    !!data && data.console.dataset.tables.map(table =>
                        <Select.Option key={table.id} value={table.id}>{table.name}</Select.Option>
                    )
                }
            </Select>
            <List
                loading={loading}
                style={{paddingTop: 8}}
                size={'small'}
                bordered={false}
                split={false}
                dataSource={getOptions()}
                renderItem={column => (
                    <List.Item style={{padding: '0 0 6px'}}>
                        <Field column={column} />
                    </List.Item>
                )}
            />
        </Card>
    );
}
