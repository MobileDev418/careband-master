import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import R from 'ramda'
import {sortreceivername} from '../utils/utils'
import RowCleared from '../components/ListView/RowCleared'


var userid;
AsyncStorage.getItem('USERID').then((value) => userid = value);
class DashCleared extends Component {
  static propTypes = {
      listStyle : PropTypes.any,
      clearedData : PropTypes.any
  }
  constructor(props) {
    super(props)
  }
  componentWillMount(){    
  }
  onChangeLocate(data){     
    this.props.onLocateShow(data.receiver._id);
 }
 _onLoadData(data){
   const notifications = data.filter((notification) => notification.status === 2);
   const sorteddata = R.sort(sortreceivername,notifications)      
   const ds = new ListView.DataSource({
     rowHasChanged: (r1, r2) => r1 !== r2        
   });
   this.state = {
     dataSource: ds.cloneWithRows(sorteddata)
   }
  } 
  render() {
    const { clearedData } = this.props;    
    this._onLoadData(clearedData);
    return ( 
        <ListView
          style={this.props.listStyle}
          dataSource={this.state.dataSource}
          renderRow={(data) => <RowCleared data = {data} />}
          renderSeparator={() => <View style={styles.separator} />}
          enableEmptySections
        />      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    left : 75,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e7e7e7',
  },
});
export default DashCleared

