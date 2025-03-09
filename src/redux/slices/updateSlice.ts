import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleSuccess } from "./defaultSlice";

interface UpdateState {
    loading: boolean;
    error: string | null;
}

const initialState: UpdateState = {
    loading: false,
    error: null,
};

export const updateData = createAsyncThunk(
    "data/updateData",
    async ({ id, data }: { id: string; data: any }, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://crudcrud.com/api/6d7fe09492e44a8cb574a3e8a176d610/unicorns/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update data");
            }

            dispatch(handleSuccess());
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const updateDataSlice = createSlice({
    name: "update",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateData.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default updateDataSlice.reducer;
