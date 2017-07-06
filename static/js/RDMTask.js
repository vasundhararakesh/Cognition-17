$(function(){
  $("#Correct").hide();
  $("#Incorrect").hide();
});
var startTime = 0;
var BeginDemo = function() {
  data.push(['RL',"coherence", "RT"]);
  RDM();
}
var trial_num = [0];
var RDM = function(){
  $("#Canvas").show();
  $("#Instructions").show();
  $("#Correct").hide();
  $("#Incorrect").hide(); 
  startTime = (new Date()).getTime(); 
  nextTrial();
  console.log(RL);
  console.log(coherence);
  paper.install(window);
  if (trial_num > 0) {
    console.log(paper.project.layers);
  }
  trial_num += 1
  $(document).on('keydown', function stimuli(e){
    if (e.which == 32){
      var nums = [];
      for (var i = 0; i < count; i++) {
        nums.push(i);
      }
      shuffling(nums);
      var First = nums.slice(0, 66);
      var Second = nums.slice(66, 133);
      var Third = nums.slice(133, 200);
      var full = [First,Second,Third]; 
      paper.setup('Canvas');
      var path = new Path.Circle([view.size.width*Math.random(),view.size.height*Math.random()], size);
      path.fillColor = 'black';
      var symbol = new Symbol(path);
      for (var i = 0; i < count; i++) {
        var center = [view.size.width*Math.random(),view.size.height*Math.random()];
        symbol.place(center);
      }
      var even = 0;
      view.onFrame = function(event) {
        even ++;
        if(even%2 === 0){
          for (var i = 0; i < full.length; i++) {
            for (var j = 0; j < full[i].length; j++){
              shuffling(full[i]);
              var current = full[i][j];
              var item = project.activeLayer.children[current];
              if (j < (count/3)*coherence) {
                item.position.x += (.5)*RL;
                //item.position.y += 5*norm();
              } else {
                item.position.x += 2.5*norm();
                item.position.y = view.size.height*Math.random(); 
              }
              if (item.bounds.left > view.size.width)
                item.position.x = +item.bounds.width;
              if (item.bounds.right < 0)
                item.position.x = -view.size.width;
              if (item.bounds.bottom < 0)
                item.position.y = +view.size.height;
              if (item.bounds.top > view.size.height)
                item.position.y = -item.bounds.height;
            }
          }   
        }
      }
      paper.view.draw();
    }
  })
};
$(document).on('keydown', function(e){
  if (e.which == 90 || e.which == 77){ 
    $("Canvas").hide();
    paper.project.remove();
    even = 0;
    if (e.which == 77){
      response = 1;
      if (RL == "1"){ $("#Correct").show(); } else { $("#Incorrect").show(); }
    } else {
      response = -1;
      if (RL == "-1"){ $("#Correct").show(); } else { $("#Incorrect").show(); }
    }
    var endTime = (new Date()).getTime();
    RT = endTime - startTime;
    setTimeout(RDM,500);
    trialdata = [RL, response, coherence, RT];
    data.push(trialdata);
  }     
});