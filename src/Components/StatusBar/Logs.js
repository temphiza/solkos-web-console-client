import React from 'react';
import { List, Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';


const logs = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];


export default function () {
    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={logs}
            renderItem={log => (
                <List.Item>
                    <Card
                        size={'small'}
                        title={dayjs().format()}
                        extra={<ClockCircleOutlined />}>
                        <Descriptions column={2} title={'Noficación'}>
                            <Descriptions.Item label={'Usuario'}>Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label={'Acción'}>Actualizó</Descriptions.Item>
                            <Descriptions.Item label={'Objeto'}>Tablero</Descriptions.Item>
                            <Descriptions.Item label={'Fecha'}>{dayjs().format()}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </List.Item>
            )}
        />
    )
}
