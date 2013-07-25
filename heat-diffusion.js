var dummyTemps = [[180,80,65,60,55,50,23]];

var D = 0.803;

var timestep = 0.1;
var spacestep = 0.1;

var alpha = (D*timestep);

for(var i=0; i<50; i++){
    calculate_next_explicit(dummyTemps,makeLaplacian(dummyTemps));
}
console.log(dummyTemps);

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

/*
    uses the explicit form of Euler's method to calculate the next time step's temperatures based on the most current temperatures
*/
function calculate_next_explicit(tempArray,laplacian){
    var dudt = numeric.dotMV(laplacian,tempArray[tempArray.length-1]);
//    dudt = numeric.neg(dudt);
    var nextTemps = numeric.add(dudt,tempArray[tempArray.length-1]);
    tempArray.push(nextTemps)
}