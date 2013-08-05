
var drawFinished=function(myMeatType,myMaxTemps,instructions,startingtemp)
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
			directions.push("Side 1 at "+instructions[i][1]+"\xB0C and Side 2 at  "+instructions[i][2]+"\xB0C for"
			+instructions[i][0]+" s");
			
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
		var svgContainer = d3.select(".span6").append("svg")
                                   .attr("width", '50%')
                                    .attr("height", '200px')
									.append("g")
	.attr("class",'savedInfo')
    .attr("transform", "translate(" + 45 + "," + 130 + ")")
		
		
		var legend = svgContainer.selectAll('g')

        .data(tempScale[myMeatType])

        .enter()
      .append('g')
		
        .attr('class', 'legend')
		.style('fill', "black");


    legend.append('rect')
        .attr('x', function(d,i){return i<4? i*30-20:(i-4)*30-20})
        .attr('y', function(d, i){ return i<4? -125: -125+10})
        .attr('width', 8)
        .attr('height', 8)

        .style('fill', function(d) { return color[myMeatType](d['position'])

        });

    legend.append('text')
	.data(myMaxs)
        .attr('x', function(d,i){return i<4? i*30-12:(i-4)*30-12})
        .attr('y', function(d, i){ return i<4? -125+8: -125+18})
		.style('font-size','6pt')
        .text(function(d){ return (100*d/(myMaxTemps.length)).toFixed(0) +"%"; });	

//Draw the Rectangle
var rectangle = svgContainer.selectAll("rect")
    .data([0,0,0,0,0,0,0].concat(myMaxTemps.reverse()))
  .enter().append("rect")
           .attr("x", '-10%')
           .attr("y", function(d,i){return-130+ 20+i*1})
           .attr("width", '70%')
           .attr("height", '1px')
		   .style('fill', function(d,i) {
			   return color[myMeatType](getState(d))});
var texts=svgContainer.selectAll("text")
  .data([0,1,2,3,4,5,6].concat(directions))
.enter().append("text")
.attr("x", -20)
.attr("y", function(d,i){return -50+(i-7)*10})
.text(function(d){return d})
.attr("font-size", "20px")

	}