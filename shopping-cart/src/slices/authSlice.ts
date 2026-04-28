import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    password: null,
    isAuthenticate: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: any, actions: any) => {
            state.name = actions.payload.name;
            state.email = actions.payload.email;
            state.password = actions.payload.password;
            state.isAuthenticate = true;
            localStorage.setItem("credentials", JSON.stringify(state));
        }
    }
})
export const { login } = authSlice.actions;
export default authSlice.reducer;