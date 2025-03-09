import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DataState {
    data: any[];
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchData = createAsyncThunk("data/fetchData", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(
            "https://crudcrud.com/api/6d7fe09492e44a8cb574a3e8a176d610/unicorns",
            { method: "GET" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        return await response.json();
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default dataSlice.reducer;
