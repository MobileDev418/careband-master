import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Scene } from "react-native-router-flux";
import { AsyncStorage, View, StyleSheet, Image, Dimensions } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";

import ViewMain from "./views/ViewMain";
import ViewCategory from "./views/ViewCategory";
import ViewWriteNote from "./views/ViewWriteNote";
import ResidentsProfile from "./Tabs/residentsprofile";
import ViewOutdoor from "./Tabs/locateoutdoor";

import ViewLogin from "./views/ViewLogin";
import ViewSignUp from "./views/ViewSignUp";
import ViewForgot from "./views/ViewForgotPass";
import logoImg from "./images/official_logo.png";
import { strings, colors } from "./constant/constant";
const DEVICE_WIDTH = Dimensions.get("window").width;
class MainNav extends Component {
  static propTypes = {
    isroot: PropTypes.bool
  };
  state = {
    isLoading: true,
    isLoggedIn: false
  };
  constructor(props) {
    super(props);
    this._onCheckCredential = this._onCheckCredential.bind(this);
  }
  async componentWillMount() {
    this._onCheckCredential();
  }
  _onCheckCredential() {
    AsyncStorage.getItem(strings.ACCESSTOKEN).then(accesstoken => {
      if (accesstoken != undefined && accesstoken.length > 0) {
        this.setState({
          isLoading: false,
          isLoggedIn: true
        });
      } else {
        this.setState({
          isLoading: false,
          isLoggedIn: false
        });
      }
    });
  }
  render() {
    // Toast.show(this.props.isMainNav.toString())
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner
            cancelable={true}
            visible={this.state.isLoading}
            textContent={""}
            textStyle={{ color: colors.MBLUE }}
            color={colors.MBLUE}
            overlayColor="rgba(62, 184, 190,0.25)"
          />
          <View style={styles.logocontainer}>
            <Image source={logoImg} style={styles.logoimage} />
          </View>
        </View>
      );
    } else {
      return (
        <Router>
          <Scene key="auth">
            <Scene
              key="viewLogin"
              component={ViewLogin}
              animation="fade"
              hideNavBar={true}
              initial={!this.state.isLoggedIn}
            />
            <Scene
              key="viewSignUp"
              component={ViewSignUp}
              animation="fade"
              hideNavBar={true}
            />
            <Scene
              key="viewForgot"
              component={ViewForgot}
              animation="fade"
              hideNavBar={true}
            />
            <Scene
              key="viewMain"
              component={ViewMain}
              animation="fade"
              hideNavBar={true}
              initial={this.state.isLoggedIn}
            />
            <Scene
              key="viewCategory"
              component={ViewCategory}
              animation="fade"
              hideNavBar={true}
            />
            <Scene
              key="viewWriteNote"
              component={ViewWriteNote}
              animation="fade"
              hideNavBar={true}
            />
            <Scene
              key="residentsProfile"
              component={ResidentsProfile}
              animation="fade"
              hideNavBar={true}
            />
            <Scene
              key="locateOutdoor"
              component={ViewOutdoor}
              animation="fade"
              hideNavBar={true}
            />
          </Scene>
        </Router>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: null,
    height: null
  },
  logocontainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  logoimage: {
    flex: 1,
    width: DEVICE_WIDTH - 160,
    height: 60,
    resizeMode: "contain"
  }
});
export default MainNav;
