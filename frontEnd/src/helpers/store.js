//Copyright (c) 2020 Jason Watmore
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

export const store = createStore(//
    rootReducer,
    composeWithDevTools(// redux develop tool
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
      )
    // other store enhancers if any
  )
);
