//Copyright (c) 2020 Jason Watmore
import { alertConstants } from '../constants';
export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:// if action.type=== 'ALERT_SUCCESS'
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}
