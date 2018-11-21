import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import ViewLogin from './ViewLogin';
import SecondScreen from './SecondScreen';
import ViewSignUp from './ViewSignUp'

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="viewLogin"
	          component={ViewLogin}
	        	animation='fade'
	          hideNavBar={true}
	          initial={true}
	        />
	        <Scene key="secondScreen"
	          component={SecondScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
					<Scene key="viewSignUp"
	          component={ViewSignUp}
	          animation='fade'
						hideNavBar={true}						
	        />
	      </Scene>
	    </Router>
	  );
	}
}