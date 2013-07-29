var calculate=function(data,steak){

var myheatsolver = HeatSolver(steak);


var Thedata=myheatsolver.sixty_graph_arrays(data);
console.log(myheatsolver.get_tempArray());
var sampledata=Thedata.temps;
var flame=Thedata.points;

graphSteak(sampledata,flame);
	
}