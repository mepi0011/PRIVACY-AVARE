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
import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import {
    createSwitchNavigator,
    createDrawerNavigator
} from 'react-navigation';

import { store } from './src/redux/store';
import { theme } from './src/styles/theme';

import SideBar from './src/views/_shared/SideBar';
import PreferenceStack from './src/views/preferences/PreferenceStack';
import PrivacyStatement from './src/views/informative/PrivacyStatement';
import AvareBoxStartScreen from './src/views/preliminary/AvareBoxStartScreen';

import LoadingScreen from './src/views/welcome/LoadingScreen';
import WelcomeScreen from './src/views/welcome/WelcomeScreen';
//import TransferProfile from './src/views/syncronization/TransferProfile';
import AppIntro from './src/views/welcome/AppIntro';

// The main app: containing all links to screens in the drawer
const MainStack = createDrawerNavigator(
    {
        Home: {
            screen: PreferenceStack
        },
        Privacy: {
            screen: PrivacyStatement
        },
        AvareBox: {
            screen: AvareBoxStartScreen
        }
        // TODO: Further Options in Drawer like initialize sync, deconnect from sync, about, help etc...
    },
    {
        contentComponent: props => <SideBar {...props} />,
        title: 'AVARE'
    }

)

// The root stack: containing a welcome Screen and the Main App
const RootStack = createSwitchNavigator(
    {
        Loading: {
            screen: LoadingScreen
        },
        Welcome: {
            screen: WelcomeScreen
        },
        Main: {
            screen: MainStack
        },
//        Transfer: {
//            screen: TransferProfile,
//        },
        Intro: {
            screen: AppIntro
        },
    },
    {
        initialRouteName: 'Loading',
        navigationOptions: {
            header: null,
        }
    }
)

//Added Provider to supply the store
export default class App extends React.Component {
    render() {
        return (
            <StoreProvider store={store}>
                <PaperProvider theme={theme}>
                    <RootStack />
                </PaperProvider>
            </StoreProvider>

        );
    }
}