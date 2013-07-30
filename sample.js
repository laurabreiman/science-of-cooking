var calculate=function(data,steak){

var myheatsolver = HeatSolver(steak);


var Thedata=myheatsolver.sixty_graph_arrays(data);

var sampledata=Thedata.temps;
var flame=Thedata.points;
var timeScale=3;
graphSteak(sampledata,flame,timeScale);
	
}