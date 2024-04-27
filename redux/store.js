import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./auth/authReducer";
import menuReducer from "./menu/menuReducer";
import orderReducer from "./order/orderReducer";
import billReducer from "./bills/billReducer";
import reservationReducer from "./reservation/reservationReducer";
import premiseReducer from "./premise/premiseReducer";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  order: orderReducer,
  bill: billReducer,
  reservation: reservationReducer,
  premise: premiseReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
