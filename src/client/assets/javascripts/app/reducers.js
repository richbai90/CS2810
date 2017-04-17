/**
 * Created by rich on 4/16/17.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import graphReducer from '../features/graph/api/reducers';

export default combineReducers({
  routing: routerReducer,
  graphReducer
});

