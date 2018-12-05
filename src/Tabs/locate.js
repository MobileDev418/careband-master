import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import NavBar from '../components/NavBar'
import Indoor from './locateindoor'
import OutDoor from './locateoutdoor'
import {Actions, ActionConst} from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import logoImg from '../images/locate_title.png';
import locateOutImg from '../images/OutdoorButton.png';
import locateInImg from '../images/IndoorButton.png';
import userprofileImg from '../images/userprofile.png';
class TabLocate extends Component {
    static propTypes = {
        openMenu : PropTypes.func,
        data : PropTypes.any
    }
    constructor(props){
        super(props);
        this.state = {
            isindoor : true
        }
        this.onRightTapped = this.onRightTapped.bind(this);
    }

    onRightTapped(){
        const {isindoor} = this.state;
        if (isindoor){
            this.setState({ isindoor : false })
        }else{
            this.setState({ isindoor : true })
        }
        
    }
    render (){   
 
        return (
            <View style= {styles.container}>
                <NavBar
                    isCenterImg = {false}
                    centersource = {logoImg}
                    isCenterShow  = {'flex'}
                    title = {'Map'}

                    isRightImg = {true}
                    rightsource = {this.state.isindoor ? locateInImg : locateOutImg }
                    isRightShow  = {'flex'}
                    rightAction = {this.onRightTapped}  
                    rightText = {''}

                    isLeftImg = {true}
                    leftsource = {userprofileImg}
                    isLeftShow  = {'flex'}
                    leftAction = {this.props.openMenu}
                    leftText = {''}
                />                
                {                    
                    this.state.isindoor === true ? <OutDoor data = {this.props.data}/> : <Indoor data = {this.props.data}/>
                }
            </View>
        )
    }    
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
        backgroundColor : '#F5FCFF'
    }
})

export default TabLocate