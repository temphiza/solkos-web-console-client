import React, { createContext, useReducer } from "react";
import dayjs from "dayjs";

const initialState = {
    tableId: 'measures',
    chartType: 'lines'
};
const store = createContext(initialState);
const { Provider } = store;
const SET_TABLE = 'SET_TABLE';
const SET_FIELDS = 'SET_FIELDS';
const UNSET_FIELDS = 'UNSET_FIELDS';
const SET_CHART_TYPE = 'SET_CHART_TYPE';
const UPDATE_STYLES = 'UPDATE_STYLES';


const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        (state, action) => {

            switch (action.type) {
                case SET_TABLE:
                    const { tableId } = action;
                    // console.log('set table:', tableId);

                    return {tableId};
                case SET_FIELDS:
                    const { fields } = action;

                    // console.log(fields);

                    return {...state, fields, valid: true, updatedAt: dayjs().format()};
                case UNSET_FIELDS:
                    let newState = {...state, valid: false};
                    delete newState['fields'];

                    return newState;

                case SET_CHART_TYPE:
                    const { chartType } = action;

                    // console.log('set chart type:', chartType);

                    if (!!state.tableId) {
                        return {tableId: state.tableId, chartType};
                    }
                    else {
                        return {chartType};
                    }
                case UPDATE_STYLES:
                    const { styles } = action,
                        prevStyles = 'styles' in state? state.styles: {};

                    return {...state, styles: {...prevStyles, ...styles}};
                default:
                    throw new Error();
            }
        },
        initialState
    );

    return (
        <Provider value={[state, dispatch]}>{children}</Provider>
    );
}

export { store, StateProvider, SET_TABLE, SET_FIELDS, UNSET_FIELDS, SET_CHART_TYPE, UPDATE_STYLES };
