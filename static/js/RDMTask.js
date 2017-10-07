$(function(){
  $("#Correct").hide();
  $("#Incorrect").hide();
  $("#sub").hide();
});
var BeginDemo = function() {
  data.push(['RL','response', 'coherence', 'RT']);
  RDM();
}
var RDM = function(){
  $("#Canvas").hide();
  $("#Instructions").show();
  $("#Correct").hide();
  $("#Incorrect").hide(); 
  $("#sub").hide();
  startTime = (new Date()).getTime(); 
  //nextTrial();
  nextStep();
  paper.install(window);
  if (trial_num > 0) {
    console.log(paper.project.layers);
  }
  $(document).on('keydown', function stimuli(e){
    if (e.which == 32 && trial_num < 360){
      startTime = (new Date()).getTime();
      $("#Instructions").hide();
      $("#Canvas").show();
      var nums = [];
      for (var i = 0; i < count; i++) {
        nums.push(i);
      }
      shuffling(nums);
      var First = nums.slice(0, 80);
      var Second = nums.slice(80, 160);
      var Third = nums.slice(160, 240);
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
                item.position.x += (35)*RL;
                item.position.y += 50*norm();
              } else {
                item.position.x += ((1-coherence)/coherence)*40*norm();
                item.position.y += 50*norm(); 
              }
              if (item.bounds.left > view.size.width)
                item.position.x = +item.bounds.width;
              if (item.bounds.right < 0)
                item.position.x = +view.size.width;
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
    if (trial_num == 360)
      $("#sub").show();
  })
};
$(document).on('keydown', function(e){
  if ((e.which == 90 || e.which == 77) && trial_num < 3){ 
    var endTime = (new Date()).getTime();
    $("#Instructions").show();
    $("#Canvas").hide();
    $("#sub").hide();
    paper.project.remove();
    trial_num = trial_num + 1;
    even = 0;
    if (e.which == 77){
      response = 1;
      if (RL == "1"){ $("#Correct").show();} else { $("#Incorrect").show(); }
    } else {
      response = -1;
      if (RL == "-1"){ $("#Correct").show();} else { $("#Incorrect").show(); }
    }
    RT = endTime - startTime;
    setTimeout(RDM,500);
    trialdata = [RL, response, coherence, RT];
    data.push(trialdata);
  }    
});
