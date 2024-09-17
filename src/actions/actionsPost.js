import axios from "axios";
import { LoginSlice, inputNotaSlice, exchangeGiftSlice } from "../reducers/reducers";

export const { postLoginSuccess, postLoginError, postLoginLoading } = LoginSlice.actions;
export const { postInputNotaSuccess, postInputNotaError, postInputNotaLoading } = inputNotaSlice.actions;
export const { postExchangeGiftSuccess, postExchangeGiftError } = exchangeGiftSlice.actions;


export const postLogin = (data) => async (dispatch) => {
    const configJson = {
        headers: {
            "Content-Type": 'application/json'
        },
        withCredentials: true,
    }
    dispatch(postLoginLoading(true));
    try {
        const response = await axios.post('http://localhost:8080/access/berkahjaya/login', data, configJson)
        const message = {
            messageLoginSuccess: response.data,
            statusCodeSuccess: response.status,
        }
        dispatch(postLoginSuccess(message));
    } catch(error) {
        const message = {
            errorLogin: error.response,
            errPass: error.response.data.messagePassword, 
            errUsername: error.response.data.messageUsername,
        }
        dispatch(postLoginError(message));
    }finally {
        dispatch(postLoginLoading(false));
    }
}

export const postInputNota = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials : true,
    };
    dispatch(postInputNotaLoading(true));
    try {
        const response = await axios.post('http://localhost:8080/customer/berkahjaya/scan/poin', data, config)
        const message = {
            messageSuccess: response.data.message,
            statusCode: response.status,
        }
        dispatch(postInputNotaSuccess(message));
    } catch (error) {
        const message = {
            messageError: error.response.data.message,
            statusCode: error.response.status,
            errorInputNota: error.response,
        };
        dispatch(postInputNotaError(message));
    } finally {
        dispatch(postInputNotaLoading(false));
    }
}

export const postExchangeGift = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    }
    try {
        const response = await axios.post('http://localhost:8080/customer/berkahjaya/tukar/poin/hadiah', data, config);
        dispatch(postExchangeGiftSuccess(response.data));
    } catch(error) {
        dispatch(postExchangeGiftError(error.response));
    }
}