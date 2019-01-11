/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {  
  StyleSheet,
  ListView,  
  View,
  AsyncStorage
} from 'react-native';
import R from 'ramda'
import PropTypes from 'prop-types';
import RowActive from '../components/ListView/RowActive'
import {sortreceivername} from '../utils/utils'

//redux
import { updateData} from '../modules/NotiService';
import { locate } from '../modules/TabService'
import { connect } from 'react-redux'
var userid;
AsyncStorage.getItem('USERID').then((value) => userid = value);


class DashActive extends Component {
  static _propTypes = {
      listStyle : PropTypes.any,
      activeData : PropTypes.any
  }
  constructor(props) {
    super(props)
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeLocate = this.onChangeLocate.bind(this);
  }
  componentWillMount(){    
  }
  onChangeStatus(data){
    if (data.status == 0){
       this.props.updateData(data._id, 1);
    }else if(data.status == 1){
       this.props.updateData(data._id, 2);
    }else if(data.status == 2){
       this.props.updateData(data._id, 0);
    }
  }
  onChangeLocate(data){     
     this.props.onLocateShow(data.receiver._id);
  }
  _onLoadData(data){    
    const sorteddata = R.sort(sortreceivername,data)      
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2        
    });
    this.state = {
      dataSource: ds.cloneWithRows(sorteddata)
    }
  } 
  render() {
    const { activeData } = this.props;  
    this._onLoadData(activeData);    
    return (
        <ListView   // active cards
          style={this.props.listStyle}
          dataSource={this.state.dataSource}
          renderRow={(data) => <RowActive 
            data = {data} 
            statushandler = {this.onChangeStatus} 
            locatehandler = {this.onChangeLocate}
          />}
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
const  mapStateToProps = (state , props)  => {
  return {
    isFetch : state.notiService.isFetch, 
    isUpdate : state.notiService.isUpdate    
  }
}
const mapDispatchToProps = (dispatch) => {
  return {          
    updateData : (notiId, status) => {dispatch(updateData(notiId,status))},
    onLocateShow : (residentId) => {dispatch(locate(residentId))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashActive)

