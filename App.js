import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from './pages/routes';
import { store } from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

const persistor = persistStore(store);

const App = () => {
  console.disableYellowBox=true
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StatusBar hidden={true}/>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
