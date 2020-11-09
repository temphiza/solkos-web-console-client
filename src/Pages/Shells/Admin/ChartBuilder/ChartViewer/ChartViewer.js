import React, {useContext} from "react";
import {Result} from "antd";
import {
    BarChartOutlined,
    DatabaseOutlined,
    DragOutlined,
    FormatPainterOutlined
} from '@ant-design/icons';

import { Card, Typography } from 'antd';
// import ReactJson from 'react-json-view';
import ChartContainer from '../../../../Container/Chart';
import {CHART_TYPE} from '../../../../Utilis/chart-type';
import { store } from "../store";
import axios from 'axios';


const { Text, Paragraph } = Typography;
const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

export default function () {
    const [title, setTitle] = React.useState('Has clic pra editar...');
    const [{tableId, chartType, fields, styles, valid, updatedAt}] = useContext(store);
    const [data, setData] = React.useState([{state: 'loading...'}]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(
        () => pull(valid),
        [valid, updatedAt]
    );

    function pull(validChart) {
        const matches = [
            {
                "name": "read_at",
                "comparator": ">",
                "type": "datetime",
                "value": "2020-09-01"
            }
        ];

        if (validChart) {
            console.log('pulling data...', tableId);
            setData([{state: 'loading...'}]);
            setLoading(true);

            client.post(
                CHART_TYPE[chartType],
                {
                    ...fields,
                    tableId: `imbera.${tableId}`,
                    chartType: CHART_TYPE[chartType],
                    matches
                }
            ).then(response => {
                if (response.status === 200) {
                    const {data} = response;

                    setData(data);
                    setLoading(false);
                }
            }).catch(info => {
                // console.log(info.toJSON());
                setLoading(false);
            });
        }
    }

    return (
        <Card
            style={{height: '100%'}}
            size={'small'}
            title={'Gráfico'}>

            {
                valid?
                    <div>
                        <Text editable={{ onChange: setTitle }}>{title}</Text>
                        <ChartContainer
                            chart={{tableId, chartType, fields, styles}}
                            data={data}
                            loading={loading} />
                    </div>:
                    <div>
                        <Result
                            icon={<BarChartOutlined />}
                            title={'Arrastra campos para crear gráfico'}
                            subTitle={'Selecciona tus datos y arrastra los campos para crear un gráfico.'}>
                            <div className="desc">
                                <Paragraph>
                                    <Text
                                        strong
                                        style={{
                                            fontSize: 16,
                                        }}>
                                        Sigue estos pasos para crear un gráfico
                                    </Text>
                                </Paragraph>

                                <Paragraph>
                                    <DatabaseOutlined className={'chart-viewer-steps-icon'}/> Selecciona una fuente de datos.
                                </Paragraph>

                                <Paragraph>
                                    <BarChartOutlined className={'chart-viewer-steps-icon'}/> Selecciona un tipo de gráfico.
                                </Paragraph>

                                <Paragraph>
                                    <DragOutlined className={'chart-viewer-steps-icon'}/> Arrastra los campos a las opciones del gráfico.
                                </Paragraph>

                                <Paragraph>
                                    <FormatPainterOutlined className={'chart-viewer-steps-icon'}/> Configura el estilo y formato del gráfico.
                                </Paragraph>

                            </div>
                        </Result>
                    </div>
            }
        </Card>
    )
}
