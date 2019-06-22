
import { HIDE } from './action'
import { SHOW } from './action'
import { SHOW_INTRO } from './action'
import { HIDE_INTRO } from './action'



const initialState = {
    disclaimerVisible: true,
    appIntroVisible: true
}


export default function reducer(state = initialState, action) {
    if (action.type === HIDE) {
        return {
            disclaimerVisible: action.payload
        }
    }
    if (action.type === SHOW) {
        return {
            disclaimerVisible: action.payload
        }
    }
    if (action.type === SHOW_INTRO) {
        return {
            appIntroVisible: action.payload
        }
    }
    if (action.type === HIDE_INTRO) {
        return {
            appIntroVisible: action.payload
        }
    }
    return state;
}