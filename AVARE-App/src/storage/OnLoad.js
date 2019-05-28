/*
        Copyright 2016-2018 AVARE project team

        AVARE-Project was financed by the Baden-Württemberg Stiftung gGmbH (www.bwstiftung.de).
        Project partners are FZI Forschungszentrum Informatik am Karlsruher
        Institut für Technologie (www.fzi.de) and Karlsruher
        Institut für Technologie (www.kit.edu).

        Files under this folder (and the subfolders) with "Created by AVARE Project ..."-Notice
	    are our work and licensed under Apache Licence, Version 2.0"

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
*/
//TODO: I think, App shouldn't be imported here
import { store } from '../../App'

import {
    ToastAndroid,
} from 'react-native';

import { setProfile, setTime } from '../redux/modules/communication/actions';

import { readJsonFile } from './RNFSControl'
import { loadCategories } from '../redux/modules/categories/actions';
import { loadApps } from '../redux/modules/apps/actions';

import AsyncStorage from '@react-native-community/async-storage';
import { dontShowAgain } from '../redux/modules/disclaimer/action';
_getMyValue = async () => {
    console.log("getValue sagt hi");
    try {
        console.log("Wert lesen:");
        let value = await AsyncStorage.getItem("disclaimer");
        let value2;
        console.log(value + " gelesener Wert und " + value2);
        if (value !== null) {
            console.log("RICHTIG");
            //store.dispatch(dontShowAgain());
        }
        /*if (value == null) {
            console.log("Value ist richtig geladen sehr gut");

            if ((const value = await AsyncStorage.getItem("visible?")) = false) {
                console.log("richtig");
                //  store.dispatch(dontShowAgain());
            }*/
    } catch (e) {
        console.log("Fehler aufgetreten:" + e);
    }

    console.log("async Storage geladen und verarbeitet");

}

export const onLoad = () => {
    this._getMyValue();
    return readJsonFile()
        .then((contents) => {
            preferenceObject = JSON.parse(contents);
            store.dispatch(setProfile(preferenceObject.profile));
            store.dispatch(setTime(preferenceObject.time));
            store.dispatch(loadApps(preferenceObject.apps));
            store.dispatch(loadCategories(preferenceObject.categories));

            ToastAndroid.show('Json loaded', ToastAndroid.SHORT);
            return true;

        })


}