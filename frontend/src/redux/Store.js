// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import folderSliceReducer from './FolderSlice';
import authenticationSliceReducer from './authenticationSlice'; 

const persistConfig = {
  key: 'root',
  storage,
};
const persistedFolderReducer = persistReducer(persistConfig, folderSliceReducer);

const store = configureStore({
  reducer: {
    authentication_user: authenticationSliceReducer,
    folderSlice: persistedFolderReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };



// import { configureStore } from "@reduxjs/toolkit";
// import autehnticationSliceReducer from "./authenticationSlice";
// import folderSliceReducer from './FolderSlice'

// export default configureStore({
//     reducer: {
//         authentication_user: autehnticationSliceReducer,
//         folderSlice: folderSliceReducer,
//     }
// });
