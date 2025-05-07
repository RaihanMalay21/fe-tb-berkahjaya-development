import axios from "axios";
import {updateBarangSlice, updateHadiahSlice} from '../reducers/reducers'

const { putUpdateBarangSuccess, putUpdateBarangError } = updateBarangSlice.actions;
const { putUpdateHadiahSuccess, putUpdatHadiahError } = updateHadiahSlice.actions;

export const putUpdateBarang = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
    };
    try {
        const response = await axios.put('http://localhost:8080/admin/berkahjaya/adminside/barang/updatebarang', data, config);
        const message = {
            success: response.data,
        }
        dispatch(putUpdateBarangSuccess(message));
    } catch(error) {
        const message = {
            error: error.response,
            statusErr: error.response.status,
        };
        dispatch(putUpdateBarangError(message));
    }
}

export const putUpdateHadiah = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
    }
    try {
        const response = await axios.put('http://localhost:8080/admin/berkahjaya/adminside/hadiah/updatehadiah', data, config);
        dispatch(putUpdateHadiahSuccess(response));
        console.log(response);
    } catch(error) {
        const response = {
            error: error,
            status: error.response.status,
        }
        dispatch(putUpdatHadiahError(response));
        console.log(error);
    }
}