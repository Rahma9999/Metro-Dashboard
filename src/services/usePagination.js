
// hooks/usePagination.js
import { useReducer } from 'react';

const initState = {
    loading: false,
    loadingSearch: false,
    error: '',
    noOfPages: 1,
    result: 0,
    page: 1
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':         
            return { ...state, loading: true, error: '' };

        case 'unloading':       
            return { ...state, loading: false };

        case 'setLoadingSearch':
            return { ...state, loadingSearch: true, error: '' };

        case 'setUnloadingSearch': 
            return { ...state, loadingSearch: false };

        case 'setError': 
            return { ...state, error: action.payload };

        case 'setPagesData':    
            return { ...state, noOfPages: action.noOfPages, result: action.res };

        case 'incPage':         
            return { ...state, page: state.page + 1 };

        case 'decPage':         
            return { ...state, page: state.page - 1 };

        case 'setStatus':
            return {...state, status: action.status};

        default: throw new Error(`Unknown action: ${action.type}`);
    }
};

export const usePagination = (extraInitState = {}) => {
    const [state, dispatch] = useReducer(reducer, { ...initState, ...extraInitState });
    return { state, dispatch };
};