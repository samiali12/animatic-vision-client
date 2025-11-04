import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";
import projectSlice from "./features/project/projectSlice";
import adminAuthSlice from "./features/admin/adminAuthSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSlice,
      adminAuth: adminAuthSlice,
      project: projectSlice
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

const store = makeStore();

const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate(undefined, { forceRefetch: true })
  );
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate(undefined, { forceRefetch: true })
  );
};

initializeApp();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
