var startTime, endTime;
//to store start time
function start() {
  startTime = new Date();
};
//calculate time elapsed
function end() {
  endTime = new Date();
  //in ms
  var timeDiff = (endTime - startTime)/1000;
  var seconds = Math.round(timeDiff);
  alert(seconds + " sec");
}
