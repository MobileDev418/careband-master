import R from 'ramda'
function GetTime(curdate) {  
    var date, TimeType, hour, minutes, seconds, fullTime;
    date = new Date(curdate);    
    hour = date.getHours(); 
    if(hour <= 11)
    {
      TimeType = 'AM';
    }
    else{
      TimeType = 'PM';
    }
    if( hour > 12 )
    {
      hour = hour - 12;
    }
    if( hour == 0 )
    {
        hour = 12;
    } 
    minutes = date.getMinutes();
    if(minutes < 10)
    {
      minutes = '0' + minutes.toString();
    }
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
    return fullTime
}
function GenUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function sortname(a, b){
    if (a.firstname < b.firstname)
      return -1;     
    if (a.firstname > b.firstname)
      return 1;
    return 0;
}
function sortreceivername(a, b){
  if (a.receiver.firstname < b.receiver.firstname)
    return -1;     
  if (a.receiver.firstname > b.receiver.firstname)
    return 1;
  return 0;
}
function trim (str) {
  return str.replace(/^\s+|\s+$/gm,'');
}
function rgbaToHex (rgba) {
  var parts = rgba.substring(rgba.indexOf("(")).split(","),
      r = parseInt(trim(parts[0].substring(1)), 10),
      g = parseInt(trim(parts[1]), 10),
      b = parseInt(trim(parts[2]), 10),
      a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2);

  return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + (a * 255).toString(16).substring(0,2));
}
export {
    GetTime,
    GenUUID,
    sortname,
    sortreceivername,
    rgbaToHex
}