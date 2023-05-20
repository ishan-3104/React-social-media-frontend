import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../featurs/UserSlice';
import  { cryptonewApi } from '../featurs/NewsSlice'

const store = configureStore({
    reducer:{
        user:userReducer,
        [cryptonewApi.reducerPath] : cryptonewApi.reducer
    }
})

export default store