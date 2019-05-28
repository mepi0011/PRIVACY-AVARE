import { store } from '../../App'

import AsyncStorage from '@react-native-community/async-storage';
import { dontShowAgain } from '../redux/modules/disclaimer/action';

export let intro = () => {
    console.log("intro Funktion sagt HI");
    try {
        console.log("Wert lesen:");
        let value = await AsyncStorage.getItem("visible?");
         console.log(value + " gelesener Wert");
        
        /*if (value == false) {
            console.log("Value ist richtig geladen sehr gut");
        }
        if ((const value = await AsyncStorage.getItem("visible?")) = false) {
                console.log("richtig");
                store.dispatch(dontShowAgain());
            }*/
    } catch (e) {
        console.log("Fehler aufgetreten:" + e);
    }

    console.log("async Storage geladen und verarbeitet");


}