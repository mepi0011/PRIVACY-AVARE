import { DefaultTheme } from 'react-native-paper';
//Styling
export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#fed767',
        accent: '#fed767',
        background: 'white',
        surface: 'white',
        text: '#352a15',
        backdrop: 'rgba(52, 52, 52, 0.8)',
        primaryDark: '#c8a637',
        primaryLight: '#ffff98'
    },
    fonts: {
        ...DefaultTheme.fonts,
        regular: 'Rubik-Regular',
        medium: 'Rubik-Medium',
        light: 'Rubik-Light',
        thin: 'Rubik-LightItalic'
    }
}