import React from "react";
import { Skeleton } from "antd";
import Statistic from '../../Charts/Statistic';
import Pie from '../../Charts/Pie';
import {STATISTIC, PIE} from '../../Utilis/chart-type';


export default function ({chart, data, loading}) {
    const {chartType} = chart;

    switch (chartType) {
        case STATISTIC:
            return (
                <Skeleton active loading={loading} paragraph={{rows: 1}}>
                    <Statistic chart={chart} data={data}/>
                </Skeleton>
            );
        case PIE:
            return (
                <Skeleton active loading={loading} paragraph={{rows: 4}}>
                    <Pie chart={chart} data={data} height={480}/>
                </Skeleton>
            );
        default:
            return <div>Reload...</div>;
    }
}
