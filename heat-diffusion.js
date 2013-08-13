/*
    HeatSolver objects take in the starting temperatures of a piece of meat (or basically water, since the diffusion constants differ negligibly) and the desired discretization of time and space.
    Has functionality for computing several iterations of the heat diffusion equation that models the movement of heat through the meat over time.
    Options for using either the explicit euler method of calculation (which is relatively unstable and eventually yields values on the order of 10^69 °C for a 1000 second cooking at 180°C) or the Crank-Nicolson scheme (which allows greater timesteps while retaining stability)
*/
function HeatSolver(startingTemps,timestep,spacestep){
    
    var tempArray = [startingTemps];

    var D = .14; // diffusion constant (of water) in units of mm^2/sec
    
    //if the user has not specified space or time discretization values, these are set to 1s and 1mm, respectively
    if(timestep === undefined){
        timestep = 1; 
    }
    if(spacestep === undefined){
        spacestep = 1;
    }
    var timestep = 1;
    var spacestep = 1;
    
    var alpha = (D*timestep);
    var alphacn = (D*timestep)/(2*spacestep*spacestep);
    
    //laplacian for the explicit euler
    var laplacian = makeLaplacian();
    //laplacian for the crank-nicolson
    var cnLaplacian = makecnLaplacian();
    //inverse of the cnLaplacian
    var invcn = numeric.inv(cnLaplacian);
    
    //array that keeps track of which sides are in contact with air -- a value of 1 corresponds to air, as air is "nonconductive" in cooking and does not contribute significantly to heat loss of the steak
    var nonconductive = [0,1];
    
    /*
        get_tempArray returns the tempArray, which is the range of values within the steak at each calculated timestep
    */
    function get_tempArray(){
        return tempArray;
    }
    
    /*
        makeLaplacian makes a laplacian matrix for the explic with 0s as the first and last rows because the boundary values (the temps of the pan and the air) do not change
        looks like: 
        1   0   0   0   0
        1α -2α  1α  0   0
        0   1α  -2α 1α  0
        0   0   1α  -2α 1α
        0   0   0   0   1 
        for a five-temperature probe system.
        
        this means that the next temperature of each point is simply determined by the difference between this point and its two neighbors
    */
    function makeLaplacian(){
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
            newRow.push(1*alpha,-2*alpha,1*alpha);
            for(var j= i+2; j<num_of_measurements; j++){
                newRow.push(0);
            }
            newLaplacian.push(newRow);
        }
        newLaplacian.push(lastrow);
        
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
        currentTemps[currentTemps.length-1]=currentTemps[currentTemps.length-2] 
        var dudt = numeric.dotMV(laplacian,currentTemps);
        dudt[0] = 0;
        dudt[dudt.length-1] =0;
    //    dudt = numeric.neg(dudt);
        var nextTemps = numeric.add(dudt,currentTemps);
        tempArray.push(nextTemps)
    }
    
    /*
        takes in a Crank-Nicolson vector associated with the data and uses the Crank-Nicolson scheme to calculate the next time step's temperatures based on the most recent temperatures
    */
    function calculate_next_cn(cnVector){
        var nextTemps = numeric.dotMV(invcn,cnVector);
        tempArray.push(nextTemps);
    }
    /*
        takes in a Crank-Nicolson vector associated with the data and uses the Crank-Nicolson scheme to calculate the temperatures of the next n timesteps based on the most recent temperatures
    */
    function calculate_next_n_cn(n){   
        for(var i=0; i<n; i++){
            var cnVector = make_crank_nicolson_vector();
            calculate_next_cn(cnVector);
        }
    }
    
    /*
        uses the explicit form of Euler's method to calculate the temperatures of the next n timesteps based on the most current temperatures
    */
    function calculate_next_n_exp(n){   
        for(var i=0; i<n; i++){
            calculate_next_explicit();
        }
    }
    
    /*
        takes in an array of length 3 arrays that describe which side(s) is being heated, at what times, and at what temperature. Calculates the progression of the temperatures for the entire cooking period and then returns the data cut into 60 slices of temperatures that are equally spaced in time.
    */
    function sixty_graph_arrays(time_top_bottom){
        var grapharray = [];
        var graphlabels = [];
        var temperatures = [];
		var count=0;
        var maxTemps = tempArray[0];
        
        var lastTime = time_top_bottom[time_top_bottom.length-1][0];
        
        for(var j=0; j<time_top_bottom.length; j++){
            var thisTime = time_top_bottom[j][0];
            var nextTime;
            if(j==time_top_bottom.length-1){
                nextTime= lastTime;
            }
            else{
                nextTime = time_top_bottom[j+1][0];
            }
            
            //set the conductivity of air to zero
            if(time_top_bottom[j][1] == 23){
                nonconductive[1] = 1;
            }
            else{
                nonconductive[1] = 0;
            }
            if(time_top_bottom[j][2] == 23){
                nonconductive[0] = 1;
            }
            else{
                nonconductive[0] = 0;
            }

            change_temp(time_top_bottom[j][1], time_top_bottom[j][2])
           
            
            for(var i=thisTime; i<nextTime; i+=timestep){
                if(i==thisTime){
                    temperatures.push([time_top_bottom[j][1], time_top_bottom[j][2]])
                }
                else{
                    temperatures.push(temperatures[temperatures.length-1]);
                }
                var cnVector = make_crank_nicolson_vector();
                calculate_next_cn(cnVector);
                for(var n=0; n<maxTemps.length; n++){
                    if(tempArray[tempArray.length-1][n] > maxTemps[n]){
                        maxTemps[n] = tempArray[tempArray.length-1][n];
                    }
                }                
            }
        }
        
        var arrays = tempArray.length-1 ;
        var len= tempArray[0].length;
        var step = arrays/60.0;
        for(var i=0; i<60*step; i+=step){

            grapharray.push(tempArray[parseInt(i)].slice(1,len-1));

			if(temperatures[parseInt(i)][0] > 25 && temperatures[parseInt(i)][1] > 25){

                graphlabels.push([count,0,temperatures[parseInt(i)][0]]);
				graphlabels.push([count,1,temperatures[parseInt(i)][1]]);

            }
            else if(temperatures[parseInt(i)][0] > 25){

                graphlabels.push([count,0,temperatures[parseInt(i)][0]]);

            }
            else if(temperatures[parseInt(i)][1] > 25){

                graphlabels.push([count,1,temperatures[parseInt(i)][1]]);

            }
            else{
//              	graphlabels.push([count,0,temperatures[parseInt(i/60)][1]]);
            }
       

            count++;

        }
        
        
        return {temps: grapharray, points: graphlabels, step: step, maxTemps: maxTemps}

    }
    
    /*
        takes in an array of length 3 arrays that describe which side(s) is being heated, for how long, and at what temperature. Calculates the progression of the temperatures for the entire cooking period and then returns the data cut into 60 slices of temperatures that are equally spaced in time.
    */
    function sixty_graph_arrays_duration(time_top_bottom){
        var grapharray = [];
        var graphlabels = [];
        var temperatures = [];
		var count=0;
		var maxTemps=[];
        var firstMaxTemp=[];
		for(var i=tempArray[0].length-1;i>-1;i--)
		{
			firstMaxTemp.push(tempArray[0][i])
		}
        maxTemps.push(firstMaxTemp);
        
        for(var j=0; j<time_top_bottom.length; j++){
            //set the conductivity of air to zero
            if(time_top_bottom[j][1] == 23){
                nonconductive[1] = 1;
            }
            else{
                nonconductive[1] = 0;
            }
            if(time_top_bottom[j][2] == 23){
                nonconductive[0] = 1;
            }
            else{
                nonconductive[0] = 0;
            }

            change_temp(time_top_bottom[j][1], time_top_bottom[j][2])
            
            for(var i=0; i<time_top_bottom[j][0]; i+=timestep){
                if(i==0){
                    temperatures.push([time_top_bottom[j][1], time_top_bottom[j][2]])
                }
                else{
                    temperatures.push(temperatures[temperatures.length-1]);
                }
                var cnVector = make_crank_nicolson_vector();
                calculate_next_cn(cnVector);
            }
        }	
        var arrays = tempArray.length-1 ;
        var len= tempArray[0].length;
        var step = arrays/60.0;
        for(var i=0; i<60*step; i+=step){
            
            var newMaxTemp = [];
                for(var n=0; n<maxTemps[maxTemps.length-1].length; n++){
                    if(tempArray[parseInt(i)][n] > maxTemps[maxTemps.length-1][n]){
                        newMaxTemp.push(tempArray[parseInt(i)][n]);
                    }
                    else{
                        newMaxTemp.push(maxTemps[maxTemps.length-1][n])
                    }
                }
            maxTemps.push(newMaxTemp);

            grapharray.push(tempArray[parseInt(i)].slice(1,len-1));

			if(temperatures[parseInt(i)][0] > 25 && temperatures[parseInt(i)][1] > 25){

                graphlabels.push([count,0,temperatures[parseInt(i)][0]]);
				graphlabels.push([count,1,temperatures[parseInt(i)][1]]);

            }
            else if(temperatures[parseInt(i)][0] > 25){

                graphlabels.push([count,0,temperatures[parseInt(i)][0]]);

            }
            else if(temperatures[parseInt(i)][1] > 25){

                graphlabels.push([count,1,temperatures[parseInt(i)][1]]);

            }
            else{
//              	graphlabels.push([count,0,temperatures[parseInt(i/60)][1]]);
            }
       

            count++;

        }
                
        return {temps: grapharray, points: graphlabels, step: step, maxTemps: maxTemps[maxTemps.length-1], allMaxTemps: maxTemps};

    }
    
    /*
        takes in new values for side 1 and side 2 to account for changing cooking temperatures
    */
    function change_temp(toptemp,bottomtemp){
        tempArray[tempArray.length-1][0] = bottomtemp;
        tempArray[tempArray.length-1][tempArray[0].length-1] = toptemp;
    }
    
    /*
        creates the crank-nicolson vector that is used to calculate the next range of temperatures inside the meat
    */
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
 
    return {get_tempArray: get_tempArray, make_crank_nicolson_vector: make_crank_nicolson_vector, makecnLaplacian: makecnLaplacian, makeLaplacian: makeLaplacian, change_temp: change_temp, calculate_next_cn: calculate_next_cn, calculate_next_explicit: calculate_next_explicit, calculate_next_n_cn: calculate_next_n_cn, sixty_graph_arrays: sixty_graph_arrays, sixty_graph_arrays_duration: sixty_graph_arrays_duration, calculate_next_n_exp: calculate_next_n_exp}

}