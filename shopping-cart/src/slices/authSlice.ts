import { createSlice } from "@reduxjs/toolkit";

const data = localStorage.getItem("credentials")

const initialState = data ? JSON.parse(data) : {
    name: null,
    email: null,
    password: null,
    isAuthenticate: false,

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state: any, actions: any) => {
            state.name = actions.payload.name;
            state.email = actions.payload.email;
            state.password = actions.payload.password;
            state.isAuthenticate = true;
            const token = state.email.slice(0, 5) + Math.floor(Math.random() * 1000000) + state.name.slice(1, 6)+ new Date().getMilliseconds()
            localStorage.setItem("credentials", JSON.stringify(state));
            localStorage.setItem("token", token);
        },
        login: (state: any, actions: any) => {
            state.email = actions.payload.email;
            state.password = actions.payload.password;
            state.isAuthenticate = true;
            const token = state.email.slice(0, 5) + Math.floor(Math.random() * 1000000) + state.name.slice(1, 6)+ new Date().getMilliseconds()
            localStorage.setItem("token", token);
            localStorage.setItem("credentials", JSON.stringify(state))
        },
        logout: (state: any) => {
            state.name = null;
            state.password = null;
            state.isAuthenticate = false;
            localStorage.clear()
        }
    }
})
export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;