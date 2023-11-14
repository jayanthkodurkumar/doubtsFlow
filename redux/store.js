import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";

// SOURCES:
// learnt to create persistent redux state
// 1. https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
// 2. https://youtu.be/b88Z5POQBwI?si=HH2D8getVMcJ4ckS

const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const rootReducer = combineReducers({
  auth: authReducer,
  currentuser: userReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...reduxPersistActions],
      },
    }),
});
export const persistor = persistStore(store);
