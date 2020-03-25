import {useReducer, useEffect} from "react";
import axios from "axios";

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

const initialState = {
    rawData: null,
    isLoading: false,
    isError: false
};

const API_URL = 'http://localhost:3001';

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_INIT:
            return {
                rawData: null,
                isLoading: true
            };
        case FETCH_SUCCESS:
            return {
                rawData: action.payload,
                isLoading: false
            };
        case FETCH_FAILURE:
            return {
                isLoading: false,
                isError: true
            };
        default:
            throw new Error("Action is not found!");
    }
};

export default function useDataApi(config) {
    const [state, dispatch] = useReducer(dataFetchReducer, initialState);

    useEffect(
        () => {
            let ignore = false;

            const fetchData = async () => {
                dispatch({type: FETCH_INIT});

                try {
                    const result = await axios({
                        ...config,
                        url: `${API_URL}${config.url}`
                    });

                    if (!ignore) {
                        dispatch({type: FETCH_SUCCESS, payload: result.data});
                    }
                } catch (e) {
                    dispatch({type: FETCH_FAILURE, payload: e.message});
                }
            };

            fetchData();

            return function cleanup() {
                ignore = true;
            };
        }, [config.url, config.method, config.data]
    );

    return state;
}