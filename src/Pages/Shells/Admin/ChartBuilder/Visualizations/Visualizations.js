import React from "react";
import { Card, Tabs } from 'antd';

export default function () {
    return (
        <Card size={'small'} title={'Visualizaciones'}>
            <Tabs size={'small'}>
                <Tabs.TabPane key={'settings'} tab={'Config'}>

                </Tabs.TabPane>

                <Tabs.TabPane key={'styles'} tab={'Estilo'}>

                </Tabs.TabPane>

                <Tabs.TabPane key={'filters'} tab={'Filtros'}>

                </Tabs.TabPane>
            </Tabs>

        </Card>
    );
}
