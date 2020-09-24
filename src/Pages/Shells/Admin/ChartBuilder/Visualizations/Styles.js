import React, {useContext} from "react";
import { Form, Select, InputNumber, Checkbox, Upload, Input, Typography } from "antd";
import * as Icons from '@ant-design/icons';
import _ from 'lodash';

import catalog from "./catalog";
import {store, UPDATE_STYLES} from "../store";


const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const {Text} = Typography;

export default function () {
    const [form] = Form.useForm();
    const [{ chartType }, dispatch] = useContext(store);

    function getText(f) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result));
            reader.readAsText(f);
        });
    }

    const normFile = e => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        getText(e.file.originFileObj).then(text =>
            console.log(text)
        );

        return e && e.fileList;
    };

    const renderField = (field, name) => {
        switch (field.type) {
            case 'categorical':
                return (
                    <Form.Item style={{margin: 0}} label={field.label} name={name}>
                        <Select allowClear placeholder={!!field.label? field.label: name}>
                            {
                                field.values.map(value =>
                                    <Select.Option key={value} value={value}>
                                        {value}
                                    </Select.Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                );
            case 'string':
                return (
                    <Form.Item style={{margin: 0}} label={field.label} name={name}>
                        <Input placeholder={`Escribe el ${field.label.toLowerCase()}`} />
                    </Form.Item>
                );
            case 'numeric':
                return (
                    <Form.Item style={{margin: 0}} label={field.label} name={name}>
                        <InputNumber min={field.min} placeholder={`Escribe el ${field.label.toLowerCase()}`} />
                    </Form.Item>
                );
            case 'integer':
                return (
                    <Form.Item style={{margin: 0}} label={field.label} name={name}>
                        <InputNumber
                            style={{width: '100%'}}
                            min={field.min}
                            max={field.max}
                            step={1}
                            precision={0}
                            defaultValue={field.defaultValue}
                            placeholder={!!field.label? field.label: name} />
                    </Form.Item>
                );
            case 'boolean':
                return (
                    <Form.Item style={{margin: 0}} label={field.label} name={name} valuePropName={'checked'} initialValue={field.defaultValue}>
                        <Checkbox />
                    </Form.Item>
                );
            case 'file':
                return (
                    <Form.Item style={{margin: 0}} label='Dragger' valuePropName={'fileList'} getValueFromEvent={normFile}>
                        <Upload.Dragger
                            name='files'
                            customRequest={({file, onSuccess}) => setTimeout(() => onSuccess('ok'), 0)}
                            accept='.json'>
                            <p className='ant-upload-drag-icon'>
                                <Icons.InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                            <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                );
            case 'icon':
                return (
                    <Form.Item style={{margin: 0}} label={field.label} name={name}>
                        <Select showSearch placeholder={'Selecciona un ícono'} allowClear>
                            {
                                _.map(
                                    _.pickBy(
                                        Icons,
                                        (Icon, name) => (
                                            name[0] === name[0].toUpperCase() &&
                                            (typeof Icon !== 'function')
                                        )
                                    ),
                                    (Icon, name) => (
                                        <Select.Option key={name} value={name}>
                                            <Icon /> <Text type={'secondary'}>{name}</Text>
                                        </Select.Option>
                                    )
                                )
                            }
                        </Select>
                    </Form.Item>
                )
            default:
                return null;
        }
    }

    function handleUpdateStyles (changedFields) {
        dispatch({type: UPDATE_STYLES, styles: changedFields});
    }

    const chart = catalog[chartType],
        { styles } = chart;

    return (
        <div>
            {
                !!styles &&
                <Form
                    form={form}
                    {...layout}
                    onValuesChange={handleUpdateStyles}>
                    {
                        _.map(styles, (field, name) => (
                                <div key={name}>
                                    {renderField(field, name)}
                                </div>
                            )
                        )
                    }
                </Form>
            }
        </div>
    )
}
