export const SHOW = 'disclaimer/SHOW'
export const HIDE = 'disclaimer/HIDE'

export const SHOW_INTRO = 'disclaimer/SHOW_INTRO'
export const HIDE_INTRO = 'disclaimer/HIDE_INTRO'

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

export function showAppIntro() {
    return{
        type: SHOW_INTRO,
        payload:  true
    }
}

export function hideAppIntro() {
    return{
        type: HIDE_INTRO,
        payload:  false
    }
}