import appData from './reducers/appData';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  appData: appData,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export { store };
