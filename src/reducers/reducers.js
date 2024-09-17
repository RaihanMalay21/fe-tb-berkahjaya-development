import { createSlice } from "@reduxjs/toolkit";

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