import React, {useContext} from "react";
import {Button, Card, Input, Menu, Dropdown, Radio, Tabs, Tag, Tooltip, Form, Typography } from 'antd';
import {useDrop} from 'react-dnd';
import {ItemTypes} from '../constants';
import _ from 'lodash';
import catalog from "./catalog";
import { SettingOutlined, FormatPainterOutlined, FilterOutlined } from '@ant-design/icons';
import {
    store,
    SET_FIELDS,
    UNSET_FIELDS,
    SET_CHART_TYPE
} from "../store";


const { Text } = Typography;
const numericFloatOperator = [['SUM', 'sum'], ['AVG', 'avg'], ['MIN', 'min'], ['MAX', 'max']];
const integerOperator = [['SUM', 'sum'], ['C', 'count'], ['AVG', 'avg'], ['MIN', 'min'], ['MAX', 'max']];
const stringOperator = [['D', 'distinct'], ['C', 'count']];
const timestampOperator = [['D', 'distinct'], ['DAY', 'day'], ['MONTH', 'month']];


function Option({field, value, onChange}) {

    const [column, setColumn] = React.useState({});
    const [option, setOption ] = React.useState('alias');

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        drop: (item) => {
            // console.table(column);

            if (!(item.column.name in column)) {
                let newColumn = {
                    ...item.column,
                    operator: getDefaultOperator(item.column.type)
                };

                let nextColumn =
                    field.type === 'ARRAY'?
                        {...column, [newColumn.name]: newColumn}:
                        {[newColumn.name]: newColumn};

                // console.log(nextColumn);

                triggerChange({value: nextColumn});
                setColumn(nextColumn);
            }

            return { name: "Option" };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const triggerChange = ({value}) => {

        if (onChange) {
            if (_.isEmpty(value)) {
                value = null;
            }
            else {
                value = getColumnValue(value)
            }

            onChange(value);
        }
    };

    const handleRemoveField = (target=undefined) => {
        if (!!this.props.onRemove) {
            const { name } = this.props;
            this.props.onRemove(name, target);
        }
    };

    function getColumnValue (nextColumn) {
        if (!_.isEmpty(nextColumn)) {
            const v = _.map(
                nextColumn,
                ({name, type, operator}) => ({
                    name,
                    type: type.toLowerCase(),
                    operator: operator[1]
                })
            );

            if (field.type === 'ARRAY') {
                return v;
            }
            else {
                return v[0];
            }
        }
    }

    function handleRemove (name) {

        if (name in column) {
            let nextColumn = {...column};
            delete nextColumn[name];

            triggerChange({value: nextColumn});
            setColumn(nextColumn);
        }
    }

    const renderSelectedColumn = () => {

        return (
            <div>
                {
                    _.map(column, (c, name) =>
                        <div style={{paddingBottom: 4, paddingTop: 4}} key={name}>
                            <Tag style={{width: '100%'}}>
                                <Dropdown overlayStyle={{width: 128}} overlay={getOperatorMenu(c)}>
                                    <Button type={'link'} size={'small'}>{c.operator[0]}</Button>
                                </Dropdown>
                                <Text strong>{c.name}</Text>
                                <Button onClick={() => handleRemove(name)} size={'small'} type={'link'} style={{float: 'right'}} danger>x</Button>
                            </Tag>
                        </div>
                    )
                }
            </div>
        );
    };
    function handleSetOperator(name, operator) {
        if (name in column) {
            let nextColumn = {...column};

            nextColumn[name].operator = operator;

            triggerChange({value: nextColumn});
            setColumn(nextColumn);
        }
    }

    function renderOperatorMenu (name, selectedOperator, operators) {
        return (
            <Menu
                onClick={({item, key}) => handleSetOperator(name, [item.props.operator, key])}
                selectedKeys={selectedOperator}>
                {
                    operators.map(operator =>
                        <Menu.Item key={operator[1]} operator={operator[0]}>
                            <Text strong>{operator[0]}</Text>
                            <Text style={{float: 'right'}} type={'secondary'}>{operator[1]}</Text>
                        </Menu.Item>
                    )
                }
            </Menu>
        );
    }

    function getDefaultOperator (dataType) {

        if (['NUMERIC', 'FLOAT'].includes(dataType)) {
            return numericFloatOperator[0];
        }
        if (['INTEGER'].includes(dataType)) {
            return integerOperator[0];
        }
        else if (['STRING'].includes(dataType)) {
            return stringOperator[0];
        }
        else if (['TIMESTAMP'].includes(dataType)) {
            return timestampOperator[0];
        }
        else  {
            return null;
        }
    }

    function getOperatorMenu ({name, operator, type}) {

        const opt = operator[1];

        if (['NUMERIC', 'FLOAT'].includes(type)) {
            return renderOperatorMenu(name, opt, numericFloatOperator);
        }
        if (['INTEGER'].includes(type)) {
            return renderOperatorMenu(name, opt, integerOperator);
        }
        else if (['STRING'].includes(type)) {
            return renderOperatorMenu(name, opt, stringOperator);
        }
        else if (['TIMESTAMP'].includes(type)) {
            return renderOperatorMenu(name, opt, timestampOperator);
        }
        else  {
            return null;
        }
    }

    const handleClear = () => {
        if (!!this.props.onClear) {
            const { name } = this.props;
            this.props.onClear(name);
        }
    };
    const isActive = canDrop && isOver;
    let backgroundColor = null;

    if (isActive) {
        backgroundColor = 'green';
    } else if (canDrop) {
        backgroundColor = 'red';
    }

    // console.log(value);

    return (
        /*<div className={'option-content'}>
            {
                (field.type === 'array' && !!field.value) &&
                <Tooltip title={'Borrar'}>
                    <a onClick={this.handleClear} style={{paddingRight: 6}}>
                        delete
                    </a>
                </Tooltip>
            }
            {field.label}: {!!field.value && }
        </div>*/
        <div ref={drop} style={{padding: '0 0 6px'}}>
            <Tag color={backgroundColor} style={{width: '100%', paddingTop: 4, paddingBottom: 4}}>
                {
                    _.isEmpty(column)?
                        <Text type={'secondary'}>arrastra una columna</Text>:
                        renderSelectedColumn()
                }
            </Tag>
        </div>
    )
}

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};


export default function () {
    const [form] = Form.useForm();
    const [{ tableId, chartType }, dispatch] = useContext(store);

    React.useEffect(() => {
        form.resetFields();
    }, [form, tableId]);

    function handleOnChangeChartType(e) {
        dispatch({ type: SET_CHART_TYPE, chartType: e.target.value});
    }

    function handleValidateOptions (changedFields, allFields) {
        form.validateFields().then(values => {
            // console.log(values);
            dispatch({type: SET_FIELDS, fields: values});
        }).catch(info => {
            // console.log('Validate Failed:', info);
            const  { errorFields } = info;

            if (!!errorFields) {
                const { values } = info;

                if (errorFields.length === 0) {
                    dispatch({type: SET_FIELDS, fields: values});
                }
                else {
                    dispatch({type: UNSET_FIELDS});
                }
            }
        });
    }

    return (

        <Card size={'small'} title={'Visualizaciones'}>
            <Radio.Group onChange={handleOnChangeChartType} value={chartType}>
                {
                    _.map(catalog, (chart, name) =>
                        <Radio value={name} key={name}>
                            {chart.label}
                        </Radio>
                    )
                }
            </Radio.Group>

            <Tabs size={'small'} centered>
                <Tabs.TabPane
                    key={'settings'}
                    tab={
                        <Tooltip title={'Configuración'}>
                            <span style={{paddingLeft: 12}}><SettingOutlined /></span>
                        </Tooltip>
                    }>
                    <Form
                        {...layout}
                        form={form}
                        name={'chart-settings'}
                        onFinish={values => console.log(values)}
                        onValuesChange={handleValidateOptions}>
                        {
                            !!chartType && _.map(catalog[chartType].fields, (field, name) =>
                                <Form.Item
                                    name={name}
                                    style={{margin: 0}}
                                    label={field.label}
                                    key={name}
                                    rules={[{ required: true }]}>
                                    <Option field={field}/>
                                </Form.Item>
                            )
                        }
                        {/*<Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>*/}
                    </Form>
                </Tabs.TabPane>

                <Tabs.TabPane
                    key={'styles'}
                    tab={
                        <Tooltip title={'Estilo'}>
                            <span style={{paddingLeft: 12}}><FormatPainterOutlined /></span>
                        </Tooltip>
                    }>

                </Tabs.TabPane>

                <Tabs.TabPane
                    key={'filters'}
                    tab={
                        <Tooltip title={'Filtros'}>
                            <span style={{paddingLeft: 12}}><FilterOutlined /></span>
                        </Tooltip>
                    }>

                </Tabs.TabPane>
            </Tabs>

        </Card>
    );
}
