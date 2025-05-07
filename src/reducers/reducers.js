import { createSlice, findNonSerializableValue } from "@reduxjs/toolkit";

const initialUsersState = {
    users: {},
    loading: false,
    error: null,
    errorStatusCode: null,
    source: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers: {
        setLoadingUsers: (state, action) => {
            state.loading = action.payload;
            state.source = "usersSlice";
        },
        fetchUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
            state.source = "usersSlice";
        },
        fetchUsersError: (state, action) => {
            state.error = action.payload.message;
            state.errorStatusCode = action.payload.status;
            state.loading = false;
            state.source = "usersSlice";
        },
    },
});

const initialHadiahsState = {
    hadiahs: [],
    loading: false,
    error: {},
}


export const hadiahsSlice = createSlice({
    name: 'hadiahs',
    initialState: initialHadiahsState,
    reducers: {
        setLoadingHadiahs: (state, action) => {
            state.loading = action.payload;
        }, 
        fetchHadiahsSuccess: (state, action) => {
            state.hadiahs = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchHadiahsError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

const initialHadiahsHasExchangeState = {
    hadiahsHasExchange: [],
    loadingExchange: false,
    errorExchange: {},
}


export const hadiahsHasExchangeSlice = createSlice({
    name: 'hadiahHasExchange',
    initialState: initialHadiahsHasExchangeState, 
    reducers: {
        setLoadingHadiahsHasExchange: (state, action) => {
            state.loadingExchange = action.payload;
        },
        fetchHadiahsHasExchangeSuccess: (state, action) => {
            state.hadiahsHasExchange = action.payload;
            state.loadingExchange = false;
            state.errorExchange = null;
        },
        fetchHadiahsHasExchangeError: (state, action) => {
            state.errorExchange = action.payload;
            state.loadingExchange = false;
        }
    }
})

const initialLogoutState = {
    message: null, 
    error: null,
}

export const LogoutSlice = createSlice({
    name: 'logout',
    initialState: initialLogoutState,
    reducers: {
        LogoutSuccess: (state, action) => {
            state.message = action.payload;
        },
        LogoutError: (state, action) => {
            state.error = action.payload;
        }
    }
})


const initialLoginState = {
    messageLoginSuccess: null,
    loadingLogin: false,
    statusCodeSuccess: null,
    errorLogin: null, 
    errPass: null,
    errUsername: null,
}

export const LoginSlice = createSlice({
    name: 'login',
    initialState: initialLoginState,
    reducers: {
        postLoginSuccess: (state, action) => {
            state.messageLoginSuccess = action.payload.messageLoginSuccess;
            state.statusCodeSuccess = action.payload.statusCodeSuccess;
            state.loadingLogin = false;
            state.errorLogin = null;
            state.errPass = null;
            state.errUsername = null;
        },
        postLoginError: (state, action) => {
            state.errorLogin = action.payload.errorLogin;
            state.errPass = action.payload.errPass;
            state.errUsername = action.payload.errUsername;
            state.statusCodeSuccess = null;
            state.loadingLogin = false;
        },
        postLoginLoading: (state, action) => {
            state.loadingLogin = action.payload;
        },
    }
})


const initialInputNotaState = {
    messageSuccess : null,
    loadingInputNota: false,
    statusCode : null,
    messageError: null,
    errorInputNota: null,
}

export const inputNotaSlice = createSlice({
    name: 'inputNota',
    initialState: initialInputNotaState,
    reducers: {
        postInputNotaSuccess: (state, action) => {
            state.messageSuccess = action.payload.messageSuccess;
            state.statusCode = action.payload.statusCode;
            state.loadingInputNota = false;
            state.messageError = null;
            state.errorInputNota = null;
        },
        postInputNotaError: (state, action) => {
            state.messageError = action.payload.messageError;
            state.statusCode = action.payload.statusCode;
            state.errorInputNota = action.payload.errorInputNota;
            state.loadingInputNota = false;
        },
        postInputNotaLoading: (state, action) => {
            state.loadingInputNota = action.payload;
        }
    }
})

const initialExchangeGiftState = {
    successExchangeGift: null,
    errorExchangeGift: null,
}

export const exchangeGiftSlice = createSlice({
    name: 'exchange gift',
    initialState: initialExchangeGiftState,
    reducers: {
        postExchangeGiftSuccess: (state, action) => {
            state.successExchangeGift = action.payload;
        },
        postExchangeGiftError: (state, action) => {
            state.errorExchangeGift = action.payload;
        }
    }
})

const initialProsesHadiahState = {
    dataProsesHadiah: [],
    error: null,
}

export const dataProsesHadiahSlice = createSlice({
    name: 'proses hadiah',
    initialState: initialProsesHadiahState,
    reducers: {
        fetchDataProsesHadiahSliceSuccess: (state, action) => {
            state.dataProsesHadiah = action.payload;
            state.error = null;
        },
        fetchDataProsesHadiahSliceError: (state, action) => {
            state.error = action.payload;
        }
    }
})

const initialChangePasswordState = {
    responseSucces: null,
    errorField: null, 
    errorMessage: null,
    errorCP: null
}

export const changePasswordSlice = createSlice({
    name: 'change password',
    initialState: initialChangePasswordState,
    reducers: {
        postChangePassSuccess: (state, action) => {
            state.responseSucces = action.payload;
            state.errorField = null;
            state.errorMessage = null;
            state.errorCP = null;
        },
        postChangePassError: (state, action) => {
            state.errorField = action.payload.errorField;
            state.errorMessage = action.payload.errorMessage;
            state.errorCP = action.payload.error;
            state.responseSucces = null;
        }
    }
})

const initialProsesPoinState = {
    dataProseNota: [],
    errorPP: null,
}

export const prosesPoinSlice = createSlice({
    name: 'proses poin or proses nota to poin',
    initialState: initialProsesPoinState,
    reducers: {
        fetchProsesPoinSucces: (state, action) => {
            state.dataProseNota = action.payload;
            state.errorPP = null;
        },
        fetchProsesPoinError: (state, action) => {
            state.errorPP = action.payload;
            state.dataProseNota = [];
        }
    }
})

const initialRemoveNotaNotValidState = {
    successRemoveNota: null, 
    errorRemoveNota: null,
}

export const removeNotaNotValidSlice = createSlice({
    name: 'remove nota not valid',
    initialState: initialRemoveNotaNotValidState,
    reducers: {
        postRemoveNotaNotValidSuccess: (state, action) => {
            state.successRemoveNota = action.payload;
            state.errorRemoveNota = null;
        },
        postRemoveNotaNotValidError: (state, action) => {
            state.errorRemoveNota = action.payload;
        }
    }
})

const initialForgotPassword = {
    successMessageFP: null,
    errorMessageFP: null,
    loading: false,
}

export const forgotPasswordSlice = createSlice({
    name: 'forgot password',
    initialState: initialForgotPassword,
    reducers: {
        postForgotPasswordSuccess: (state, action) => {
            state.successMessageFP = action.payload;
            state.errorMessageFP = null;
            state.loading = false;
        },
        postForgotPasswordError: (state, action) => {
            state.errorMessageFP = action.payload;
            state.successMessageFP = null;
            state.loading = false;
        },
        postLoadingFP: (state, action) => {
            state.loading = action.payload;
        },
        resetForgotPassword: (state) => {
            state.successMessageFP = null;
            state.errorMessageFP = null;
        }
    }
})

const initialSignupState = {
    successSign: null, 
    error: null,
    errorObject: null,
}
export const signupSlice = createSlice({
    name: 'signup',
    initialState: initialSignupState,
    reducers: {
        postSignupSuccess: (state, action) => {
            state.successSign = action.payload;
            state.error = null;
            state.errorObject = null;
        },
        postSignupError: (state, action) => {
            state.error = action.payload.error;
            state.errorObject = action.payload.errorObject;
            state.successSign = null;
        },
        resetPostSignup: (state) => {
            state.successSign = null;
            state.error = null;
            state.errorObject = null;
        }
    }
})


// ************************ Admin ******************************** //
const initialBarangState = {
    barang: [],
    errorBarang: null,
    responseStatus: null,
    loadingBarang: false,
}

export const adminBarangSlice = createSlice({
    name: 'barang in admin',
    initialState: initialBarangState,
    reducers: {
        fetchBarangSuccess: (state, action) => {
            state.barang = action.payload.barang;
            state.responseStatus = action.payload.status;
            state.errorBarang = null;
            state.loadingBarang = false;
        },
        fetchBarangError: (state, action) => {
            state.errorBarang = action.payload.error;
            state.responseStatus = action.payload.status;
            state.loadingBarang = false;
        },
        setLoadingBarang: (state, action) => {
            state.loadingBarang = action.payload;
        }
    }
})

const initialSearchBarangAdminState = {
    dataBarang: [],
    error: null,
}

export const searchBarangSlice = createSlice({
    name: 'cari barang',
    initialState: initialSearchBarangAdminState,
    reducers: {
        searchBarangSuccess: (state, action) => {
            state.dataBarang = action.payload;
            state.error = null;
        },
        searchBarangError: (state, action) => {
            state.error = action.payload;
            state.dataBarang = null;
        }
    }
})

const initialDeleteBarangState = {
    response: null,
    errorDB: null,
    statusError: null,
}

export const deleteBarangSlice = createSlice({
    name: 'delete barang in admin',
    initialState: initialDeleteBarangState,
    reducers: {
        postDeleteBarangSuccess: (state, action) => {
            state.response = action.payload.response;
            state.statusError = action.payload.status;
            state.errorDB = null;
        },
        postDeleteBarangError: (state, action) => {
            state.errorDB = action.payload.response;
            state.statusError = action.payload.status;
            state.response = null;
        }
    }
})

const initialInputBarangState = {
    msgSuccess: null,
    msgError: null,
    responseStatus: null,
    errValidateField: null,
}

export const inputBarangSlice = createSlice({
    name: 'input barang in admin',
    initialState: initialInputBarangState,
    reducers: {
        postInputBarangSuccess: (state, action) => {
            state.msgSuccess = action.payload.success;
            state.responseStatus = action.payload.status;
            state.msgError = null;
            state.errValidateField = null;
        },
        postInputBarangError: (state, action) => {
            state.msgError = action.payload.error;
            state.responseStatus = action.payload.status;
            state.errValidateField = action.payload.errorField;
        }
    }
})

const initialUpdateBarangState = {
    success: null,
    error: null,
    statusErr: null,
}

export const updateBarangSlice = createSlice({
    name: 'update barang in admin',
    initialState: initialUpdateBarangState,
    reducers: {
        putUpdateBarangSuccess: (state, action) => {
            state.success = action.payload;
            state.error = null;
            state.statusErr = null;
        },
        putUpdateBarangError: (state, action) => {
            state.error = action.payload.error;
            state.statusErr = action.payload.statusErr;
        },
        resetUpdateBarang: (state) => {
            state.success = null;
            state.error = null;
            state.statusErr = null;
        }
    }
})

const initialHadiahAdminState = {
    data: [],
    error: null,
    statusErr: null,
    loadingHadiah: false,
}

export const hadiahAdminSlice = createSlice({
    name: 'hadiah in admin side',
    initialState: initialHadiahAdminState,
    reducers: {
        fetchHadiahAdminSuccess: (state, action) => {
            state.data = action.payload;
            state.error = null;
            state.statusErr = null;
        },
        fetchHadiahAdminError: (state, action) => {
            state.error = action.payload.error;
            state.statusErr = action.payload.status;
        },
        fetchHadiahAdminLoading: (state, action) => {
            state.loadingHadiah = action.payload;
        }
    }
})

const initialSearchHadiahState = {
    dataSH: [],
    errorSH: null,
}

export const searchHadiahSlice = createSlice({
    name: 'search hadiah in admin side',
    initialState: initialSearchHadiahState,
    reducers: {
        postSearchHadiahSucces: (state, action) => {
            state.dataSH = action.payload;
            state.errorSH = null;
        },
        postSearchHadiahError: (state, action) => {
            state.errorSH = action.payload;
        }
    }
})

const initialInputHadiahState = {
    msgSuccess: null,
    msgError: null,
    errStatus: null,
}

export const inputHadiahSlice = createSlice({
    name: "input hadiah in admin side",
    initialState: initialInputHadiahState,
    reducers: {
        postInputHadiahSuccess: (state, action) => {
            state.msgSuccess = action.payload;
            state.msgError = null;
            state.errStatus = null;
        },
        postInputHadiahError: (state, action) => {
            state.msgError = action.payload.error;
            state.errStatus = action.payload.status;
        }
    }
})

const initialUpdateHadiahState = {
    success: null,
    error: null,
    statusErr: null,
}

export const updateHadiahSlice = createSlice({
    name: "update hadiah in admin side",
    initialState: initialUpdateHadiahState,
    reducers: {
        putUpdateHadiahSuccess: (state, action) => {
            state.success = action.payload;
            state.error = null;
            state.statusErr = null;
        },
        putUpdatHadiahError: (state, action) => {
            state.error = action.payload.error;
            state.statusErr = action.payload.status;
        },
        resetUpdateHadiah: (state) => {
            state.success = null;
            state.error = null;
            state.statusErr = null;
        }
    }
})

const initialPengajuanHadiahState = {
    dataPengajuanHadiah: [],
    errorPH: null,
    loadingPH: false,
}

export const pengajuanHadiahSlice = createSlice({
    name: "pengajuan Hadiah in admin side",
    initialState: initialPengajuanHadiahState,
    reducers: {
        fetchPengajuanHadiahSuccess: (state, action) => {
            state.dataPengajuanHadiah = action.payload;
            state.errorPH = null;
        },
        fetchPengajuanHadiahError: (state, action) => {
            state.errorPH = action.payload;
        },
        setLoadingPengajuanHadiah: (state, action) => {
            state.loadingPH = action.payload;
        }
    }
})

const hadiahTelahTibaState = {
    success: null,
    error: null,
    loading: false,
}

export const hadiahTelahTibaSlice = createSlice({
    name: "hadiah telah tiba and server kirim email to user",
    initialState: hadiahTelahTibaState,
    reducers: {
        postHadiahTelahTibaSuccess: (state, action) => {
            state.success = action.payload;
            state.error = null;
        },
        postHadiahTelahTibaError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoadingPostHadiahTiba: (state, action) => {
            state.loading = action.payload;
        },
        resetHadiahTelahTiba: (state) => {
            state.success = null;
            state.error =  null;
            state.loading = false;
        }
    }
})

const initialPengajuanHadiahFineshedState = {
    successPHF: null,
    errorPHF: null,
    loadingPHF: false,
}

export const pengajuanHadiahFineshedSlice = createSlice({
    name : 'pengajuan hadiah fineshed in admin side',
    initialState: initialPengajuanHadiahFineshedState,
    reducers: {
        postPengajuanHadiahFineshedSuccess: (state, action) => {
            state.successPHF = action.payload;
            state.errorPHF = null;
        },
        postPengajuanHadiahFineshedError: (state, action) => {
            state.errorPHF = action.payload;
            state.loadingPHF = false;
        },
        setLoadingPengajuanHadiahFineshed: (state, action) => {
            state.loadingPHF = action.payload;
        }
    }
})

const initialNotaPengajuanPoinState = {
    data: [],
    error: null,
    statusErr: null,
    loading: false,
}

export const notaPengajuanPoinSlice = createSlice({
    name: 'nota pengajuan poin in admin side',
    initialState: initialNotaPengajuanPoinState,
    reducers: {
        fetchNotaPengajuanPoinSuccess: (state, action) => {
            state.data = action.payload;
            state.error = null;
            state.statusErr = null;
        },
        fetchNotaPengajuanPoinError: (state, action) => {
            state.error =  action.payload.error;
            state.statusErr = action.payload.status;
        },
        setLoadingNotaPengajuanPoin: (state, action) => {
            state.loading = action.payload;
        }
    }
})

const searchBarangPembelianState = {
    data: [],
    lengthData: null,
    errorSB: null,
}

export const searchBarangPembelianSlice = createSlice({
    name: 'search barang pembelian in admin side',
    initialState: searchBarangPembelianState,
    reducers: {
        postSearchBarangPembelianSuccess: (state, action) => {
            state.data = action.payload.data;
            state.lengthData = action.payload.length;
            state.errorSB = null;
        },
        postSearchBarangPembelianError: (state, action) => {
            state.errorSB = action.payload;
        }
    }
})

const initialSubmitNotaCancelSlice = {
    success: null,
    errorSNC: null,
    statusErrSNC: null,
}

export const submitNotaCancelSlice = createSlice({
    name: 'submit nota cancel or submission nota to poin reject in admin side',
    initialState: initialSubmitNotaCancelSlice,
    reducers: {
        postSubmitNotaCancelSucccess: (state, action) => {
            state.success = action.payload;
            state.errorSNC = null;
            state.statusErrSNC = null;
        },
        postSubmitNotaCancelError: (state, action) => {
            state.errorSNC = action.payload.error;
            state.statusErrSNC = action.payload.statusErr;
        }
    }
})

const initialSubmitNotaSuccess = {
    successNS: null,
    errorSNS: null,
    statusErrSNS: null,
}

export const submitNotaSuccessSlice = createSlice({
    name: 'submit nota succes to exchange be poin in admin side',
    initialState: initialSubmitNotaSuccess,
    reducers: {
        postSubmitNotaSuccess2: (state, action) => {
            state.successNS = action.payload;
            state.errorSNS = null;
            state.statusErrSNS = null;
        },
        postSubmitNotaSuccessError: (state, action) => {
            state.errorSNS = action.payload.error;
            state.statusErrSNS = action.payload.status;
        }
    }
})

const intialDeleteHadiahState = {
    successDH: null,
    errorDH: null,
    statusDH: null,
}

export const deleteHadiahSlice = createSlice({
    name: 'delete hadiah in admin side',
    initialState: intialDeleteHadiahState,
    reducers: {
        postDeleteHadiahSuccess: (state, action) => {
            state.successDH = action.payload;
            state.statusDH = 200;
            state.errorDH = null;
        },
        postDeleteHadiahError: (state, action) => {
            state.errorDH = action.payload.error;
            state.statusDH = action.payload.status;
        }
    }
})

const initialVerificationSignupRiors = {
    succes: null,
    error: null,
    ErrorField: [],
    loading: false,
}

export const verificationSignupRiors = createSlice({
    name: 'signup verification riors',
    initialState: initialVerificationSignupRiors,
    reducers: {
        signupVerificationSuccess: (state, action) => {
            state.succes = action.payload;
            state.error = null;
            state.ErrorField = [];
        },
        signupVerificationFails: (state, action) => {
            state.ErrorField = action.payload.errorField;
            state.error = action.payload.error;
        },
        setLoadingSignupVerification: (state, action) => {
            state.loading = action.payload;
        }
    }
})

// export const rootReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FETCH_USERS_SUCCESS':
//             return {
//                 ...state, 
//                 users: action.payload,
//             };
//         case 'FETCH_HADIAHS_SUCCESS':
//             return {
//                 ...state,
//                 hadiahs: action.payload,
//             };
//         case 'SET_LOADING':
//             return {
//                 ...state,
//                 loading: action.payload,
//             };
//         case 'SET_FETCH_ERROR':
//             return {
//                 ...state,
//                 error: {
//                     message: action.payload.message,
//                     source: action.payload.source
//                 }
//             };
//     }
// }