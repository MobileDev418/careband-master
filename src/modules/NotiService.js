import { AsyncStorage } from "react-native";
import {
  nursemodel,
  notifications,
  residentmodel,
  notemodel,
  batterymodel
} from "../data/testuesr";
import R from "ramda";

const initState = {
  isFetch: false,
  isUpdate: false,
  isError: false,
  isWrite: false,
  data: []
};

const FETCHNOTI = "FETCHNOTI";
const FETCHNOTISUCCESS = "FETCHNOTISUCCESS";
const FETCHNOTIFAILED = "FETCHNOTIFAILED";

const UPDATEDATA = "UPDATEDATA";
const UPDATESUCCESS = "UPDATESUCCESS";
const UPDATEFAILED = "UPDATEFAILED";
var userid = "";
AsyncStorage.getItem("USERID").then(value => (userid = value));

const NOTEWRITE = "NOTEWRITE";

export default function reducer(state = initState, action = {}) {
  console.log("reducer", action);
  switch (action.type) {
    case FETCHNOTI:
      if (userid.length > 0) {
        return Object.assign({}, state, {
          isFetch: true,
          isError: false,
          data: getNotiWithUserId(userid)
        });
      } else {
        AsyncStorage.getItem("USERID").then(value => {
          userid = value;
          return Object.assign({}, state, {
            isFetch: true,
            isError: false,
            data: getNotiWithUserId(userid)
          });
        });
      }
    case FETCHNOTISUCCESS: {
      return Object.assign({}, state, {
        isFetch: true,
        isError: false
      });
    }
    case FETCHNOTIFAILED: {
      return Object.assign({}, state, {
        isError: true
      });
    }

    case UPDATEDATA: {
      updateStatus(action.notiId, action.status);
      if (userid.length > 0) {
        return Object.assign({}, state, {
          isUpdate: true,
          isError: false,
          data: getNotiWithUserId(userid)
        });
      } else {
        AsyncStorage.getItem("USERID").then(value => {
          userid = value;
          return Object.assign({}, state, {
            isUpdate: true,
            isError: false,
            data: getNotiWithUserId(userid)
          });
        });
      }
    }
    case UPDATESUCCESS: {
      return Object.assign({}, state, {
        isUpdate: true,
        isError: false
      });
    }
    case UPDATEFAILED: {
      return Object.assign({}, state, {
        isUpdate: false,
        isError: true
      });
    }
    case NOTEWRITE: {
      return Object.assign({}, state, {
        isWrite: updateNote(action.note, action.notiid)
      });
    }
    default:
      return state;
  }
}

export const onFetch = () => {
  return {
    type: FETCHNOTI
  };
};
export const onFetchFailed = () => {
  return {
    type: FETCHNOTIFAILED
  };
};

export const onFetchSuccess = () => {
  return {
    type: FETCHNOTISUCCESS
  };
};
export const updateData = (notiId, status) => {
  return {
    type: UPDATEDATA,
    notiId: notiId,
    status: status
  };
};
export const updateDataSuccess = notiId => {
  return {
    type: UPDATESUCCESS
  };
};
export const updateDataFailed = () => {
  return {
    type: UPDATEFAILED
  };
};

export const onWriteNote = (note, notiid) => {
  return {
    type: NOTEWRITE,
    note: note,
    notiid: notiid
  };
};
function getNotiWithUserId(userid) {
  var notidata = [];
  if (userid == undefined) {
    return notidata;
  } else {
    notifications.forEach(row => {
      if (row.sender._id === userid) {
        notidata.push(row);
      }
    });
    return notidata;
  }
}
function updateNote(note, notiid) {
  var result = true;
  const checkIndex = R.findIndex(R.propEq("_id", note._id))(notemodel);
  if (checkIndex != -1) {
    R.update(note, checkIndex, notemodel);
  } else {
    notemodel.push(checkIndex);
  }
  const checkNotiIdx = R.findIndex(R.propEq("_id", notiid))(notifications);

  if (checkNotiIdx != -1) {
    notifications[checkNotiIdx].note = note;
  } else {
    result = false;
  }
  return result;
}
function updateStatus(notiId, status) {
  const checkIndex = R.findIndex(R.propEq("_id", notiId))(notifications);
  notifications[checkIndex].status = status;
  return true;
}
