$(function(){
  $("#Correct").hide();
  $("#Incorrect").hide();
  $("#sub").hide();
  $("Canvas").hide();
});
var BeginDemo = function() {
  data.push(['RL','response', 'coherence', 'RT']);
  RDM();
}
var RDM = function(){
  //nextTrial();
  $(document).on('keydown', function stimuli(e){
    if (e.which == 32 && trial_num < 161 && task == 0){
      task = 1;
      paper.install(window);
      startTime = (new Date()).getTime();
      nextStep();
      $("#Instructions").hide();
      $("#Canvas").show();
      $("#Correct").hide();
      $("#Incorrect").hide();
      $("#sub").hide();
      var nums = [];
      for (var i = 0; i < count; i++) {
        nums.push(i);
      }
      shuffling(nums);
      var First = nums.slice(0, 100);
      var Second = nums.slice(100, 200);
      var Third = nums.slice(200, 300);
      var full = [First,Second,Third];
      paper.setup('Canvas');
      var path = new Path.Circle([view.size.width*Math.random(),view.size.height*Math.random()], size);
      path.fillColor = 'white';
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
                item.position.x += 60*RL*(Math.random()+0.5);
                item.position.y += 50*norm();
              } else {
                item.position.x += ((1-coherence)/coherence)*70*norm();
                item.position.y += 50*Math.random()*Math.sign(norm()); 
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
    if (trial_num == 161){
      $("#Correct").hide();
      $("#Incorrect").hide();
      $("#sub").show();
    }
  })
};
$(document).on('keydown', function(e){
  if ((e.which == 90 || e.which == 77) && trial_num < 161 && task == 1){ 
    var endTime = (new Date()).getTime();
    $("#Instructions").show();
    $("#Canvas").hide();
    $("#sub").hide();
    $("#Correct").hide();
    $("#Incorrect").hide();
    paper.project.remove();
    trial_num = trial_num + 1;
    even = 0;
    if (e.which == 77){
      response = 1;
      if (RL == "1"){ 
        $("#Correct").show();
        trial_corr = trial_corr + 1;
        score = score + 10*Math.pow(2, Math.floor(trial_corr/3));
      } else if (RL == "-1"){ 
        $("#Incorrect").show();
        trial_corr = 0;
      }
    } else {
      response = -1;
      if (RL == "-1"){ 
        $("#Correct").show();
        trial_corr = trial_corr + 1;
        score = score + 10*Math.pow(2, Math.floor(trial_corr/3));
      } else if (RL == "1"){ 
        $("#Incorrect").show(); 
        trial_corr = 0; 
      }
    }
    $("#showscore").html(score)
    RT = endTime - startTime;
    trialdata = [RL, response, coherence, RT];
    data.push(trialdata);
    task = 0;
    if(barwidth < 100){
        barwidth = barwidth + 100/161;
        $(".progress-bar-success").css("width", barwidth + "%");
    }
  }    
});