/*
    calculate: function that takes in data about the meat that is cooking and restructures
        it into graphable data arrays and values that are then displayed to the screen
        with the function graphSteak
*/
var calculate = function (data, steak, meatType, first, mode, animated) {
    //sets the parameters for the iterations of the diffusion equations. 
    //parameters are initially set to a timestep of 1 second and a spacestep of 1mm,
    //but these can be increased with minimal error if calculation time is too great
    var toC = function (F) {
        return ((5 / 9) * (F - 32));
    }
    if (mode == 'F') {

        for (var i = 0; i < data.length; i++) {
            data[i][1] = toC(data[i][1]);
            data[i][2] = toC(data[i][2]);
        }
    }

    var timestep = 1;
    var spacestep = 1;

    var myheatsolver = HeatSolver(steak, timestep, spacestep);
    var Thedata = myheatsolver.sixty_graph_arrays_duration(data);
    if (meatType == 'False') {
        var sampledata = Thedata.temps;
    } else {
        var sampledata = Thedata.allMaxTemps.slice(1, Thedata.allMaxTemps.length);

        for (var i = 0; i < sampledata.length; i++) {
            sampledata[i] = sampledata[i].slice(1, sampledata[i].length - 1);
        }
    }
    var flame = Thedata.points;
    var timestep = 1 / Thedata.step;
    var maxTemps = Thedata.maxTemps;

    /* if(first){
        drawFinished(meatType,maxTemps,data,steak[0],0,(steak.length-2)/10,'C');
        drawFinished(meatType,maxTemps,data,steak[0],1,(steak.length-2)/10,'C');
    }
    */
    if (!first) {
        graphSteak(sampledata, flame, timestep, meatType, maxTemps, mode, animated);
    }


}