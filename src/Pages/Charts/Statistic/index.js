import React from 'react';
import {Statistic} from 'antd';
import helpers from "../../Utilis/helpers";


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

    return (
        <div style={{textAlign: 'left'}}>
            <Statistic
                title={getTitle()}
                value={renderValue()} />
        </div>
    );
}
