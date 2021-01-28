import { combineReducers } from 'redux';
import client from './client';
import post from './post';

export default combineReducers({
    client,
    post,
})