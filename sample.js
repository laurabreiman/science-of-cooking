var calculate=function(data,steak,meatType,first){
var myheatsolver = HeatSolver(steak);
var Thedata=myheatsolver.sixty_graph_arrays_duration(data);
var sampledata=Thedata.temps;
var flame=Thedata.points;
var timestep=1/Thedata.step;
var maxTemps=Thedata.maxTemps;
	console.log(sampledata);
	if(first){
drawFinished(meatType,maxTemps,data,steak[0],0);
drawFinished(meatType,maxTemps,data,steak[0],1);
	}
graphSteak(sampledata,flame,timestep,meatType,maxTemps);
    
}