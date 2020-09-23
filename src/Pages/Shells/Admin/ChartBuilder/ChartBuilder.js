import React from "react";
import { Row, Col } from 'antd';
import Tables from './Tables';
import Visualizations from "./Visualizations";
import ChartViewer from "./ChartViewer";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import { StateProvider } from "./store";


export default function () {
    return (
        <StateProvider>
            <DndProvider backend={HTML5Backend}>
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
            </DndProvider>
        </StateProvider>
    )
}
