import React from "react";
import { Card, Typography } from 'antd';
const { Text } = Typography;


export default function () {
    const [title, setTitle] = React.useState('Has clic pra editar...');

    return (
        <Card
            size={'small'}
            title={'Gráfico'}>
            <Text editable={{ onChange: setTitle }}>{title}</Text>
        </Card>
    )
}
