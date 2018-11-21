import React, {Component} from 'react';
import { TouchableOpacity , Text, View , StyleSheet, Alert} from 'react-native'
import PropTypes from 'prop-types';

import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';

import Logo from './Logo';
import FormLogin from './FormLogin';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';





export default class LoginScreen extends Component {

  _onPressSignUp(){
    Actions.secondScreen();
    // console.log('create account');
  };

  _onPressForgotPass(){
     Alert.alert('Forgot tapped');
    // console.log('forgot password');
  };

  render() {
    return (
      <Wallpaper>
        <Logo />
        <FormLogin />
        <SignupSection/>
        <ButtonSubmit />
      </Wallpaper>
    );
  }
}


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {    
    color: '#3eb8be',
    backgroundColor: 'transparent',
  },
});