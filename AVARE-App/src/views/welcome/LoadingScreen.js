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
*/// initial screen: load local profile or go to welcome screen
import React from 'react';
import { View } from 'react-native';
import { withTheme, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { store } from '../../redux/store'
import {
  ToastAndroid,
} from 'react-native';

//import { setProfile, setTime } from '../redux/modules/communication/actions';

import { readJsonFile } from '../../storage/RNFSControl'
import { loadCategories } from '../../redux/modules/categories/actions';
import { loadApps } from '../../redux/modules/apps/actions';

//import { onLoad } from '../../storage/OnLoad';
//import { intro } from '../../storage/intro';
import AsyncStorage from '@react-native-community/async-storage';


class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);


    //is store active? If not, search local file
    if (this.props.categories != undefined && this.props.categories.length != 0) {
      this.props.navigation.navigate('Main')
    } else {
      readJsonFile().then((contents) => {
        preferenceObject = JSON.parse(contents);
        //        store.dispatch(setProfile(preferenceObject.profile));
        //        store.dispatch(setTime(preferenceObject.time));
        store.dispatch(loadApps(preferenceObject.apps));
        store.dispatch(loadCategories(preferenceObject.categories));
        console.log("Json loaded:")
        return true;
      }).then((result) => {
        //        AsyncStorage.getItem('appIntro').then((value) => {
        //         if (value == "introDone") {
        //          console.log('Async read in /LoadingScreen: --> intro already done, skip')
        this.props.navigation.navigate('Main');
        //       }
        //      else {
        //        console.log('Async read in /LoadingScreen: --> intro has to be done')
        //        this.props.navigation.navigate('Intro');
        //     }
        //   });

      }).catch((err) => {
        console.log('Error occurred:', err);
        // Go to welcome screen
        console.log('No Profile, go to welcome');
        this.props.navigation.navigate('Welcome');


      })
    }
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={{ backgroundColor: colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Title>AVARE lädt ...</Title>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    disclaimer: state.disclaimer
  }
}

export default connect(mapStateToProps)(withTheme(LoadingScreen));

