var graphSteak=function(sampledata,flame,timestep,meatType,maxTemps,mode){
var graph=(function(){
var setup=function(div,data,flame,timestep,meatType,maxTemps,mode)	
	{
	for (var i=0;i<data.length;i++)
	{
		data[i].reverse();
		
	}
		
    var toF=function(C)
    {
    return (C*(9/5)+32);
    }
	 var toC=function(F)
    {
    return ((5/9)*(F-32));
    }
	
var dy=.1;	
var n = boundaries[meatType].length*2+1, // number of layers

    m = data.length; // number of samples per layer

	var getState=function(temp)
	{

		for(var i=0;i<boundaries[meatType].length;i++)
		{
			if(temp>=boundaries[meatType][i])return i;
		}
		return 6;

	};
		var dat=[]
		for(var i =0;i<data.length;i++)
		{
			var moves = [];
			for (var x = 0; x < n; x++) moves.push(0);
			var state=getState(data[i][0]);
			var offset=0;
		
			for(var j=0;j<data[0].length;j++)
			{	
			
				var nextState=getState(data[i][j]);
				
				if(state==nextState){moves[Math.abs(offset-nextState)]+=1}
				else{

					if(Math.abs(offset-state)>Math.abs(offset-nextState)){offset=boundaries[meatType].length*2;}

					moves[Math.abs(offset-nextState)]+=1;
				
					state=nextState;
					}
	
			}
		
			dat.push(moves);
			
		}
		
		maxTemps=maxTemps.splice(0,maxTemps.length-1);
		var tempMax=Math.max.apply( Math, maxTemps);
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
    var stack = d3.layout.stack();
		
	var layers = stack(d3.range(n).map(function(d,i) { return bumpLayer(i,dat); }));
		if(meatType=='False'){layers = stack(d3.range(data[0].length).map(function(d,i) { return bumpLayer(i,data); }));}
    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
   var  yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

var margin = {top: 50, right: 10, bottom: 100, left: 50},
    width = 690 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeRoundBands([0, width], .08);
		
var xscaled = d3.scale.linear()
    .domain([0,m/timestep])
    .range([width/30, width*29/30]);
		
		
var y = d3.scale.linear()
    .domain([0, yStackMax])
    .range([height, 0]);
var yscaled = d3.scale.linear()
    .domain([0, yStackMax*dy])
    .range([height,0]);	



var xAxis = d3.svg.axis()
    .scale(xscaled)
    .tickSize(0)
    .tickPadding(10)
    .orient("bottom")
	.tickFormat(convertTime);
		
var yAxis = d3.svg.axis()
    .scale(yscaled)
    .tickSize(0)
    .tickPadding(6)
    .orient("left");
var make_y_axis=function() {        
    return d3.svg.axis()
        .scale(yscaled)
        .orient("left")
        
}		
var svg = d3.select(".span9").append("svg")
	.attr("class","mysteak")
	.attr("id", "mysteak")
   // .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+60)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

if(meatType!='False'){
		var legend = svg.selectAll('g')

        .data(function(){return mode=='C'? CtempScale[meatType]:FtempScale[meatType]})

        .enter()
      .append('g')
        .attr('class', 'Biglegend')
		.style('fill', "black");


    legend.append('rect')
        .attr('x', width/3)
        .attr('y', function(d, i){ return 200+i *  15;})
        .attr('width', 8)
        .attr('height', 8)

        .style('fill', function(d) { return color[meatType](d['position'])

        });

    legend.append('text')
		.attr('class','info')
        .attr('x', width/3+10)
        .attr('y', function(d, i){ return (i *  15+200+8);})
        .text(function(d,i){return d['info'];});	
	 legend.append('text')
		.attr('class','percents')
        .attr('x', width/3-30)
        .attr('y', function(d, i){ return (i *  15+200+8);})
        .text(function(d,i){
		console.log(dat[59])
	
			if(i!=0){return (100*(parseFloat(dat[59][6-i])+parseFloat(dat[59][6+i]))/data[59].length).toFixed(0)+ "% "}
			else{return (100*(parseFloat(dat[59][(6-i)]))/data[59].length).toFixed(0)+ "% "}
		});

}

var ttip = d3.select(".span9").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);	
		
		
var layer = svg.selectAll(".layer")
    .data(layers)
  .enter().append("g")
    .attr("class", "layer")

    .style("fill", function(d, i) {return meatType=='False'? color[meatType](data[i]/tempMax):color[meatType](i); });

	

var rect = layer.selectAll("rect")
    .data(function(d) { return d; })
  .enter().append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", height)
    .attr("width", x.rangeBand())
    .attr("height", 0)
 .style("fill", function(d, i) {return meatType=='False'? color[meatType](data[i][d.y0]/tempMax):""})
	.on("mouseover", function() {
		if(meatType!='False'){
		var rects = d3.select(this);
		var loc=null;
		for(var i=n-1;i>=0;i--)
		{
			if(color[meatType](i)==rects.style("fill")){loc=i;}	
		}

		var leg=d3.selectAll('.Biglegend')[0][boundaries[meatType].length-loc];
		
		$(leg).css("fill","red");
		for(var i=0;i<7;i++)
		{
		var text=d3.selectAll('.percents')[0][boundaries[meatType].length-i];
		var line=parseInt((d3.event.pageX-margin.left)/(x.rangeBand()+1.2)-35);
		var info=mode=='C'? CtempScale[meatType][boundaries[meatType].length-i]['info']:FtempScale[meatType][boundaries[meatType].length-i]['info'];
		

		}
		}
	})
.on("mousemove",function(){


	var Offset = document.getElementById("graphSteak").offsetTop;
	var pos=parseInt(data[0].length-(d3.event.pageY-margin.top)/(height/yStackMax)+12);
var line=parseInt((d3.event.pageX-margin.left)/(x.rangeBand()+1.2)-35);
//console.log(line);
	$("line").remove();
	var myLine = d3.selectAll(".mysteak").append("svg:line")
    .attr("x1", margin.left)
    .attr("y1", d3.event.pageY-margin.top-10)
    .attr("x2", width*32/30)
    .attr("y2", d3.event.pageY-margin.top-10)
	.style("z-index",-1)
    .style("stroke", "grey");
	//console.log(d3.event.pageX-parseFloat($("body").css('margin-left')));
	var ttip=d3.select('.tooltip');
	if(mode!='C'){
		
	ttip.html(toF(parseFloat(data[line][pos])).toFixed(2)+ "\xB0F")  }
	else{
		ttip.html(parseFloat(data[line][pos]).toFixed(2)+ "\xB0C")}
	  // ttip.html(line.toFixed(2)+ "\xB0C") 
	
	   			ttip.style("opacity", 1)
                .style("left", (d3.event.pageX-parseFloat($("body").css('margin-left'))+10) + "px")     
                .style("top", (d3.event.pageY+10) + "px");   
})
			
        

.on("mouseout", function() {
			var ttip=d3.select('.tooltip');
		ttip.style("opacity", 0);
		$("line").remove();
	if(meatType!='False'){
		var rects = d3.select(this);
		var loc=null;
		for(var i=n-1;i>=0;i--)
		{

			if(color[meatType](i)==rects.style("fill")){loc=i;}	
		}
		var leg=d3.selectAll('.Biglegend')[0][boundaries[meatType].length-loc];

		$(leg).css("fill","black");
			
	}
        
	});	
var imgstop = svg.selectAll("image").data(flame);
            imgstop.enter()
            .append("svg:image")
			.attr("xlink:href", function(d){return d[1]==1? "flamedown.png":"flame.png"})
			.attr("width", Math.min(x.rangeBand(),30))
            .attr("height", Math.min(x.rangeBand(),30))
			.attr("x", function(d){return (d[0]+1.5)*(x.rangeBand()+1)})
            .attr("y", function(d){return -Math.min(x.rangeBand(),30)+(height+Math.min(x.rangeBand(),30))*(1-d[1])})
		
var linktext = svg.selectAll("g.linklabelholder").data(flame);
    linktext.enter().append("g").attr("class", "linklabelholder")
     .append("text")
     .attr("class", "linklabel")
     .attr("dx", function(d){return (d[0]+1.5)*(x.rangeBand()+1)})
     .attr("dy", function(d){return -Math.min(x.rangeBand(),30)/1.2+(height+2*Math.min(x.rangeBand(),30))*(1-d[1])})
     .attr("text-anchor", "right")
		.style("font-size", "8px")
     .text(function(d,i) {
		 
		 if(i==0){return mode=='C'? d[2].toFixed(0):toF(d[2]).toFixed(0)}
		if(i==1&&flame[i][0]==flame[i-1][0]){return mode=='C'? d[2].toFixed(0):toF(d[2]).toFixed(0)}
		if(i==1){return '';}
		if(flame[i][0]==flame[i-1][0]&&flame[i-2][2]!=flame[i][2]){return mode=='C'? d[2].toFixed(0):toF(d[2]).toFixed(0)}				  
		else return "";});

		
rect.transition()
    .delay(function(d, i) { return meatType=='False'? 0:i * 10; })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
		

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis);	
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height+30)
    .text("Time (minutes:seconds)");
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -height/5)
    .attr("y",-30)
 	.attr("transform", "rotate(-90)")
    .text("Meat Thickness (cm)");
		
svg.append("text")
    .attr("class", "y label1")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Side 2");
svg.append("text")
    .attr("class", "y label2")
    .attr("text-anchor", "end")
    .attr("y", 13)
    .attr("x",-height+margin.bottom/3)
    .attr("transform", "rotate(-90)")
    .text("Side 1");	
		
		
/*
 svg.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
			
        )	
	*/	
var timeout = setTimeout(function() {
  d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
}, 2000);

function change() {
  clearTimeout(timeout);
  if (this.value === "grouped") transitionGrouped();
  else transitionStacked();
}

function transitionGrouped() {
  y.domain([0, yGroupMax]);

  rect.transition()
      .duration(function(d){return meatType=='False'? 0:500})
      .delay(function(d, i) {return meatType=='False'? 0: i * 10; })
      .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
      .attr("width", x.rangeBand() / n)
    .transition()
      .attr("y", function(d) { return y(d.y); })
      .attr("height", function(d) { return height - y(d.y); });
}

function transitionStacked() {
  y.domain([0, yStackMax]);

  rect.transition()
      .duration(function(d){return meatType=='False'? 0:500})
      .delay(function(d, i) { return meatType=='False'? 0:i * 10; })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
    .transition()
      .attr("x", function(d) { return x(d.x); })
      .attr("width", x.rangeBand());
}


function bumpLayer(layer,data) {


  var a = [], i;
  for (i = 0; i < m; ++i) {
	  if(meatType=='False'){
		 
		   a[i] = 1;
	  }
	 else{ a[i] = 1 * data[i][layer];}
	
  }
  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
}
	
	}
	    return {setup: setup};
	}
	());

	$(document).ready(function(){
    $('.graph').each(function(){
        graph.setup($(this),sampledata,flame,timestep,meatType,maxTemps,mode);});
});
}
