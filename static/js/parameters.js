var count = 240;
var size = 5; 
var RT; 
var startTime;   
var response;
var data = [];
var trial_num = 0;
//Direction: -1 for left, 1 for right
var RL = 1;
var speed = 80;
var RL_List = [-1,1];
var coherence_List = [.1, .2, .3, .4, .5, .6, .7, .8, .7, .6, .5, .4, .3, .2, .1, .2, .3, .4, 
.2, .3, .4, .5, .6, .7, .8, .7, .6, .5, .4, .3, .2, 
.6, .5, .4, .3, .2, .1, .2, .3, .4, .5, 
.3, .4, .5, .6, .7, 
.4, .5, .6, .7, .8, .7, .6, .5, .4, 
.6, .5, .4, .3, .2, .1, 
.5, .4, .3, .2, .1, .2, .3, .4, .5, 
.2, .3, .4, .5, .6, .7, .8, .7, .6, .5, .4, .3, .2, .1, 
.4, .3, .2, .1, .2, .3, .4, .5, .6, .7, .8, 
.3, .4, .5, .6, .7, 
.4, .3, .2, .1, 
.3, .2, .1, .2, .3, .4, .5, .6, 
.2, .3, .4, .5, .6, .7, .8, 
.5, .6, .7, .6, .5, .4, .3,  
.7, .6, .5, .4, .5, .6, .7, .8, 
.5, .4, .3, .2, .1, 
.4, .3, .2, .1, 
.3, .2, .3, .4, .5, .6, .7, .8, .7, .6, .5, .4, .3, .2, 
.5, .4, .3, .2, .1, .2, 
.6, .5, .4, .3, .2, .1, .2, .3, .4, .5, .6, .7, .8, 
.6, .7, .8, .7, .6, .5, .4, .3, .2, 
.5, .4, .3, .2, .1, .2, .3, .4, .5, .6, .7, 
.4, .5, .6, .7, .8, .7, .6, .5, .4, .3, .2, .1, 
.4, .3, .2, .1, .2, .3, .4, .5, .6, .7, .8, 
.5, .6, .7, .6, .5, .4, .3, .2, .1, 
.4, .3, .2, .3, 
.6, .7, .8, .7, .6, .5, .4, .5, .6, .7, 
.3, .4, .5, .6, .7, .8, .7, .6, .5, .4, .3, .2, .1, 
.3, .2, .3, .4, .5, .6, .7, .8, 
.5, .6, .7, .8, .7, .6, .5, .4, .3, .2, .1, 
.5, .4, .3, .2, .3, .4, .5, .6, .7, .8, 
.4, .5, .6, .7, .8, .7, .6, .5, .4, .3, .2, .1, 
.4, .3, .2, .1, .2, .3, .4, .5, .6, 
.3, .4, .5, .6, .7, .8, 
.6, .7, .6, .5, .4, .3, .2, .1, 
.5, .4, .3, .2, .3, .4, .5, .6, .7, .8, 
.4, .5, .6, .7, .8, .7, .6, .5, .4, .3, .2,
.5, .6, .7, .8, .7, .6, .5, .4, .3, .2, .1, .2, .3, .4, .5, .6, .7,
.3, .4, .5, .6, .7, .8, .7, .6];
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
function nextOne(){
  RL = shuffling(RL_List)[0];
  coherence = 0.7*(coherence_List[index]);
  index += 1;
}
function nextStep(){
  RL = shuffling(RL_List)[0];
  coherence = 0.7*coherence_List[index];
  index += dirn;
  if (index >= coherence_List.length - 1)
    dirn = -1;
  if (index <= 0)
    dirn = 1;
}
function nextTrial() {
  RL = shuffling(RL_List)[0];
  coherence = 0.7*shuffling(coherence_List)[1];
}