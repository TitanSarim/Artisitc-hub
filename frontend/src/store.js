import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './reducers/userReducer';
import { allArtistsReducer } from './reducers/usersReducer';


const reducer = combineReducers({
    user: userReducer,
    allArtists: allArtistsReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/FLUSH',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER',
                ],
            },
        }).concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;
