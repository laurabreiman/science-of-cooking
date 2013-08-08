/*
    calculate: function that takes in data about the meat that is cooking and restructures
        it into graphable data arrays and values that are then displayed to the screen
        with the function graphSteak
*/
var calculate=function(data,steak,meatType,first,totalTime){
    
    //sets the parameters for the iterations of the diffusion equations. 
    //parameters are initially set to a timestep of 1 second and a spacestep of 1mm,
    //but these can be increased with minimal error if calculation time is too great
    var timestep = 1;
    var spacestep = 1;
    while(totalTime/timestep > 10000){
        timestep += 9; //adjust the timestep so that no more than 9999 calculations are done
    }
    if(timestep > 39){ //39 is basically the maximum timestep for acceptable accuracy (below 1° error)
        timestep = 39;
    }
    
    var myheatsolver = HeatSolver(steak,timestep,spacestep);
    var Thedata=myheatsolver.sixty_graph_arrays_duration(data);
    var sampledata=Thedata.temps;
    var flame=Thedata.points;
    var timestep=1/Thedata.step;
    var maxTemps=Thedata.maxTemps;
    
    if(first){
        drawFinished(meatType,maxTemps,data,steak[0],0);
        drawFinished(meatType,maxTemps,data,steak[0],1);
    }
    
    graphSteak(sampledata,flame,timestep,meatType,maxTemps);
    
}