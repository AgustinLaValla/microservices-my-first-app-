import React, { createContext } from 'react';

const DataLayerContext = createContext(null);

const initialState = {
    list: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LIST':
            return { ...state, list: { ...action.payload } };
        default:
            return state;
    }
}

export default function DataLayer({ children }) {
    return (
        <DataLayerContext.Provider value={React.useReducer(reducer, initialState)}>
            {children}
        </DataLayerContext.Provider>
    )
}

export const useDataLeyer = () => React.useContext(DataLayerContext); 