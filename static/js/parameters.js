var count = 200;
var size = 4.5; 
var RT;    
var response;
var data = [];
//Direction: -1 for left, 1 for right
var RL = 1;
var coherence = .15;
var speed = 80;
var RL_List = [-1,1];
var coherence_List = [.05, .1, .15, .2, .25, .3, .35, .4, .45, .5, .55,.6, .65, .7, .75, .8, .95];
//var coherence_List = [0.8, 0.8];
function norm() {
	var x = Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random();
 	x = (x - 3)/3;
 	return x;
}
function shuffling(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function nextTrial() {
  RL = shuffling(RL_List)[0];
  coherence = shuffling(coherence_List)[1];
}
