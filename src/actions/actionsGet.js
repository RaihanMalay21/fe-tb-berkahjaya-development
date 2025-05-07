import axios from "axios";
import { hadiahsSlice, usersSlice, hadiahsHasExchangeSlice, LogoutSlice, dataProsesHadiahSlice, prosesPoinSlice, adminBarangSlice, hadiahAdminSlice, pengajuanHadiahSlice, notaPengajuanPoinSlice } from "../reducers/reducers";

const {setLoadingUsers, fetchUsersSuccess, fetchUsersError } = usersSlice.actions;
const {setLoadingHadiahs, fetchHadiahsSuccess, fetchHadiahsError} = hadiahsSlice.actions;
const {setLoadingHadiahsHasExchange, fetchHadiahsHasExchangeSuccess, fetchHadiahsHasExchangeError} = hadiahsHasExchangeSlice.actions;
const {LogoutSuccess, LogoutError} = LogoutSlice.actions;
const {fetchDataProsesHadiahSliceSuccess,  fetchDataProsesHadiahSliceError} = dataProsesHadiahSlice.actions;
const {fetchProsesPoinSucces, fetchProsesPoinError} = prosesPoinSlice.actions;
const {fetchBarangSuccess, fetchBarangError,  setLoadingBarang} = adminBarangSlice.actions;
const {fetchHadiahAdminSuccess, fetchHadiahAdminError, fetchHadiahAdminLoading} = hadiahAdminSlice.actions;
const {fetchPengajuanHadiahSuccess, fetchPengajuanHadiahError, setLoadingPengajuanHadiah} = pengajuanHadiahSlice.actions;
const {fetchNotaPengajuanPoinSuccess, fetchNotaPengajuanPoinError, setLoadingNotaPengajuanPoin} = notaPengajuanPoinSlice.actions;

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
            console.log(response)
            dispatch(LogoutSuccess(response.data));
        } catch(error) {
            dispatch(LogoutError(error));
        } 
    }
}

export const fetchDataProsesHadiah = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:8080/customer/berkahjaya/user/proses/hadiah', { withCredentials: true})
            dispatch(fetchDataProsesHadiahSliceSuccess(response.data));
        } catch(error) {
            dispatch( fetchDataProsesHadiahSliceError(error));
        }
    }
}

export const fetchDataProsesPoin = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8080/customer/berkahjaya/proses/poin/verify', {withCredentials: true})
            dispatch(fetchProsesPoinSucces(response.data));
        } catch(error) {
            dispatch(fetchProsesPoinError(error));
        }
    }
}

export const fetchAdminBarang = () => {
    return async (dispatch) =>  {
        dispatch(setLoadingBarang(true));
        try {
            const response = await axios.get('http://localhost:8080/admin/berkahjaya/adminside/barang', {withCredentials: true});
            const data = {
                barang: response.data,
                status: response.status,
            };
            dispatch(fetchBarangSuccess(data));
        } catch(error) {
            const data = {
                error: error,
                status: error.response.status,
            };
            dispatch(fetchBarangError(data));
        } finally {
            dispatch(setLoadingBarang(false));
        }
    }
}

export const fetchAdminHadiah = () => {
    return async (dispatch) => {
        dispatch(fetchHadiahAdminLoading(true));
        try {
            const response = await axios.get('http://localhost:8080/admin/berkahjaya/adminside/hadiah', {withCredentials: true})
            dispatch(fetchHadiahAdminSuccess(response.data));
        } catch(error) {
            const response = {
                error: error,
                status: error.response.status,
            }
            dispatch(fetchHadiahAdminError(response));
        } finally {
            dispatch(fetchHadiahAdminLoading(false));
        }
    }
}


export const fetchPengajuanHadiah = () => {
    return async (dispatch) => {
        dispatch(setLoadingPengajuanHadiah(true));
        try {
            const response = await axios.get('http://localhost:8080/admin/berkahjaya/adminside/pengajuan/hadiah', {withCredentials: true})
            dispatch(fetchPengajuanHadiahSuccess(response.data));
        } catch(error) {
            const response = {
                error: error,
                status: error.response.status,
            };
            dispatch(fetchPengajuanHadiahError(response));
        } finally {
            dispatch(setLoadingPengajuanHadiah(false));
        }
    }
}

export const fetchNotaPengajuanPoin = () => {
    return async (dispatch) => {
        dispatch(setLoadingNotaPengajuanPoin(true));
        try {
            const response = await axios.get('http://localhost:8080/admin/berkahjaya/adminside/pengajuan/poin', {withCredentials: true})
            dispatch(fetchNotaPengajuanPoinSuccess(response.data));
        } catch(error){
            const response = {
                error: error.response,
                status: error.response.status,
            }
            dispatch(fetchNotaPengajuanPoinError(response));
        } finally {
            dispatch(setLoadingNotaPengajuanPoin(false));
        }
    }
}