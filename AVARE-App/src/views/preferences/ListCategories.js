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
//List all App-Categories (starting with predefined list). Provide possibility to add/remove Category. (optional) Provide possibility to sort apps.
import React from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  FlatList
} from 'react-native';
import { Dialog, Paragraph, Button, withTheme, FAB, Divider, List, TouchableRipple } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';


import { connect } from 'react-redux';
import HomeHeader from '../_shared/HomeHeader';

import { dontShowAgain } from '../../redux/modules/disclaimer/action';

// import InstalledApps from 'react-native-installed-packages';

class ListCategories extends React.Component {
  //static navigationOptions = {
  //  header: ({ state }) => <HomeHeader onAddCategoryPressed={state.params.onAddCategoryPressed} />,
  //}
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      header: state.params ? <HomeHeader onAddCategoryPressed={state.params.onAddCategoryPressed} /> : <HomeHeader />
    }
  }
  constructor(props) {
    super(props);

    //async storage lesen

    this.state = {
      //disclaimerVisible: true,

      // Hier async storage  und als state einfügen. 

      dialogVisible: false,
      newCategoryName: '',
    }
  }
  componentWillMount() {
    const { setParams } = this.props.navigation;
    setParams({ onAddCategoryPressed: this._showDialog.bind(this) });
  }

  //componentDidMount() {
  //  // Keyboard.addListener('keyboardDidHide', () => this._keyboardDidHide());
  //  this.navigation.setParams({
  //    onAddCategoryPressed: this._onAddCategoryPressed
  //  })
  //}

  _showDialog() {
    console.log('Adding Category')
    this.setState({ dialogVisible: true })

  }
  _hideDialog() {
    this.setState({ dialogVisible: false })

  }

  //_showDisclaimer() {
  //  this.setState({ disclaimerVisible: true })
  //}

  _hideDisclaimer = async () => {
    try {
      console.log("Wert schreiben")
      await AsyncStorage.setItem("disclaimer", "Hallo aus async storage!")
      console.log("Müsste gehen");
    } catch (e) {
      console.log(e);
    }

    console.log('Wert in async Storage geschrieben')
  }

  _getMyValue = async () => {
    console.log("getValueListCategories sagt hi");
    try {
      console.log("Wert lesen:");
      let value = await AsyncStorage.getItem("disclaimer");
      console.log("Wert:");
      console.log(value + " ist der Text");
      if (value == false) {
        console.log("Value ist richtig geladen omg");
      }
      //if (value = "false") {
      // this.props.dispatch(dontShowAgain());
      //}
    } catch (e) {
      console.log("Fehler aufgetreten");
    }

    console.log('async Storage geladen und verarbeitet')

  }
  /*_hideDisclaimer() {
    this.props.disclaimer.disclaimerVisible = false
  }*/

  /*_storeData = async () => {
    try {
      await AsyncStorage.setItem("disclaimerVisible", true)
    } catch (err) {
      console.log(err);
    }
  } */

  /*_getData = async () => {
    try {
      const value = await AsyncStorage.getItem('disclaimerVisible')
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }*/


  // clear text input when keyboard hides
  _keyboardDidHide() {
    this._textInput.setNativeProps({ text: '' });
  }

  _onChangeText(text) {
    this.setState({ newCategoryName: text });
  }


  render() {

    const { colors } = this.props.theme;
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>

        <ScrollView>

          <List.Section title="Eigene Kategorien">
            <Divider />
            <FlatList
              data={this.props.ownCategories}
              keyExtractor={(item, index) => item._id}
              ItemSeparatorComponent={() => { return (<Divider />) }}
              renderItem={({ item }) =>
                <TouchableRipple
                  onPress={() => {
                    //TODO: shorter Timeout or is it performance problem?
                    setTimeout(() => {
                      this.props.navigation.navigate('Category', { context: 'category', contextID: item._id, categoryName: item.name });
                    });
                  }}
                // background={TouchableNativeFeedback.SelectableBackground()}
                // rippleColor="rgba(0, 0, 0, .32)"
                >
                  <List.Item
                    title={item.name}
                    left={(props) => <List.Icon {...props} icon="folder" />}
                    description={(() => {
                      if (item.count == 0) {
                        return "Noch keine Apps"
                      } else if (item.count == 1) {
                        return "Eine App"
                      } else {
                        return item.count + " Apps"
                      }
                    })()
                    }
                  />
                </TouchableRipple>
              }
            />

            <Divider />
          </List.Section>
          <List.Section title="AVARE-Kategorien">
            <Divider />
            <FlatList
              data={this.props.predefinedCategories}
              keyExtractor={(item, index) => item._id}
              ItemSeparatorComponent={() => { return (<Divider />) }}
              renderItem={({ item }) =>
                <TouchableRipple
                  onPress={() => {
                    //TODO: shorter Timeout or is it performance problem?
                    setTimeout(() => {
                      this.props.navigation.navigate('Category', { context: 'category', contextID: item._id, categoryName: item.name });
                    });
                  }}
                // background={TouchableNativeFeedback.SelectableBackground()}
                // rippleColor="rgba(0, 0, 0, .32)"
                >
                  <List.Item
                    title={item.name}
                    left={(props) => <List.Icon {...props} icon="folder" />}
                  />
                </TouchableRipple>
              }
            />
          </List.Section>

        </ScrollView>
        {/* TODO: pull this in HomeHeader. Then we also don't have to push functions around */}
        {/* may also fix backdrop issue */}


        <Dialog
          title="Disclaimer"
          //this.props.disclaimer....
          // vielleicht hier async storage abfragen ? ...
          visible={this.props.disclaimer.disclaimerVisible} //this.props.disclaimer.disclaimerVisible
          dismissable={false}>
          <Dialog.Title>Disclaimer</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Die App befindet sich im frühen Entwicklungsstadium</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                this.props.dispatch(dontShowAgain())
                console.log("OK Button gedrückt, nichts passiert.");
                //this._hideDisclaimer.bind(this)   //wieso .bind(this) ?

              }}>
              OK
            </Button>

            <Button
              onPress={() => {
                this.props.dispatch(dontShowAgain())

                console.log("Don t show again Button gedrückt");
                console.log("Wert schreiben:");
                this._hideDisclaimer();
                console.log("fertig. Jetzt Wert lesen:");
                this._getMyValue();

              }
              }>
              don t show again
              </Button>
          </Dialog.Actions>
        </Dialog>


        <Dialog
          //title="Alert"  !!!!  bei onDismiss={this._hideDialog.bind(this)} ?
          visible={this.state.dialogVisible}
          onDismiss={null}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this._hideDialog.bind(this)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
        <FAB
          icon="apps"
          label="Apps verwalten"
          onPress={() => {
            this.props.navigation.navigate('Apps');
          }}
          style={{ position: 'absolute', alignSelf: 'flex-end', margin: 16, right: 0, bottom: 0 }}
        />

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let categories = state.categories;
  //TODO: also self-created categories with zero apps
  let ownCategories = [];
  let predefinedCategories = [];
  for (let i = 0; i < categories.length; i++) {
    let appsInCategory = state.apps.filter((app) => app.category_id == categories[i]._id)
    categories[i].count = appsInCategory.length;
    if (categories[i].count > 0) {
      ownCategories.push(categories[i]);
    } else {
      predefinedCategories.push(categories[i]);
    }
  }
  console.log(state);
  return {
    ownCategories,
    predefinedCategories,
    disclaimer: state.disclaimer
  };
}

export default connect(mapStateToProps)(withTheme(withNavigation(ListCategories)));