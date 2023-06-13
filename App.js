import React from 'react';
import { Provider } from 'react-redux';
import Routes from './pages/routes';
import { store } from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
