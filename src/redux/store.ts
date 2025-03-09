import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlice";
import defaultSlice from "./slices/defaultSlice";
import createDataSlice from "./slices/createSlice";
import updateDataSlice from "./slices/updateSlice";

export const store = configureStore({
    reducer: {
        data: dataSlice,
        default: defaultSlice,
        create: createDataSlice,
        update: updateDataSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
