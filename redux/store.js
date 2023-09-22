import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

import { userReduser } from "./user/slice";

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
// };

// const user = persistReducer(persistConfig, userReduser);

export const store = configureStore({
  reducer: { user: userReduser },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);

// export default { store, persistor };
