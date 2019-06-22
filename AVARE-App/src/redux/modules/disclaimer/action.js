export const SHOW = 'disclaimer/SHOW'
export const HIDE = 'disclaimer/HIDE'

export function dontShowAgain () {
    return{
        type: HIDE,
        payload : false
    }
}

export function showDisclaimer() {
    return{
        type: SHOW,
        payload : true
    }
}
