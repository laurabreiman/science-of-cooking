    
function HeatSolver(startingTemps){
    
    var tempArray = [startingTemps];
    var D = .14; // in units of mm^2/sec
    
    var timestep = 1;
    var spacestep = 0.1;
    
    var alpha = (D*timestep);
    var alphacn = (D*timestep)/(2);
    
    var laplacian = makeLaplacian();
    
    var cnLaplacian = makecnLaplacian();
    var invcn = numeric.inv(cnLaplacian);
    
    var nonconductive = [0,1];
    
    function get_tempArray(){
        return tempArray;
    }
    
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
    function makeLaplacian(){
        var num_of_measurements = tempArray[0].length;
        var newLaplacian = [];
        var firstRow = [];
        for(var i=0; i<num_of_measurements; i++){
            firstRow.push(0)
        }
        newLaplacian.push(firstRow);
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
            newLaplacian.push(newRow);
        }
        newLaplacian.push(firstRow);
        
        return newLaplacian;
    }
    
    function makecnLaplacian(){
        var num_of_measurements = tempArray[0].length;
        var newLaplacian = [];
        var firstRow = [1];
        for(var i=1; i<num_of_measurements; i++){
            firstRow.push(0)
        }
        newLaplacian.push(firstRow);
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
            newLaplacian.push(newRow);
        }
        newLaplacian.push(lastrow);
        
        return newLaplacian;
    }
    /*
        uses the explicit form of Euler's method to calculate the next time step's temperatures based on the most current temperatures
    */
    function calculate_next_explicit(){
        var currentTemps = tempArray[tempArray.length-1];
        var dudt = numeric.dotMV(laplacian,currentTemps);
    //    dudt = numeric.neg(dudt);
        var nextTemps = numeric.add(dudt,currentTemps);
        tempArray.push(nextTemps)
    }
    
    function calculate_next_cn(cnVector){
        var nextTemps = numeric.dotMV(invcn,cnVector);
        tempArray.push(nextTemps);
    }
    
    function calculate_next_n_cn(n){   
        for(var i=0; i<n; i++){
            var cnVector = make_crank_nicolson_vector();
            calculate_next_cn(cnVector);
        }
    }
    
    function sixty_graph_arrays(){
        var grapharray = [];
        var graphlabels = [];
        for(var i=0; i<600; i++){
            var cnVector = make_crank_nicolson_vector();
            calculate_next_cn(cnVector);
            if(i%10 ==0){
                grapharray.push(tempArray[tempArray.length-1]);
                graphlabels.push([i,0,180]);
            }
        }
        return {temps: grapharray, points: graphlabels}
    }
    
    function change_temp(top_and_or_bottom, temp){
        if(top_and_or_bottom[0] == 1){
            tempArray[tempArray.length-1][0] = temp;
        }
        if(top_and_or_bottom[1] == 1){
            tempArray[tempArray.length-1][tempArray[0].length-1] = temp;
        }
    }
    
    function flip(){
        var top = tempArray[tempArray.length-1][tempArray[0].length-1];
        var bottom = tempArray[tempArray.length-1][0];
        tempArray[tempArray.length-1][0] = top;
        tempArray[tempArray.length-1][tempArray[0].length-1] = bottom;
        nonconductive.reverse();
    }
    
    function fifteen_flip_method(duration){
        for(var i=0; i<duration; i++){
            var cnVector = make_crank_nicolson_vector();
            calculate_next_cn(cnVector);
            if(i%150 == 0){
                flip();
            }
        }
    }
    
    function make_crank_nicolson_vector(){
        var currentTemps = tempArray[tempArray.length-1];
        var cnVector = [];
        
        for(var i=0; i<currentTemps.length; i++){
            if(i==0 && nonconductive[0] == 0){
                cnVector.push(currentTemps[0]);//((1+2*alpha)*currentTemps[i]-alpha*(currentTemps[i+1]));
            }
            else if(i==0 && nonconductive[0] == 1){
                cnVector.push(alphacn*currentTemps[i]+(1-2*alphacn)*currentTemps[i+1]+alphacn*(currentTemps[i+2]));//((1+2*alpha)*currentTemps[i]-alpha*(currentTemps[i+1]));
            }
            else if(i==currentTemps.length-1 && nonconductive[1] == 1){
                cnVector.push(cnVector[i-1]);//(-alpha*currentTemps[i-1]+(1+2*alpha)*currentTemps[i]);
            }
            else if(i==currentTemps.length-1 && nonconductive[1] == 0){
                cnVector.push(currentTemps[i]);
            }
            else{
                cnVector.push(alphacn*currentTemps[i-1]+(1-2*alphacn)*currentTemps[i]+alphacn*(currentTemps[i+1]));
            }
        }
        return cnVector;
    }
    
    return {get_tempArray: get_tempArray, make_crank_nicolson_vector: make_crank_nicolson_vector, makecnLaplacian: makecnLaplacian, makeLaplacian: makeLaplacian, fifteen_flip_method: fifteen_flip_method, flip: flip, change_temp: change_temp, calculate_next_cn: calculate_next_cn, calculate_next_explicit: calculate_next_explicit, calculate_next_n_cn: calculate_next_n_cn, sixty_graph_arrays: sixty_graph_arrays}
}

var heatsolver = HeatSolver([180,23,23,23,23,23,23]);
