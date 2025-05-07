import axios from "axios";
import { LoginSlice, inputNotaSlice, exchangeGiftSlice, changePasswordSlice, removeNotaNotValidSlice, forgotPasswordSlice, signupSlice, searchBarangSlice, deleteBarangSlice, inputBarangSlice, inputHadiahSlice, hadiahTelahTibaSlice, searchBarangPembelianSlice, submitNotaCancelSlice, submitNotaSuccessSlice, searchHadiahSlice, deleteHadiahSlice, pengajuanHadiahFineshedSlice, verificationSignupRiors} from "../reducers/reducers";

const { postLoginSuccess, postLoginError, postLoginLoading } = LoginSlice.actions;
const { postInputNotaSuccess, postInputNotaError, postInputNotaLoading } = inputNotaSlice.actions;
const { postExchangeGiftSuccess, postExchangeGiftError } = exchangeGiftSlice.actions;
const { postChangePassSuccess, postChangePassError } = changePasswordSlice.actions;
const { postRemoveNotaNotValidSuccess, postRemoveNotaNotValidError } = removeNotaNotValidSlice.actions;
const { postForgotPasswordSuccess, postForgotPasswordError, postLoadingFP } = forgotPasswordSlice.actions;
const { postSignupSuccess, postSignupError } = signupSlice.actions;
const { searchBarangSuccess, searchBarangError} = searchBarangSlice.actions;
const { postDeleteBarangSuccess, postDeleteBarangError } = deleteBarangSlice.actions;
const { postInputBarangSuccess, postInputBarangError } = inputBarangSlice.actions;
const { postInputHadiahSuccess, postInputHadiahError } = inputHadiahSlice.actions;
const { postHadiahTelahTibaSuccess,  postHadiahTelahTibaError, setLoadingPostHadiahTiba } = hadiahTelahTibaSlice.actions;
const { postSearchBarangPembelianSuccess, postSearchBarangPembelianError } = searchBarangPembelianSlice.actions;
const { postSubmitNotaCancelSucccess, postSubmitNotaCancelError } = submitNotaCancelSlice.actions;
const { postSubmitNotaSuccess2, postSubmitNotaSuccessError } = submitNotaSuccessSlice.actions;
const { postSearchHadiahSucces,  postSearchHadiahError } = searchHadiahSlice.actions;
const { postDeleteHadiahSuccess, postDeleteHadiahError } = deleteHadiahSlice.actions;
const { postPengajuanHadiahFineshedSuccess, postPengajuanHadiahFineshedError, setLoadingPengajuanHadiahFineshed } = pengajuanHadiahFineshedSlice.actions;
const { signupVerificationSuccess, signupVerificationFails, setLoadingSignupVerification } = verificationSignupRiors.actions;

export const postVerificationSignupRiors = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials : true,
    };
    dispatch(setLoadingSignupVerification(true));
    try {
        const response = await axios.post('http://localhost:8080/signup/verification', data, config)
        dispatch(signupVerificationSuccess(response.data.success));
    } catch (error) {
        const message = {
            error: error.response.data.error,
            errorField: error.response.data.ErrorField,
        };
        dispatch(signupVerificationFails(message));
    } finally {
        dispatch(setLoadingSignupVerification(false));
    }
}

export const postLogin = (data) => async (dispatch) => {
    const configJson = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    }
    dispatch(postLoginLoading(true));
    try {
        console.log(data)
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

export const postChangePassword = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    }
    try {
        const response = await axios.post('http://localhost:8080/customer/berkahjaya/change/password', data, config);
        dispatch(postChangePassSuccess(response.data.message));
    } catch(error) {
        const message = {
            errorField: error.response.data.field, 
            errorMessage: error.response.data.message,
            error: error.response,
        };
        dispatch(postChangePassError(message));
    }
}

export const postRemoveNotaNotValid = (id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const response = await axios.delete(`http://localhost:8080/customer/berkahjaya/user/remove/nota/not/valid/${id}`, config);
        dispatch(postRemoveNotaNotValidSuccess(response.data))
    } catch(error) {
        dispatch(postRemoveNotaNotValidError(error))
    }
}

export const postForgotPassword = (data) => async (dispatch) => {
    dispatch(postLoadingFP(true));
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }, 
        withCredentials: true,
    }
    try {
        const response = await axios.post('http://localhost:8080/access/berkahjaya/forgot/password', data, config);
        dispatch(postForgotPasswordSuccess(response.data.message));
    } catch (error) {
        dispatch(postForgotPasswordError(error.response.data.message));
    } finally {
        dispatch(postLoadingFP(false));
    }
}

export const postSignup = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    };
    try {
        const response = await axios.post('http://localhost:8080/access/berkahjaya/signup', data, config);
        dispatch(postSignupSuccess(response.data.message));
    } catch(error) {
        const response = {
            error: error,
            errorObject: error.response.data,
        }
        dispatch(postSignupError(response));
    };
};

export const postSearchBarang = (data) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/barang/search', data, {withCredentials: true});
        dispatch(searchBarangSuccess(response.data));
    } catch (error) {
        dispatch(searchBarangError(error));
    }
}

export const postDeleteBarang = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    }
    const responsePost = {
        response: null,
        status: null,
    }
    try {   
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/barang/deletebarang', data, config);
        responsePost.response = response.data;
        responsePost.status = response.status;
        dispatch(postDeleteBarangSuccess(responsePost));
    } catch(error) {
        responsePost.response = error;
        responsePost.status = error.status;
        dispatch(postDeleteBarangError(responsePost));
    }
}

export const postInputBarang = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
    };
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/barang/inputbarang', data, config);
        const msg = {
            success: response.data.message,
            status: response.status,
        };
        dispatch(postInputBarangSuccess(msg));
    } catch(error) {
        const msg = {
            error: error.response.data.message,
            status: error.response.status,
            errorField: error.response.data.messageField,
        };
        console.log(msg.errorField);
        console.log(error.response);
        dispatch(postInputBarangError(msg));
    }   
}

export const postInputHadiah = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
    }
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/hadiah/inputhadiah', data, config);
        dispatch(postInputHadiahSuccess(response.data.message));
    } catch(error) {
        const response = {
            error: error.response.data.message,
            status: error.response.status,
        }
        dispatch(postInputHadiahError(response));
    }
}

export const postHadiahTelahTiba = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    }
    dispatch(setLoadingPostHadiahTiba(true));
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/pengajuan/poin/sendmsgggiftsarrive', data, config)
        dispatch(postHadiahTelahTibaSuccess(response.data));
    } catch(error) {
        dispatch( postHadiahTelahTibaError(error.response));
    } finally {
        dispatch(setLoadingPostHadiahTiba(false));
    }
}

export const postPengajuanHadiahFineshed = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    }
    dispatch(setLoadingPengajuanHadiahFineshed(true));
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/pengajuan/poin/finished', data, config);
        dispatch(postPengajuanHadiahFineshedSuccess(response.data));
    } catch (error) {
        dispatch(postPengajuanHadiahFineshedError(error.response));
    } finally {
        dispatch(setLoadingPengajuanHadiahFineshed(false));
    }
}


export const postSearchBarangPembelian = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
    }
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/barang/search', data, config);
        const dataResponse = {
            data: response.data,
            length: response.data.length,
        }
        dispatch(postSearchBarangPembelianSuccess(dataResponse));
    } catch(error) {
        dispatch(postSearchBarangPembelianError(error));
    }
}

export const postSubmitNotaCancel = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    };
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/pengajuan/poin/verify/cancel', data, config);
        dispatch(postSubmitNotaCancelSucccess(response.data));
    } catch(error) {
        const response = {
            error: error,
            status: error.response.status,
        };
        dispatch(postSubmitNotaCancelError(response));
    } 
} 

export const postSubmitNotaSuccess = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    };
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/pengajuan/poin/verify', data, config);
        dispatch(postSubmitNotaSuccess2(response.data));
    } catch(error) {
        const response = {
            error: error.response,
            status: error.response.status,
        };
        dispatch(postSubmitNotaSuccessError(response));
    }
}

export const postSearchHadiah = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
    }
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/hadiah/search', data, config);
        dispatch(postSearchHadiahSucces(response.data));
    } catch(error) {
        dispatch( postSearchHadiahError(error));
    }
}

export const postDeleteHadiah = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    }
    try {
        const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/hadiah/deletehadiah', data, config);
        dispatch(postDeleteHadiahSuccess(response.data));
    } catch(error) {
        const response = {
            error: error.response,
            status: error.response.status,
        };
        dispatch(postDeleteHadiahError(response));
    }
}

