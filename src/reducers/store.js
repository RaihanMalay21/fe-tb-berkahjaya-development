import { configureStore } from '@reduxjs/toolkit';
import { hadiahsHasExchangeSlice, hadiahsSlice, LoginSlice, LogoutSlice, exchangeGiftSlice,  usersSlice, inputNotaSlice } from './reducers';

const store = configureStore({
    reducer: {
        usersState: usersSlice.reducer,
        hadiahsState: hadiahsSlice.reducer,
        hadiahsHasExchangeState: hadiahsHasExchangeSlice.reducer,
        logoutState: LogoutSlice.reducer,
        loginState: LoginSlice.reducer,
        inputNotaState: inputNotaSlice.reducer,
        exchangeGiftState: exchangeGiftSlice.reducer,
    },
});

export default store;
