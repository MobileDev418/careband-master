import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, TouchableOpacity, Alert, Button} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SignupSection extends Component {
  constructor() {
    super();
    this._onPressSignUp = this._onPressSignUp.bind(this);
    this._onPressForgotPass = this._onPressForgotPass.bind(this);
  }
  _onPressSignUp(){
    Actions.secondScreen();
    // console.log('create account');
  };

  _onPressForgotPass(){
    alert('ddddd');
    //  Alert.alert('Forgot tapped');
    // console.log('forgot password');
  };
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={this._onPressSignUp}>
            <Text style={styles.text}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressForgotPass}>
            <Text style={styles.text}>Forgot Password?</Text>
          </TouchableOpacity>
      </View>
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
