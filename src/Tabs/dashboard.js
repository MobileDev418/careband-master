import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions
} from 'react-native';

import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import { onFetch } from '../modules/NotiService';
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import DashActive from './dashactive'
import DashCleared from './dashcleared'

import logoImg from '../images/official_logo.png';
import userprofileImg from '../images/userprofile.png';

const DEVICE_WIDTH = Dimensions.get('window').width;

const initialLayout = {
    height: 0,
    width: DEVICE_WIDTH,
};
  
class TabDashBoard extends Component {
    static propTypes = {
        openMenu : PropTypes.func
    }
    state = {
        index: 0,
        routes: [
          { key: 'active', title: 'Active' , color : '#111111'},
          { key: 'cleared', title: 'Cleared' , color : '#f5f5f5' },
        ],
      };
    componentWillMount(){ 
        
        this.props.onFetch();

    }
      _handleIndexChange = index => this.setState({ index });
      _renderLabel = (props) => ({ route, index }) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
 
        const colorRange = inputRange.map(inputIndex => {
            if (inputIndex === index) 
                return '#3eb8be';
            else {
                return '#ffffff';
            } 
        });  
        const color = props.position.interpolate({ 
            inputRange : inputRange,
            outputRange: colorRange
        }); 
        
        const backgroundColorRange = inputRange.map(inputIndex => {
            if (inputIndex === index) 
                return '#ffffff';
            else {
                return '#d8d8d8';
            } 
        });  
        const backgroundColor = props.position.interpolate({ 
            inputRange : inputRange,
            outputRange: backgroundColorRange
        });

        return (  
            <Animated.View style={[styles.tablabel,{backgroundColor}]}>
                <Animated.Text style = {[{fontSize : 17},{color}]}>
                    {route.title}                   
                </Animated.Text> 
            </Animated.View> 
        );
      };
      _renderHeader = props => 
            <TabBar 
                {...props} 
                style = {{backgroundColor : '#d8d8d8', height : 40}}
                indicatorStyle = {{backgroundColor : '#d8d8d8'}}
                labelStyle = {{color : 'white',fontWeight : '400'}}                  
                renderLabel = {this._renderLabel(props)}  
        
             />;
    
    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'active':
                return <DashActive activeData = {this.props.notidata} listStyle = {[ styles.container_tabview]} />;
            case 'cleared':
                return <DashCleared clearedData = {this.props.notidata} listStyle = {[ styles.container_tabview]} />;                
            default:
                return null;
        }
    }
    render (){
        return (
            <View style= {styles.container}>
                <NavBar
                  
                  isCenterImg = {true}
                  isCenterShow = {'flex'}
                  centersource = {logoImg}

                  isLeftImg = {true}
                  isLeftShow = {'flex'}
                  leftsource = {userprofileImg}
                  leftAction = {this.props.openMenu}
                  
                  
                  isRightImg = {true}
                  rightsource = {userprofileImg}
                  isRightShow = {'none'}
                  
                  tag = {'Dashboard'}
                  
                />
                <TabViewAnimated
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
            </View>
        )
    }    
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
        backgroundColor : '#F5FCFF'
    },  
    container_tabview: {
        flex:1,
    },
    tablabel: {
        flex : 1,
        top : -4,
        width : DEVICE_WIDTH / 2.1,
        height : 32,
        bottom : 0,
        alignItems: 'center',
        justifyContent : 'center',  
        marginRight : 4,
        marginLeft : 4,
        borderRadius : 6
    },
    
});
const  mapStateToProps = (state , props)  => {
    return {
      notidata : state.notiService.data
    }
}
const mapDispatchToProps = (dispatch) => {
    return {      
      onFetch : () => {dispatch(onFetch())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabDashBoard)
