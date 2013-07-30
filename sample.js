var calculate=function(data,steak){

var myheatsolver = HeatSolver(steak);
console.log(data);

var Thedata=myheatsolver.sixty_graph_arrays(data);

var sampledata=Thedata.temps;
var flame=Thedata.points;

graphSteak(sampledata,flame);
	
}