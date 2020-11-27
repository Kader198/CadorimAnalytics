import React,{ useReducer} from 'react';
import { Reducer } from './store';
import { initialState } from './InitialState';


export const Context = React.createContext();

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer,initialState);
    return (
        <Context.Provider value={ { state,dispatch } }>
            {children}
        </Context.Provider>
    );
}
