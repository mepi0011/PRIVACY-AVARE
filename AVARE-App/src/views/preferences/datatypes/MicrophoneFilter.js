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
import React from 'react';
import { View, ScrollView, FlatList, Dimensions } from 'react-native';
import { withTheme, List, Divider, Text, Switch, Paragraph } from 'react-native-paper';
import PreferencesHeader from '../../_shared/PreferencesHeader';

import { setMicrophoneFilter as filterMicrophoneCategory } from '../../../redux/modules/categories/actions';
import { setMicrophoneFilter as filterMicrophoneApp } from '../../../redux/modules/apps/actions';
import { writeJsonFile } from '../../../storage/RNFSControl';
import { connect } from 'react-redux';

class MicrophoneFilter extends React.Component {
  constructor(props) {
    super(props);

    let contextID = this.props.navigation.state.params.contextID;
    let context = this.props.navigation.state.params.context;
    this.state = {
      context,
      contextID,
      isSwitchOn: true,
    }
  }

  setMicrophoneFilter(setting){
    if (this.state.context == "category") {
      this.props.dispatch(filterMicrophoneCategory(this.state.contextID, setting));
      console.log('Mic setting: ' + setting)
    } else {
      console.log('setting app mic filter to ' + setting);
      this.props.dispatch(filterMicrophoneApp(this.state.contextID, setting));
    }
    writeJsonFile();
  }

  render() {
    let { colors } = this.props.theme;
    const { isSwitchOn } = this.state;

    return (

        <View style={{ backgroundColor: colors.background, height: 300 }}>
          <PreferencesHeader title="Mikrofonfilter" />
          <View style={{width: Dimensions.get('window').width, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 15}}>
            <Text>Originalton durch Rauschen ersetzen</Text>
            <Switch
              value = { isSwitchOn }
              onValueChange={() =>
                { this.setState({ isSwitchOn: !isSwitchOn});
//                console.log('current State: ' + this.state.isSwitchOn);
                 if (this.state.isSwitchOn) {
                    this.setMicrophoneFilter('none');
                 } else {
                 this.setMicrophoneFilter('hard');
                 }
                }
              }
            />
          </View>

        </View>
    );

  }
}

const mapStateToProps = (state) => {
  console.log(state);

  return {
    categories: state.categories,
    apps: state.apps
  };
}

export default connect(mapStateToProps)(withTheme(MicrophoneFilter));