import React, {useContext} from "react";
import { Result, Button } from 'antd';
import { BarChartOutlined, FolderOpenOutlined } from '@ant-design/icons';

import { Responsive, WidthProvider } from 'react-grid-layout';
import Item from './Item';
import {store, UPDATE_LAYOUTS} from "../store";
import _ from 'lodash';

const ResponsiveGridLayout = WidthProvider(Responsive);
const ROW_HEIGHT = 32;


export default function () {
    const [{items, layouts, cols}, dispatch] = useContext(store);

    function updateLayouts(currentLayout, allLayouts) {
        // console.log('currentLayout', currentLayout);

        dispatch({
            type: UPDATE_LAYOUTS,
            layouts: allLayouts
        });
    }

    const children = React.useMemo(() =>
            _.map(items, item =>
                <div key={item.id}>
                    <Item item={{...item, card: true}} />
                </div>
            ),
        [items]
    );

    return (
        <div style={{height: '100%'}}>
            {
                _.isEmpty(items)?
                    <div style={{background: 'white', height: '100%'}}>
                        <Result
                            icon={<BarChartOutlined />}
                            title={'Creación y edición de tableros'}
                            subTitle={'Has clic en el botón Gráfico para cerar un nuevo gráfico o en Abrir para abrir un tablero.'}
                            extra={[
                                <Button icon={<BarChartOutlined />} type="primary" key="chart">
                                    Gráfico
                                </Button>,
                                <Button icon={<FolderOpenOutlined />} key="open">Abrir</Button>,
                            ]}
                        />
                    </div>:
                    <ResponsiveGridLayout
                        className="layout"
                        rowHeight={ROW_HEIGHT}
                        onLayoutChange={(currentLayout, allLayouts) => updateLayouts(currentLayout, allLayouts)}
                        onBreakpointChange={(newBreakpoint, newCols) => console.log(newBreakpoint, newCols)}
                        layouts={layouts}
                        cols={cols}
                        containerPadding={[0, 0]}>
                        {children}
                    </ResponsiveGridLayout>
            }

        </div>
    )
}
