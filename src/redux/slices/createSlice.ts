import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleSuccess } from "./defaultSlice";
interface CreateState {
    loading: boolean;
    error: string | null;
}

const initialState: CreateState = {
    loading: false,
    error: null,
};

export const createData = createAsyncThunk("data/createData", async (data: any, { dispatch, rejectWithValue }) => {
    try {
        const response = await fetch(
            "https://crudcrud.com/api/6d7fe09492e44a8cb574a3e8a176d610/unicorns",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create data");
        }

        dispatch(handleSuccess());
        // return await response.json();
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const createDataSlice = createSlice({
    name: "create",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createData.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default createDataSlice.reducer;
