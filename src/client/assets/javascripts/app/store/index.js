/**
 * Created by rich on 4/15/17.
 */
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const middleware = applyMiddleware(logger(), thunk);
export default createStore(reducer, middleware);