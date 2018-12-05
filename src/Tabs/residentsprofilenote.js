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

import {tabService , residentNotes} from '../modules/TabService'
import { connect } from 'react-redux'

import RowNote from '../components/ListView/RowNote'
import Header from '../components/ListView/Header'
import SectionHeader from '../components/ListView/SectionHeader'
import Footer from '../components/ListView/Footer'


class ProfileNote extends Component {
  static propTypes = {
      residentid : PropTypes.string,
      listStyle : PropTypes.any,
      handler : PropTypes.func
  }
  constructor(props) {
    super(props)
  }
  componentWillMount(){    
    this.props.residentNotes(this.props.residentid);
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
    this.onLoaddata(this.props.notes);    
    return (
        <ListView
          style={this.props.listStyle}
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(data) => <RowNote data = {data} />}
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
    notes : state.tabService.notes
  }
}  
const mapDispatchToProps = (dispatch) => {
  return {      
      residentNotes : (residentid) => {dispatch(residentNotes(residentid))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileNote)

