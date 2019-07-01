
import { HIDE } from './action'
import { SHOW } from './action'


const initialState = {
    disclaimerVisible: true,
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
    return state;
}