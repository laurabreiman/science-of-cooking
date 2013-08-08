
var drawFinished=function(myMeatType,myMaxTemps,instructions,startingtemp,side)
	{
	
			var getState=function(temp)
	{

		for(var i=0;i<boundaries[myMeatType].length;i++)
		{
			if(temp>=boundaries[myMeatType][i])return i;
		}
		return 6;

	};
		var directions=[myMeatType+" starts at "+startingtemp+ "\xB0C"];
		for(var i=0;i<instructions.length;i++)
		{
			directions.push(instructions[i][0]+" seconds at "+instructions[i][1]+"\xB0C and "+instructions[i][2]+"\xB0C"
			);
			
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
		var svgContainer = d3.select(".dropdown").append("svg")
                                   .attr("width", '50%')
                                   .attr("class", 'finalsteak')
									.append("g")
	.attr("class",'savedInfo')
    .attr("transform", "translate(" + 45 + "," + 140 + ")")
		
		
		var legend = svgContainer.selectAll('g')

        .data(tempScale[myMeatType])

        .enter()
      .append('g')
		
        .attr('class', 'legend')
		.style('fill', "black");


    legend.append('rect')
        .attr('x', function(d,i){return (-10+(1-side)*90)+'%'})
        .attr('y', function(d, i){ return -125+i*10 })
        .attr('width', 8)
        .attr('height', 8)

        .style('fill', function(d) { return color[myMeatType](d['position'])

        });

    legend.append('text')
	.data(myMaxs)
        .attr('x', function(d,i){return (-5+(1-side)*80)+'%'})
        .attr('y', function(d, i){ return  -125+8+i*10})
		.style('font-size','6pt')
        .text(function(d){ return (100*d/(myMaxTemps.length)).toFixed(0) +"%"; });	

//Draw the Rectangle
var rectangle = svgContainer.selectAll("rect")
    .data([0,0,0,0,0,0,0].concat(myMaxTemps.reverse()))
  .enter().append("rect")
           .attr("x", (8+(1-side)*50)+'%')
           .attr("y", function(d,i){return -160+i*4})
           .attr("width", '10%')
           .attr("height", '4px')
		   .style('fill', function(d,i) {
			   return color[myMeatType](getState(d))});
var texts=svgContainer.selectAll("text")
  .data([0,1,2,3,4,5,6].concat(directions))
.enter().append("text")
.attr("x", ((side)*20)+'%')
.attr("width", '90%')
.attr("y", function(d,i){return -120+(i-7)*10})
.text(function(d){return d})
.attr("font-size", "20px")
//myMaxs.reverse();
		myMaxTemps.reverse();
	}