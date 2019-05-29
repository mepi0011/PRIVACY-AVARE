

import React from 'react';
import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native';
import { withTheme, Button, Text, Title, Paragraph } from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux';
import Icon from 'react-native-ionicons';

// Eventuell statt Hintergrundbild einen LinearGradient verwenden
//import LinearGradient from 'react-native-linear-gradient';



class AppIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      //Soll in AsyncStorage gespeichert werden
      //Wenn die Einführung einmal beendet oder übersprungen wurde
    };
  }


  //Festlegen der Funktionalitäten und Layouts der Elemente

  _onDone = () => {
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
  };
  _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <ImageBackground source={require('../../../assets/Intro_Background.png')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
          <Image style={item.imageStyle} source={item.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </ImageBackground>
      </View>
    );
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="close"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }

// Übergabe aller Elemente an die react-native-app-intro Library

  render() {
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return(
        this.props.navigation.navigate('Main')
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
          renderNextButton={this._renderNextButton}
          renderSkipButton={this._renderSkipButton}
          renderDoneButton={this._renderDoneButton}
        />
      );
    }
  }
}
const styles = StyleSheet.create({

  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 6,
//    margin: 150,
    width: Dimensions.get('window').width,
    height: undefined,
  },
  imageDetail: {
    flex: 100,
    width: 0.65*Dimensions.get('window').width,
    height: undefined,
    marginTop: 30,
  },
  text: {
    flex: 1,
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 100,
//    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 15,
  },
});

const slides = [
  {
    key: 's1',
    title: 'Willkommen bei AVARE',
    titleStyle: styles.title,
    text: 'Die App für eine zentrale und übersichtliche Verwaltung deiner Datenschutzpräferenzen.',
    textStyle: styles.text,
    image: require('../../../assets/Intro_1.png'),
    imageStyle: styles.image,
//    backgroundColor: '#78B7DA',
  },
  {
    key: 's2',
    title: 'Bequem Daten schützen',
    titleStyle: styles.title,
    text: 'Füge Apps hinzu. Lege fest, welche Apps auf welche Daten zugreifen können. Genieße Datensicherheit.',
    textStyle: styles.text,
    image: require('../../../assets/Intro_2.png'), //Icon made by Freepik from www.flaticon.com, Icon made by geotatah from www.flaticon.com
    imageStyle: styles.image,
  },
  {
    key: 's3',
    title: 'AVARE macht den Rest',
    titleStyle: styles.title,
    text: 'AVARE kümmert sich um die Durchsetzung deiner Präferenzen, auch auf anderen Geräten.',
    textStyle: styles.text,
    image: require('../../../assets/Intro_3.png'), //Icon made by Icongeek26 from www.flaticon.com, Icon made by Smashicons from www.flaticon.com
    imageStyle: styles.image,
  },
  {
    key: 's4',
    image: require('../../../assets/Intro_4.png'),
    imageStyle: styles.imageDetail,
  },
  {
    key: 's5',
    image: require('../../../assets/Intro_5.png'),
    imageStyle: styles.imageDetail,
  },
  {
    key: 's6',
    image: require('../../../assets/Intro_6.png'),
    imageStyle: styles.imageDetail,
  },
];


export default connect()(withTheme(AppIntro))