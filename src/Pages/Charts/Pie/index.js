import React from 'react';
import { Axis, Chart, Legend, Tooltip, Pie, Coord } from 'viser-react';

const DataSet = require('@antv/data-set');


export default function ({chart, data, width, height}) {

    const transform = () => {
        const { fields } = chart,
            { details, value } = fields,
            detailsName = `_id_${details.operator}_${details.name}`,
            dv = new DataSet.View().source(data);

        dv.transform({
            type: 'percent',
            field: `${value.operator}_${value.name}`,
            dimension: detailsName,
            as: 'percent'
        });

        return dv.rows;
    };

    const { fields } = chart,
        { details } = fields,
        detailsName = `_id_${details.operator}_${details.name}`,
        scale = [
            {
                dataKey: 'percent',
                min: 0,
                formatter: '.0%',
            }
        ];

    return (
        <Chart
            forceFit={!width}
            width={width}
            height={height}
            data={transform()}
            scale={scale}>
            <Tooltip showTitle={false}/>
            <Axis/>
            <Legend dataKey={detailsName}/>
            <Coord type='theta' radius={0.75} innerRadius={0.6}/>
            <Pie
                position={'percent'}
                color={detailsName}
                style={{stroke: '#fff', lineWidth: 1}}
                label={['percent', {
                    formatter: (val, item) => {
                        return item.point[detailsName] + ': ' + val;
                    }
                }]}
            />
        </Chart>
    );
}
