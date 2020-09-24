import React from 'react';
import {
    Area,
    Axis,
    Bar,
    Brush,
    Chart,
    Coord,
    Legend,
    Line,
    Point,
    StackArea,
    StackBar,
    Tooltip
} from 'viser-react';
import _ from 'lodash';
import helpers from "../../Utilis/helpers";


const DataSet = require('@antv/data-set');


export default function ({chart, chartClass, data, width, height}) {
    const chartFields = getChartFields();

    function getChartFields() {
        const {fields } = chart,
            {values, legend} = fields,
            nextValues = values[0],
            nextLegend = !!legend? legend: {...nextValues, name: `${nextValues.operator}_${nextValues.name}`};

        return {
            axis: chart.fields.axis,
            values: {
                ...nextValues,
                name: 'value'
            },
            legend: nextLegend
        }
    }

    function transform() {
        const dv = new DataSet.View().source(data),
            { fields } = chart,
            { values } = fields;

        //console.log('data', data);

        dv.transform({
            type: 'fold',
            fields: values.map(value => `${value.operator}_${value.name}`),
            key: `_id_variable`,
            value: 'value'
        });

        return dv.rows;
    }

    // console.log('dv', transform());
    // console.log('fields', chartFields);
    // return <div>...</div>;

    const getXScale = (axis) => {

        switch (axis.type) {
            case 'numeric':
                return 'linear';
            case 'float':
                return 'linear';
            case 'integer':
                return 'linear';
            case 'datetime':
            case 'timestamp':
                // todo: add other operators
                if (!!axis.operator && axis.operator === 'year') {
                    if (chartClass.toLowerCase().includes('bar')) {
                        return 'cat';
                    }
                    else {
                        return 'linear';
                    }
                }
                else {
                    return 'timeCat';
                }
            case 'string':
                return 'cat';
            default:
                return 'cat'
        }
    };

    const getYScale = (axis) => {
        switch (axis.type) {
            case 'numeric':
                return 'linear';
            case 'float':
                return 'linear';
            case 'integer':
                return 'linear';
            case 'datetime':
            case 'timestamp':
                return 'timeCat';
            case 'string':
                return 'linear';
            default:
                return 'linear'
        }
    };

    const renderChart = () => {
        const { axis, values, legend } = chartFields,
            position = `_id_${axis.operator}_${axis.name}*${values.name}`,
            { config } = chart;

        let label = [`${values.name}`],
            labelOptions = {
                textStyle: {
                    fontSize: 11
                }
            };

        labelOptions.formatter = !!values.formatter? helpers[values.formatter]: v => v;

        if (!!config && !!config.density) {
            labelOptions.density = config.density;
        }
        else {
            labelOptions = {};
        }

        if (!_.isEmpty(labelOptions)) {
            label.push(labelOptions);
        }

        let props = { position, label };

        if (!!legend) {
            props.color = legend.name;
        }

        if (!!config && !!config.opacity && typeof config.opacity === 'number') {
            props.opacity = config.opacity;
        }

        // console.log('class', chartClass);
        // console.log('props', props);

        switch (chartClass) {
            case 'lines':
                return <Line {...props}/>;
            case 'bars':
                // todo: filter dodge
                if (
                    !!legend &&  !['float', 'numeric'].includes(axis.type) &&
                    axis.type !== 'integer'
                ) {
                    props.adjust = [{type: 'dodge', marginRatio: 1 / 32}];
                }
                return <Bar {...props}/>;
            case 'stackBar':
                return <StackBar {...props}/>;
            case 'stackArea':
                return (
                    <div>
                        <Line {...props} size={2} adjust={'stack'}/>
                        <Point {...props} size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape={'circle'} adjust={'stack'}/>
                        <StackArea {...props}/>
                    </div>
                );
            case 'area':
                return (
                    <div>
                        <Line {...props} size={2}/>
                        <Area {...props}/>
                    </div>
                );
            case 'points':
                return <Point {...props} size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape={'circle'}/>;
            case 'linesAndPoints':
                return (
                    <div>
                        <Line {...props}/>
                        <Point {...props} size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape={'circle'}/>
                    </div>
                );
            default:
                return <Line {...props}/>;
        }
    };

    const render = () => {

        const { config } = chart,
            { axis, values } = chartFields,
            coordDirection = (
                !!config && !!config.coordDirection &&
                !!config.coordDirection
            )? config.coordDirection: undefined;

        let axisScale = {
                dataKey: `_id_${axis.operator}_${axis.name}`,
                type: getXScale(axis)
            },
            valuesScale = {
                dataKey: values.name,
                type: getYScale(values),
                // min: minValues,
                // max: maxValues,
                sync: true
            },
            axisTitle = {
                text: !!axis.alias? axis.alias: axis.name
            },
            valuesTitle = {
                text: !!values.alias? values.alias: values.name,
                offset: 70
            },
            padding;

        if (!!values.formatter) {
            valuesScale.formatter = helpers[values.formatter];
        }

        if (!!values.alias) {
            valuesScale.alias = values.alias;
        }

        if (!!config && !!config.scale) {
            valuesScale.type = config.scale;
        }

        if (!!config && !!config.padding && !!config.padding) {
            padding = config.padding.split(',').map(e => parseInt(e));
        }

        if (!!config && !!config.axisTitleOffset) {
            axisTitle.offset = config.axisTitleOffset;
        }

        if (!!config && !!config.labelX) {
            axisTitle.text = config.labelX;
        }

        if (!!config && !!config.valuesTitleOffset) {
            valuesTitle.offset = config.valuesTitleOffset;
        }

        if (!!config && !!config.labelY) {
            valuesTitle.text = config.labelY;
        }

        let scale = [axisScale, valuesScale];

        return (
            <div style={{width, height}}>
                <Chart
                    forceFit={!width}
                    width={width}
                    height={height}
                    data={transform()}
                    padding={
                        !!padding?
                            padding:
                            [
                                20, // top
                                20, // right
                                95, // bottom
                                80 // left
                            ]
                    }
                    scale={scale}>
                    <Tooltip/>
                    <Axis
                        dataKey={values.name}
                        title={valuesTitle}/>
                    <Axis
                        dataKey={`_id_${axis.operator}_${axis.name}`}
                        title={axisTitle}/>
                    <Legend/>
                    {
                        !!coordDirection &&
                        <Coord type={'rect'} direction={coordDirection} />
                    }
                    {renderChart()}
                </Chart>
            </div>
        );
    };

    return (
        <div style={{width, height}}>
            { render() }
        </div>
    );
}
