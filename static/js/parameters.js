var count = 240;
var size = 5; 
var RT; 
var startTime;   
var response;
var data = [];
//Direction: -1 for left, 1 for right
var RL = 1;
var speed = 80;
var RL_List = [-1,1];
var coherence_List = [.1, .2, .3, .4, .5, .6, .7, .8];
var coherence = 0;
var dirn = 1;
var index = 0;
function norm() {
	var x = Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random();
 	x = (x - 3)/3;
 	return x;
}
function shuffling(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
function nextStep(){
  RL = shuffling(RL_List)[0];
  coherence = coherence_List[index];
  index += dirn;
  if (index >= coherence_List.length - 1)
    dirn = -1;
  if (index <= 0)
    dirn = 1;
}
function nextTrial() {
  RL = shuffling(RL_List)[0];
  coherence = shuffling(coherence_List)[1];
}
