var calculate=function(data,steak,meatType){

var myheatsolver = HeatSolver(steak);
console.log(data);

var Thedata=myheatsolver.sixty_graph_arrays(data);

var sampledata=Thedata.temps;
var flame=Thedata.points;
var timestep=1/Thedata.step;

graphSteak(sampledata,flame,timestep,meatType);
	
}