import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import logger from "redux-logger";
// @ts-ignore
import storage from "redux-persist/lib/storage";
// @ts-ignore
import persistReducer from "redux-persist/es/persistReducer";
// @ts-ignore
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"],
};

const persistRootReduce = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistRootReduce,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch