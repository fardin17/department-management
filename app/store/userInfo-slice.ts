import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
    id: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
    type: "teacher" | "student" | null;
    provider: "google" | "credentials" | null;
};

const initialState: State = {
    id: null,
    name: null,
    email: null,
    image: null,
    type: null,
    provider: null
};

const authInfoSlice = createSlice({
    name: "authInfo",
    initialState,
    reducers: {
        setAuthInfo: (state, action: PayloadAction<State>) => {
            state = { ...action.payload };
        },
    },
});

export const { setAuthInfo } = authInfoSlice.actions;
export default authInfoSlice.reducer;
