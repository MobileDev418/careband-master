import { AsyncStorage } from 'react-native'
import { residentmodel, notemodel, batterymodel } from "../data/testuesr";
import { onFetch } from './NotiService'
import R from 'ramda'
const NOTIFICATION = 'NOTIFICATION';
const RESIDENT = 'RESIDENT';
const RESIDENTUPDATEFAILED = 'RESIDENTUPDATEFAILED';
const RESIDENTUPDATESUCCESS = 'RESIDENTUPDATESUCCESS';
const RESIDENTUPDATE = 'RESIDENTUPDATE';
const GETRESIDENTNOTES = 'GETRESIDENTNOTES';
const GETRESIDENTBATTERY = 'GETRESIDENTBATTERY';
const LOCATE = 'LOCATE';

const initState = {
    isNotification : true,    
    isResident : false,
    isResidentShow : true,
    isResidentUpdating : false,
    isResidentUpdate : false,
    resident : null,
    residents : [] ,
    notes : [],
    batteries : [],
    isLocate : false, 
    locates : [], 
}
var userid;
AsyncStorage.getItem('USERID').then((value) => userid = value);
export default function reducer(state = initState, action = {}){
    console.log('reducer',action)
    switch (action.type){
        case NOTIFICATION :
             return Object.assign(
                {},state, {
                    isNotification : true,
                    isResident : false,
                    isLocate : false,
               }
            ); 
        case RESIDENT : {
            return Object.assign(
                {},state, {
                    isNotification : false,
                    isResidentShow : true,
                    isResident : true,
                    isLocate : false,
                    residents : getResidentsWithUserId(userid)
                }
            ); 
        };
        case RESIDENTUPDATE : {
            return Object.assign(
                {},state, {
                    isNotification : false,
                    isResidentShow : false,
                    isResident : true,
                    isLocate : false,
                    resident : getResident(action.residentid)
                }
            ); 
        };
        case RESIDENTUPDATEFAILED : {
            return Object.assign(
                {},state, {
                    isNotification : false,
                    isResidentShow : true,
                    isResident : true,
                    isLocate : false,                   
                }
            ); 
        };
        case RESIDENTUPDATESUCCESS : {
            updateResidentProfile(action.residentObj)
            onFetch()
            return Object.assign(
                {},state, {
                    isNotification : false,
                    isResidentShow : action.isResidentShow,
                    isResident : true,
                    isLocate : false,
                    residents : getResidentsWithUserId(userid)
                }
            ); 
        };
        case GETRESIDENTNOTES : {
            return Object.assign(
                {},state, {
                    isResidentShow : false,
                    isNotification : false,
                    isResident : true,
                    isLocate : false,
                    notes : getResidentNotes(action.residentid)
                }
            ); 
        };
        case GETRESIDENTBATTERY : {
            return Object.assign(
                {},state, {
                    isResidentShow : false,
                    isNotification : false,
                    isResident : true,
                    isLocate : false,
                    batteries : getResidentsBattery(action.residentid)
                }
            ); 
        };
        case LOCATE : {
            return Object.assign(
                {},state, {
                    isNotification : false,
                    isResident : false,
                    isLocate : true,
                    locates : getLocations(action.residentid)
                }
            ); 
        };
        default : 
            return state;
    }
}

export const notification = (userid) => {
    return {
        type : NOTIFICATION
    }
}
export const resident = (userid) => {
    return {
        type : RESIDENT
    }
}
export const residentupdate = (residentid)=> {
    return {
        type : RESIDENTUPDATE,
        residentid : residentid
    }
}
export const residentupdatesuccess = (residentObj) => {
    return {
        type : RESIDENTUPDATESUCCESS,
        residentObj : residentObj
    }
}
export const residentupdatefailed = () => {
    return {
        type : RESIDENTUPDATEFAILED
    }
}
export const residentNotes = (residentid) => {
    return {
        type : GETRESIDENTNOTES,
        residentid : residentid        
    }
}
export const residentsBattery = (residentid) => {
    return {
        type : GETRESIDENTBATTERY,
        residentid : residentid        
    }
}
export const locate = (residentid) => {
    return {
        type : LOCATE,
        residentid : residentid
    }
}

function getLocations(residentid){
    var result = [];
    if (residentid == undefined){
        residentmodel.forEach(row => {
            result.push(row)
        })
    }else{
        const res = R.find(R.propEq('_id',residentid))(residentmodel)
        result.push(res);
    }
    return result;
}
function getResident(residentid){
    return R.find(R.propEq('_id',residentid))(residentmodel);
}
function getResidentsWithUserId(userid){
    return R.filter(R.propEq('receiverid',userid),residentmodel);    
}

function updateResidentProfile(residentObj){    
    const checkIndex = R.findIndex(R.propEq('_id',residentObj._id))(residentmodel)
    if (checkIndex != -1){
        R.update(residentObj,checkIndex,residentmodel)
    }else{
        residentmodel.push(residentObj)
    }
}

function  getResidentNotes(residentsId){    
    return R.filter(R.propEq('receiverid',residentsId),notemodel); 
}
function getResidentsBattery(residentId){
    return R.filter(R.propEq('receiverid',residentId),batterymodel); 
}

