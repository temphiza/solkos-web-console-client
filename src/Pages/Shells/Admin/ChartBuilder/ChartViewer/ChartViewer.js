import React, {useContext} from "react";
import { Card, Typography } from 'antd';
// import ReactJson from 'react-json-view';
import ChartContainer from '../../../../Container/Chart';
import {CHART_TYPE} from '../../../../Utilis/chart-type';
import { store } from "../store";
import axios from 'axios';


const { Text } = Typography;
const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

export default function () {
    const [title, setTitle] = React.useState('Has clic pra editar...');
    const [{tableId, chartType, fields, styles, valid, updatedAt} , dispatch] = useContext(store);
    const [data, setData] = React.useState([{state: 'loading...'}]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(
        () => pull(valid),
        [valid, updatedAt]
    );

    function pull(validChart) {
        const matches = [
            {
                "name": "start_at",
                "comparator": ">",
                "type": "datetime",
                "value": "2020-09-01"
            }
        ];

        if (validChart) {
            console.log('pulling data...');
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
            size={'small'}
            title={'Gráfico'}>
            <Text editable={{ onChange: setTitle }}>{title}</Text>
            {
                valid?
                    <ChartContainer
                        chart={{tableId, chartType, fields, styles}}
                        data={data}
                        loading={loading} />:
                    <div>
                        <Text>Waiting...</Text>
                    </div>
            }
        </Card>
    )
}
