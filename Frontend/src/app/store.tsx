import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/login/Userslice";


export const store  = configureStore({
    reducer:userSlice.reducer
})