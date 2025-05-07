import { configureStore } from '@reduxjs/toolkit';
import {hadiahsHasExchangeSlice, hadiahsSlice, LoginSlice, LogoutSlice, exchangeGiftSlice,  usersSlice, inputNotaSlice, dataProsesHadiahSlice, changePasswordSlice, prosesPoinSlice, removeNotaNotValidSlice, forgotPasswordSlice, signupSlice, adminBarangSlice, searchBarangSlice, deleteBarangSlice, inputBarangSlice, updateBarangSlice, hadiahAdminSlice, inputHadiahSlice, updateHadiahSlice, pengajuanHadiahSlice, hadiahTelahTibaSlice, notaPengajuanPoinSlice, searchBarangPembelianSlice, submitNotaCancelSlice, submitNotaSuccessSlice, searchHadiahSlice, deleteHadiahSlice, pengajuanHadiahFineshedSlice, verificationSignupRiors} from './reducers';

const store = configureStore({
    reducer: {
        usersState: usersSlice.reducer,
        hadiahsState: hadiahsSlice.reducer,
        hadiahsHasExchangeState: hadiahsHasExchangeSlice.reducer,
        logoutState: LogoutSlice.reducer,
        loginState: LoginSlice.reducer,
        inputNotaState: inputNotaSlice.reducer,
        exchangeGiftState: exchangeGiftSlice.reducer,
        dataProsesHadiahState: dataProsesHadiahSlice.reducer,
        changePasswordState: changePasswordSlice.reducer,
        prosesPoinState: prosesPoinSlice.reducer,
        removeNotaNotValidState: removeNotaNotValidSlice.reducer,
        forgotPasswordState: forgotPasswordSlice.reducer,
        signupState: signupSlice.reducer,
        adminBarangState: adminBarangSlice.reducer,
        searchBarangState: searchBarangSlice.reducer,
        deleteBarangState: deleteBarangSlice.reducer,
        inputBarangState: inputBarangSlice.reducer,
        updateBarangState: updateBarangSlice.reducer,
        hadiahAdminState: hadiahAdminSlice.reducer,
        inputHadiahState: inputHadiahSlice.reducer,
        deleteHadiahState: deleteHadiahSlice.reducer,
        updateHadiahState: updateHadiahSlice.reducer,
        pengajuanHadiahState: pengajuanHadiahSlice.reducer,
        hadiahTelahTibaState: hadiahTelahTibaSlice.reducer,
        pengajuanHadiahFineshedState: pengajuanHadiahFineshedSlice.reducer,
        notaPengajuanPoinState: notaPengajuanPoinSlice.reducer,
        searchBarangPembelianState: searchBarangPembelianSlice.reducer, 
        submitNotaCancelState: submitNotaCancelSlice.reducer,
        submitNotaSuccessState: submitNotaSuccessSlice.reducer,
        searchHadiahState: searchHadiahSlice.reducer,
        verificationSignupRiorsState: verificationSignupRiors.reducer,
    },
});

export default store;
