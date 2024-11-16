import { createSlice } from '@reduxjs/toolkit';

let userData={}

const userSlice = createSlice({
    name: 'user',
    initialState: userData,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;     
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
