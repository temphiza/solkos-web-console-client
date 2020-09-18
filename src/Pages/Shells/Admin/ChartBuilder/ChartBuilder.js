import React from "react";
import { Row, Col } from 'antd';
import Tables from './Tables';
import Visualizations from "./Visualizations";
import ChartViewer from "./ChartViewer";

export default function () {
    return (
        <Row>
            <Col xs={5}>
                <Tables />
            </Col>

            <Col xs={5}>
                <Visualizations />
            </Col>

            <Col xs={14}>
                <ChartViewer />
            </Col>
        </Row>
    )
}
