var calculate=function(data,steak,meatType){

var myheatsolver = HeatSolver(steak);
var Thedata=myheatsolver.sixty_graph_arrays_duration(data);

var sampledata=Thedata.temps;
var flame=Thedata.points;
var timestep=1/Thedata.step;
var maxTemps=Thedata.maxTemps;
	console.log(maxTemps);
graphSteak(sampledata,flame,timestep,meatType,maxTemps);
	
}