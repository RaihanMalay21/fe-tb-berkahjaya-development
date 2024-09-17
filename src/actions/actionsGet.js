import axios from "axios";
import { hadiahsSlice, usersSlice, hadiahsHasExchange, hadiahsHasExchangeSlice, LogoutSlice } from "../reducers/reducers";

export const {setLoadingUsers, fetchUsersSuccess, fetchUsersError } = usersSlice.actions;
export const {setLoadingHadiahs, fetchHadiahsSuccess, fetchHadiahsError} = hadiahsSlice.actions;
export const {setLoadingHadiahsHasExchange, fetchHadiahsHasExchangeSuccess, fetchHadiahsHasExchangeError} = hadiahsHasExchangeSlice.actions;
export const {LogoutSuccess, LogoutError} = LogoutSlice.actions;

export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(setLoadingUsers(true));
        try {
            const response = await axios.get(`http://localhost:8080/customer/berkahjaya/users/data`, { withCredentials: true })
            dispatch(fetchUsersSuccess(response.data));
        } catch(error) {
            const message = {
                message: error.response || 'Something went wrong',
                status: error.response.status,
            }
            dispatch(fetchUsersError(message));
        } finally {
            dispatch(setLoadingUsers(false));
        }
    }
};

export const fetchHadiah = () => {
    return async (dispatch) => {
        dispatch(setLoadingHadiahs(true));
        try{
            const response = await axios.get('http://localhost:8080/customer/berkahjaya/get/hadiah', { withCredentials: true})
            dispatch(fetchHadiahsSuccess(response.data));
        } catch(error) {
            dispatch(fetchHadiahsError(error.response?.data?.message || 'Something went wrong'));
        } finally {
            dispatch(setLoadingHadiahs(false));
        }
    }
};

export const fetchHadiahsHasExchange = () => {
    return async (dispatch) => {
        dispatch(setLoadingHadiahsHasExchange(true));
        try{
            const response = await axios.get('http://localhost:8080/customer/berkahjaya/gifts/have/change/user', { withCredentials: true })
            dispatch(fetchHadiahsHasExchangeSuccess(response.data));
        } catch(error) {
            dispatch(fetchHadiahsHasExchangeError(error.response));
        } finally {
            dispatch(setLoadingHadiahsHasExchange(false));
        }
    }
}

export const Logout = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:8080/access/berkahjaya/logout', {withCredentials: true})
            dispatch(LogoutSuccess(response.data));
        } catch(error) {
            dispatch(LogoutError(error));
        } 
    }
}