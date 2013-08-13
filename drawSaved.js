
var drawFinished=function(myMeatType,myMaxTemps,instructions,startingtemp,side,thickness,mode)
	{

			var getState=function(temp)
	{

		for(var i=0;i<boundaries[myMeatType].length;i++)
		{
			if(temp>=boundaries[myMeatType][i])return i;
		}
		return 6;

	};
		 var convertTime = function (secs) {
            
            var minutes = Math.floor(parseInt(secs) / 60);
            var seconds = parseInt(secs) % 60;
           
            if (minutes == 0 && seconds < 10) {
     
                return String(0) + ":0" + String(seconds);
            } else if (seconds == 0) {
    
                return String(minutes) + ':' + String(seconds) + '0';
            } else {
                
                return String(minutes) + ':' + String(seconds);
            }
        }	
		var toF=function(C)
    {
    return (C*(9/5)+32);
    };
		
		if(mode=='F'){var directions=[thickness+ " cm "+myMeatType+" starts at "+toF(startingtemp.toFixed(0))+ "\xB0"+mode];}
		else{var directions=[thickness+ " cm "+myMeatType+" starts at "+startingtemp.toFixed(0)+ "\xB0"+mode];}
		for(var i=0;i<instructions.length;i++)
		{
			if(mode!='C'){
			directions.push(convertTime(instructions[i][0])+" at "+toF(instructions[i][1]).toFixed(0)+"\xB0F and "+toF(instructions[i][2]).toFixed(0)+"\xB0F"
			);
			}
			else{
				directions.push(convertTime(instructions[i][0])+" at  "+instructions[i][1].toFixed(0)+"\xB0C and "+instructions[i][2].toFixed(0)+"\xB0C");
			}
			
		}
		var myMaxs=[];
		
			for (var x = 0; x < 7; x++) {myMaxs.push(0);}
			var state=getState(myMaxTemps[0]);
		
			for(var j=0;j<myMaxTemps.length;j++)
			{	
			
				var nextState=getState(myMaxTemps[j]);
				
		
					
					myMaxs[nextState]+=1;
				
				
	
			}
		
		myMaxs.reverse();
		
		var dropdown=$('<select id="steakHist"></select>');
		dropdown.append($('<option>Current</option>'));
		//$(".span6").append(dropdown);
		var svgContainer = d3.select(".span12").append("svg")
                                   .attr("width", '42%')
                                   .attr("class", 'finalsteak')
									.append("g")
	.attr("class",'savedInfo')
    .attr("transform", "translate(" + 45 + "," + 140 + ")")
		
		
		var legend = svgContainer.selectAll('g')

        .data(function(){return mode=='C'? CtempScale[myMeatType]:FtempScale[myMeatType]})

        .enter()
      .append('g')
		
        .attr('class', 'legend')
		.style('fill', "black");


    legend.append('rect')
        .attr('x', function(d,i){return (5+(1-side)*72)+'%'})
        .attr('y', function(d, i){ return -125+i*10 })
        .attr('width', 8)
        .attr('height', 8)

        .style('fill', function(d) { return color[myMeatType](d['position'])

        });

    legend.append('text')
	.data(myMaxs)
        .attr('x', function(d,i){return (0+(1-side)*80)+'%'})
        .attr('y', function(d, i){ return  -125+8+i*10})
		.style('font-size','6pt')
        .text(function(d){ return (100*d/(myMaxTemps.length)).toFixed(0) +"%"; });	

//Draw the Rectangle
var rectangle = svgContainer.selectAll("rect")
    .data([0,0,0,0,0,0,0].concat(myMaxTemps.reverse()))
  .enter().append("rect")
           .attr("x", (20+(1-side)*30)+'%')
           .attr("y", function(d,i){return -160+i*4})
           .attr("width", '10%')
           .attr("height", '4px')
		   .style('fill', function(d,i) {
			   return color[myMeatType](getState(d))});
var texts=svgContainer.selectAll("text")
  .data([0,1,2,3,4,5,6].concat(directions))
.enter().append("text")
.attr("x", ((side)*40)+'%')
.attr("width", '90%')
.attr("y", function(d,i){return -120+(i-7)*10})
.text(function(d){return d})
.attr("font-size", "20px")
//myMaxs.reverse();
		myMaxTemps.reverse();
	}