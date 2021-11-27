import {SET_ALERT, REMOVE_ALERT} from '../type';
import alertContext from './alertContext';

const alertReducer = (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload)
        default:
            return state;
    }
}

export default alertReducer;