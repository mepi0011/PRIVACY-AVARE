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
import { View, Image } from 'react-native';
import { withTheme, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { onLoad } from '../../storage/OnLoad';


import { intro } from '../../storage/intro';


import AsyncStorage from '@react-native-community/async-storage';
import { dontShowAgain } from '../../redux/modules/disclaimer/action';


class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);

    // for now, always delete available file in the beginning, should be probably a reset button somewhere else.
    //deleteJsonFile();

    //is store active? If not, search local file

    // Check local async Storage if Disclaimer and Intro show are dismissed

    /*_getMaValue = async () => {
      console.log("Async Laden im Loading Screen says HI")
      try {
        const value = await AsyncStorage.getItem("visible?");
        console.log(value);
        if (value == "false") {
          console.log("Wert wurde als false gelesen");
        }
        if (value = null) {
          this.props.dispatch(dontShowAgain());
        }
      } catch (e) {
        console.log(e);
      }

      console.log('async Storage geladen und verarbeitet')

    }
    console.log("GUTEN TAG ");
    this._getMaValue();*/



    if (this.props.categories != undefined && this.props.categories.length != 0) {
      this.props.navigation.navigate('Main')
    } else {
      // check whether local profile is available

      intro();
      onLoad()
        .then((result) => {
          console.log("Test: " + result);

          if (result) {
            this.props.navigation.navigate('Main');
          }
        })
        .catch((err) => {
          console.log('Der Fehler ist ', err);
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
    profile: state.communication.profile,
    disclaimer: state.disclaimer

  }
}

export default connect(mapStateToProps)(withTheme(LoadingScreen));

