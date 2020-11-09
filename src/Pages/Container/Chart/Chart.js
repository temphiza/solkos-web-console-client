import React from "react";
import { Skeleton } from "antd";
import Statistic from '../../Charts/Statistic';
import Pie from '../../Charts/Pie';
import Cartesian from '../../Charts/Catersian';
import LiveTrackingMap from "../../Charts/Map/LiveTrackingMap";
import {
    STATISTIC,
    PIE,
    LINES,
    BARS,
    LIVE_TRACKING_MAP
} from '../../Utilis/chart-type';


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
        case LINES:
        case BARS:
            return (
                <Skeleton active loading={loading} paragraph={{rows: 4}}>
                    <Cartesian chartClass={chartType} chart={chart} data={data} height={480}/>
                </Skeleton>
            );
        case LIVE_TRACKING_MAP:
            return (
                <Skeleton active loading={loading} paragraph={{rows: 4}}>
                    <LiveTrackingMap chartClass={chartType} chart={chart} data={data} height={480}/>
                </Skeleton>
            );
        default:
            return <div>Reload...</div>;
    }
}
