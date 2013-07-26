var dummyTemps = [[180,23,23,23,23,23,23]];

var D = 0.0803;

var timestep = 0.1;
var spacestep = 0.1;

var alpha = (D*timestep);
var alphacn = (D*timestep)/(2);

//
//var laplacian = makeLaplacian(dummyTemps);
//
//for(var i=0; i<5000; i++){
//    calculate_next_explicit(dummyTemps,laplacian);
//}
//console.log(dummyTemps);

//var laplacian = makecnLaplacian(dummyTemps);
//var invlaplacian = numeric.inv(laplacian);
//
//for(var i=0; i<1000; i++){
//    var cnVector = make_crank_nicolson_vector(dummyTemps);
//    calculate_next_cn(dummyTemps, cnVector, invlaplacian);
//}
//console.log(dummyTemps[dummyTemps.length-1])


/*
    makes a laplacian matrix with 0s as the first and last rows because the boundary values (the temps of the pan and the air) do not change
    looks like: 
    0  0  0  0  0
    1 -2  1  0  0
    0  1 -2  1  0
    0  0  1 -2  1
    0  0  0  0  0 
    for a five-temperature probe system.
    
    this means that the next temperature of each point is simply determined by the difference between this point and its two neighbors
*/
function makeLaplacian(tempArray){
    var num_of_measurements = tempArray[0].length;
    var laplacian = [];
    var firstRow = [];
    for(var i=0; i<num_of_measurements; i++){
        firstRow.push(0)
    }
    laplacian.push(firstRow);
//    var lastrow = Array.prototype.slice.call(firstRow)
//    lastrow.reverse();
    for(var i=1; i<num_of_measurements-1; i++){
        var newRow = [];
        for(var j=1; j<i; j++){
            newRow.push(0);
        }
        newRow.push(1*alpha,-2*alpha,1*alpha);
        for(var j= i+2; j<num_of_measurements; j++){
            newRow.push(0);
        }
        laplacian.push(newRow);
    }
    laplacian.push(firstRow);
    
    return laplacian;
}

function makecnLaplacian(tempArray){
    var num_of_measurements = tempArray[0].length;
    var laplacian = [];
    var firstRow = [1];
    for(var i=1; i<num_of_measurements; i++){
        firstRow.push(0)
    }
    laplacian.push(firstRow);
    var lastrow = Array.prototype.slice.call(firstRow)
    lastrow.reverse();
    
    for(var i=1; i<num_of_measurements-1; i++){
        var newRow = [];
        for(var j=1; j<i; j++){
            newRow.push(0);
        }
        newRow.push(-1*alphacn,(1+2*alphacn),-1*alphacn);
        for(var j= i+2; j<num_of_measurements; j++){
            newRow.push(0);
        }
        laplacian.push(newRow);
    }
    laplacian.push(lastrow);
    
    return laplacian;
}
/*
    uses the explicit form of Euler's method to calculate the next time step's temperatures based on the most current temperatures
*/
function calculate_next_explicit(tempArray,laplacian){
    var currentTemps = tempArray[tempArray.length-1];
    var dudt = numeric.dotMV(laplacian,currentTemps);
//    dudt = numeric.neg(dudt);
    var nextTemps = numeric.add(dudt,currentTemps);
    tempArray.push(nextTemps)
}

function calculate_next_cn(tempArray, cnVector, invlaplacian){
    var nextTemps = numeric.dotMV(invlaplacian,cnVector);
    tempArray.push(nextTemps);
}

function make_crank_nicolson_vector(tempArray){
    var currentTemps = tempArray[tempArray.length-1];
    var cnVector = [];
    
    for(var i=0; i<currentTemps.length; i++){
        if(i==0){
            cnVector.push(currentTemps[0]);//((1+2*alpha)*currentTemps[i]-alpha*(currentTemps[i+1]));
        }
        else if(i==currentTemps.length-1){
            cnVector.push(currentTemps[i]);//(-alpha*currentTemps[i-1]+(1+2*alpha)*currentTemps[i]);
        }
        else{
            cnVector.push(alphacn*currentTemps[i-1]+(1-2*alphacn)*currentTemps[i]+alphacn*(currentTemps[i+1]));
        }
    }
    return cnVector;
}