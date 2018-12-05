/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import {tabService , residentsBattery} from '../modules/TabService'
import { connect } from 'react-redux'
import RowBattery from '../components/ListView/RowBattery'
class ProfileBattery extends Component {

  static propTypes = {
      residentid : PropTypes.string,
      listStyle : PropTypes.any,
      handler : PropTypes.func
  }
  constructor(props) {
    super(props)
  }
  componentWillMount(){    
    this.props.residentsBattery(this.props.residentid);
  }
  onLoaddata(data){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2        
    });
    this.state = {
      dataSource: ds.cloneWithRows(data)
    }
  }
  render() {
    this.onLoaddata(this.props.batteries)
    return (
        <ListView
          style={this.props.listStyle}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={(data) => <RowBattery data = {data}/>}
          renderSeparator={() => <View style={styles.separator} />}
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
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e7e7e7',
  },
});
const  mapStateToProps = (state , props)  => {
  return {    
    batteries: state.tabService.batteries
  }
}  
const mapDispatchToProps = (dispatch) => {
  return {            
      residentsBattery : (residentid) => {dispatch(residentsBattery(residentid))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileBattery)

