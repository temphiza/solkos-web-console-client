import React, { createContext, useReducer } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

export const SET_FILE_NAME = 'SET_FILE_NAME';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_LAYOUTS = 'UPDATE_LAYOUTS';
export const SAVE_DASHBOARD = 'SAVE_DASHBOARD';
export const SET_STATE = 'SET_STATE';


const initialState = {
    id: undefined,
    fileName: undefined,
    items: {},
    cols: { lg: 18, md: 12, sm: 10, xs: 6, xxs: 2 }
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case SET_STATE:
                    return {...action.state};
                case SAVE_DASHBOARD:

                    console.log('saving...');

                    client.post(
                        `dashboards/${state.id}`,
                        {...state}
                    ).then(response => {
                        console.log(response.data);
                        dispatch({type: SET_STATE, state: response.data});
                    }).catch(info => {
                        console.log(info);
                    });

                    return state;
                case SET_FILE_NAME:
                    const {fileName} = action,
                        dashboardId = !!state.id? state.id: uuidv4();

                    console.log('creating...');

                    client.post(
                        `dashboards/${dashboardId}`,
                        {...state, fileName, id: dashboardId}
                    ).then(response => {
                        console.log(response.data);
                        dispatch({type: SET_STATE, state: response.data});
                    }).catch(info => {
                        console.log(info);
                    });

                    return {...state, fileName};
                case ADD_ITEM:
                    const { item } = action,
                        { id } = item;

                    return {...state, items: {...state.items, [id]: item } };
                case REMOVE_ITEM:
                    const { itemId } = action;
                    let items = {...state.items};

                    if (itemId in items) {
                        delete items[itemId];
                    }

                    return {...state, items};
                case UPDATE_LAYOUTS:
                    const {layouts} = action;
                    return {...state, layouts};
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

export { store, StateProvider };

