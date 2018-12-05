import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View
} from 'react-native';

import { residentupdate, residentupdatefailed, residentupdatesuccess, locate } from '../modules/TabService'
import { onFetch } from '../modules/NotiService'
import { connect } from 'react-redux'

import ResidentsContent  from './residentscontent'
import ResidentsProfile  from './residentsprofile'

class TabResidents extends Component {
    static propTypes = {
        openMenu : PropTypes.func,
        data : PropTypes.any
    }
    constructor(props){
        super(props)
        this.state = {
            isprofileview : true
        }     
        this.onGoProfile = this.onGoProfile.bind(this);   
        this.onGoContent = this.onGoContent.bind(this);
        this.onUpdateProfile = this.onUpdateProfile.bind(this);
        this.onGoLocate = this.onGoLocate.bind(this);
    }
    onLoadContent(){
        return (
            <ResidentsContent handler = {this.onGoProfile} handlermenu = {this.props.openMenu} handlerlocate ={this.onGoLocate} listStyle = {[ styles.container_tabview]} data = {this.props.data}/>
        )
    }
    onLoadProfile(){
        return (
            <ResidentsProfile handlerleft = {this.onGoContent} handlerright = {this.onUpdateProfile} data = {this.props.resident}/>
        )
    }
    onGoProfile(residentid){        
        this.props.residentupdate(residentid);
    }
    onGoContent(){
        this.props.residentupdatefailed();
    }
    onUpdateProfile(residentObj){        
        this.props.residentupdatesuccess(residentObj,false); 
        this.props.onFetch();       
    }
    onGoLocate(residentId){        
        this.props.onLocateShow(residentId);
    }
    render (){
        return (
            <View style= {styles.container}>
                {
                    this.props.isResidentShow === true ? this.onLoadContent() : this.onLoadProfile()
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
    },
    container_tabview: {
        flex:1,
    },
})

const  mapStateToProps = (state , props)  => {
    return {
      isResidentShow : state.tabService.isResidentShow,    
      resident : state.tabService.resident,
      residens : state.tabService.residens
    }
  }  
  const mapDispatchToProps = (dispatch) => {
    return {      
        residentupdate : (residentid) => {dispatch(residentupdate(residentid))},
        residentupdatefailed : () => {dispatch(residentupdatefailed())},
        residentupdatesuccess : (residentObj,isResidentShow) => {dispatch(residentupdatesuccess(residentObj,isResidentShow))},
        onLocateShow : (residentId) => {dispatch(locate(residentId))},
        onFetch : () => {dispatch(onFetch())} 
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TabResidents)