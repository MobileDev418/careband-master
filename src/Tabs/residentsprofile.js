import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  PixelRatio,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'
import ProfileNote from './residentsprofilenote'
import ProfileBattery from './residentsprofilebattery'
import NavBar from '../components/NavBar'
import ImagePicker from 'react-native-image-picker';
import cameraImg from '../images/Camera_Icon.png';
import backImg from '../images/back.png'

const DEVICE_WIDTH = Dimensions.get('window').width;
const initialLayout = {
    height: 0,
    width: DEVICE_WIDTH,
};
class ResidentsProfile extends Component {
    static propTypes = {
        handlerleft : PropTypes.func,        
        handlerright : PropTypes.func,
        data : PropTypes.any
    }
    state = {
        index: 0,
        routes: [
          { key: 'note', title: 'Note' , color : '#111111'},
          { key: 'battery', title: 'Battery' , color : '#f5f5f5' },
        ],
        avatarSource: null,
        isTakePhoto : false
    };   
    constructor(props){
        super(props);
    } 
    componentWillMount(){
        residentId = this.props.data._id;          
        this.setState({
            avatarSource: this.props.data.photo,
            isTakePhoto : true,
        });      
    }
      selectPhotoTapped() {
        this.state.isTakePhoto = false;
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {           
            const uri =  'data:image/jpeg;base64,' + response.data;
            this.setState({
              avatarSource: 'data:image/jpeg;base64,' + response.data,
              isTakePhoto : true,
            });
            if(uri.length > 5){
                this.props.data.photo = uri;
                this.props.handlerright(this.props.data)
            }
          }
        });
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
            case 'note':
                return <ProfileNote residentid = {this.props.data._id} listStyle = {styles.container_tabview}/>;
            case 'battery':
                return <ProfileBattery residentid = {this.props.data._id} listStyle =  {styles.container_tabview}/>;
            default:
                return null;
        }
    }
    onLoadTakePhoto(){        
        return (
            <View style={[styles.avatar, styles.avatarContainer]}>
                { 
                    this.state.isTakePhoto === false ? 
                    <Image style = {styles.imgphoto} source = {cameraImg}/> :
                    <Image style={styles.avatar} source={ {uri : this.state.avatarSource}}/>
                }
            </View>
        )
    }
    render (){
        return (
            <View style= {styles.container}>
                <NavBar
                    isCenterImg = {false}                    
                    isCenterShow  = {'flex'}
                    title = {`${this.props.data.firstname} ${this.props.data.lastname}`}
        
                    isRightImg = {false}
                    isRightShow  = {'none'}                   
                    rightText = {''}
                    rightAction = {() => {
                        this.props.handlerright(this.props.data)
                    }} 
        
                    isLeftImg = {true}
                    leftsource = {backImg}
                    isLeftShow  = {'flex'}
                    leftAction = {() => {
                        this.props.handlerleft()
                    }}
                    leftText = {''} 
                />
                <View style = {styles.container_photo}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        {this.onLoadTakePhoto(this.props.data)}
                    </TouchableOpacity>
                </View>
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
    container_photo: {
        height : 160,
        alignItems : 'center',
        justifyContent : 'center',        
    },
    imgphoto: {
        width : 120,        
        height :120,
        borderRadius : 60,
        alignItems : 'center',
        justifyContent : 'center',
        resizeMode : 'cover'
    },
    container_tabview: {
        flex:1,
    },
    sel_tabbar : {
        width : DEVICE_WIDTH / 2.1,
        height : 30,
        top : -2,
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : 4,
        marginLeft : 4,
        borderRadius : 2
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
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
      },
    avatar: {
        borderRadius: 60,
        width: 120,
        height: 120
    },

    containertab: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#e7e7e7',
    },
});
export default ResidentsProfile
