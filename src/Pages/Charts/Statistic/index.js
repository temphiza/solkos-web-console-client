import React from 'react';
import {Statistic} from 'antd';
import helpers from "../../Utilis/helpers";
import * as Icons from '@ant-design/icons';



export default function ({chart, data}) {

    const renderValue = () => {
        if (data.length === 1) {
            const { variable } = chart.fields,
                { formatter, operator, name } = variable,
                value = data[0][`${operator}_${name}`];

            if (!!formatter && formatter in helpers) {
                return helpers[formatter](value);
            } else {
                return value;
            }
        }
    };

    const getTitle = () => {
        const { variable } = chart.fields,
            { alias, name } = variable;

        return !!alias? alias: name;
    };

    function renderIcon() {
        const {styles} = chart;

        if (!!styles && !!styles.icon) {
            const Icon = Icons[styles.icon];
            return <Icon />;
        }
    }

    function getPrecision() {
        const {styles} = chart;

        return (!!styles && !!styles.precision) && styles.precision;
    }

    function getSuffix() {
        const {styles} = chart;

        return (!!styles && !!styles.suffix) && styles.suffix;
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Statistic
                title={getTitle()}
                prefix={renderIcon()}
                suffix={getSuffix()}
                value={renderValue()}
                precision={getPrecision()}/>
        </div>
    );
}
