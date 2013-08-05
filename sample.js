var calculate=function(data,steak,meatType){
var myheatsolver = HeatSolver(steak);
var Thedata=myheatsolver.sixty_graph_arrays_duration(data);
var sampledata=Thedata.temps;
var flame=Thedata.points;
var timestep=1/Thedata.step;
var maxTemps=Thedata.maxTemps;
	console.log(sampledata);
drawFinished(meatType,maxTemps,data,steak[0],0);
drawFinished('Tuna',maxTemps.concat(maxTemps),data,steak[0],1);
graphSteak(sampledata,flame,timestep,meatType,maxTemps);
    
//	if(localStorage.pastMeats == undefined){//if no meats have been saved before, make this the first one
//        localStorage.pastMeats = [Thedata];
//    }
//    else{ //add this meat to the list of previous meats
//        localStorage.pastMeats.push(Thedata);
//    }
    
}