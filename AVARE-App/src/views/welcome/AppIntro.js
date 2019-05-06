

import React from 'react';
import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native';
import { withTheme, Button, Text, Title, Paragraph } from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux';
//import LinearGradient from 'react-native-linear-gradient';



class AppIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      //To show the main page of the app
    };
  }
  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };
  _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <ImageBackground source={require('./Background.png')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <Image source={item.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
        </ImageBackground>
      </View>
    );
  }
//  _renderSkipButton = () => {
//    return (
//      <View style={styles.buttonCircle}>
//          <Image source={require} />
//      </View>
//    );
//  }



  render() {
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
        <View
          style={{
            marginTop: 360,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Button mode='contained' onPress={() => { this.props.navigation.navigate('Main') }}>Zum Hauptmenü</Button>
        </View>
      );
    } else {
      //Intro slides
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides} //comming from the JsonArray below
          onDone={this._onDone} //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
//          renderSkipButton={this._renderSkipButton}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
//  mainContent: {
//    flex: 1,
//    alignItems: 'center',
//    justifyContent: 'space-around',
//  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 3,
//    margin: 150,
    width: Dimensions.get('window').width,
    height: undefined,
//    backgroundColor: 'black',
  },
  text: {
    flex: 2,
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
//    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 16,
//    backgroundColor: 'red',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
//    backgroundColor: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});

const slides = [
  {
    key: 's1',
    title: 'Willkommen bei AVARE',
    titleStyle: styles.title,
    text: 'Die App für eine zentrale und übersichtliche Verwaltung deiner Datenschutzpräferenzen.',
    textStyle: styles.text,
    image: require('./Intro_1.png'),
    imageStyle: styles.image,
//    backgroundColor: '#78B7DA',
  },
  {
    key: 's2',
    title: 'Bequem Daten schützen',
    titleStyle: styles.title,
    text: 'Füge Apps hinzu. Lege fest, welche Apps auf welche Daten zugreifen können.Genieße Datensicherheit.',
    textStyle: styles.text,
    image: require('./Intro_2.png'),
    imageStyle: styles.image,
  },
  {
    key: 's3',
    title: 'AVARE macht den Rest',
    titleStyle: styles.title,
    text: 'AVARE kümmert sich um die Durchsetzung deiner Präferenzen, auch auf anderen Geräten.',
    textStyle: styles.text,
    image: require('./Intro_3.png'),
    imageStyle: styles.image,
  },
];


export default connect()(withTheme(AppIntro))