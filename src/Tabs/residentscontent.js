/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import R from 'ramda'
import {  
  StyleSheet,
  ListView,  
  View
} from 'react-native';
import PropTypes from 'prop-types';
import SearchBar from 'react-native-search-bar'
import {sortname} from '../utils/utils'
import NavBar from '../components/NavBar'
import RowResident from '../components/ListView/RowResident'
import Header from '../components/ListView/Header'
import logoImg from '../images/resident_title.png';
import userprofileImg from '../images/userprofile.png';
class ResidentsContent extends Component {

  static propTypes = {
      listStyle : PropTypes.any,
      handler : PropTypes.any,
      handlermenu : PropTypes.any,
      handlerlocate : PropTypes.any,
      data : PropTypes.any
  }
  search = SearchBar;
  constructor(props) {
    super(props)
    this.onSearchFilter = this.onSearchFilter.bind(this)
    this.onLoadData(this.props.data);
  }
  componentWillMount(){
    
  }
  onLoadData(data){
      const sorteddata = R.sort(sortname,data)      
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2        
      });
      this.state = {
        dataSource: ds.cloneWithRows(sorteddata)
      }
  } 

  onSearchFilter(text){    
    const users = this.props.data.filter((user) => `${user.firstname}${user.lastname}`.toUpperCase().includes(text.toUpperCase()));
    const sorteddata = R.sort(sortname,users) 
    
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2        
    });
    this.setState({
        dataSource : ds.cloneWithRows(sorteddata)
    })
  }
  render() {   
    return ( 
        <View style = {styles.container}>
          <NavBar
            isCenterImg = {false}
            centersource = {logoImg}
            isCenterShow  = {'flex'}
            title = {'Residents'}

            isRightImg = {true}
            rightsource = {userprofileImg}
            isRightShow  = {'none'}
            rightText = {''}

            isLeftImg = {true}
            leftsource = {userprofileImg}
            isLeftShow  = {'flex'}
            leftAction = {this.props.handlermenu} 
            leftText = {''}            
          />

          <ListView
            style={this.props.listStyle}
            dataSource={this.state.dataSource}
            renderRow={(data) => <RowResident data = {data} handler = {this.props.handler} handlerlocate = {this.props.handlerlocate}/>}
            renderSeparator={() => <View style={styles.separator} />}
            renderHeader = {() =>  <SearchBar  
              placeholder = 'Search'
              searchBarStyle = 'prominent'
              showsCancelButton = {false}
              showsCancelButtonWhileEditing = {false}
              enablesReturnKeyAutomatically = {true}              
              onChangeText = {(text) => this.onSearchFilter(text)}
            />}
            enableEmptySections
          />    
        </View>  
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : 'column',
    backgroundColor : '#F5FCFF'
  },  
  separator: {
    flex: 1,
    left : 75,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e7e7e7',
  },
});

export default ResidentsContent

