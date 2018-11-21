import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import FormSignUp from './FormSignup';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <Logo/>
        <FormSignUp />
        <ButtonSubmit />
      </Wallpaper>
    );
  }
}
