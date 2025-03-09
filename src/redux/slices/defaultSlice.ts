import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    selectedId: string;
    isDeletePrompt: boolean;
    isSuccess: boolean
}

const initialState: State = {
    selectedId: "",
    isDeletePrompt: false,
    isSuccess: false
};

const defaultSlice = createSlice({
    name: "default",
    initialState,
    reducers: {
        handleDeletePrompt: (state, action: PayloadAction<string | undefined>) => {
            state.selectedId = action.payload;
            console.log('dssds');
            state.isDeletePrompt = !state.isDeletePrompt;
        },
        handleSuccess: (state) => {
            state.isSuccess = !state.isSuccess;
        },
        handleSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        }
    },
});

export const { handleDeletePrompt, handleSuccess } = defaultSlice.actions;
export default defaultSlice.reducer;
