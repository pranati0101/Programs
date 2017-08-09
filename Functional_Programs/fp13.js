var startTime, endTime;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = (endTime - startTime)/1000; //in ms
//  timeDiff /= 1000;
  var seconds = Math.round(timeDiff);
  document.write(seconds + " sec");
}
