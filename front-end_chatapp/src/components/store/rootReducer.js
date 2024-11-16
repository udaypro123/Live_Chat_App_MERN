/* eslint-disable no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from "../store/slices/authSlice.js";

const rootReducer = combineReducers({
    user: userSlice,
});

export default rootReducer;
