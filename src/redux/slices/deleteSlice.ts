import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleDeletePrompt, handleSuccess } from "./defaultSlice";
import { RootState } from "../store";

interface DeleteState {
    loading: boolean;
    error: string | null;
}

const initialState: DeleteState = {
    loading: false,
    error: null,
};

export const deleteData = createAsyncThunk("data/deleteData", async (_, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const selectedId = state.default.selectedId;
    dispatch(handleDeletePrompt());

    try {
        const response = await fetch(
            `https://crudcrud.com/api/6d7fe09492e44a8cb574a3e8a176d610/unicorns/${selectedId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete data");
        }

        dispatch(handleSuccess());
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const deleteDataSlice = createSlice({
    name: "delete",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default deleteDataSlice.reducer;
