import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/lib/features/auth/authSlice";
import carSearchReducer from "@/lib/features/search/searchSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "user",
    "token",
    "extra",
    "loggedInAt",
    "otpPrefix",
    "otpExpiresAt",
  ],
};

const rootReducer = combineReducers({
  authentication: persistReducer(authPersistConfig, authReducer),
  carSearch: carSearchReducer,
});

 
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
            "authentication/updateDoctorIdentification",
          ],
          ignoredPaths: [
            "authentication.doctorIdentification.front",
            "authentication.doctorIdentification.back",
          ],
        },
      }),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
