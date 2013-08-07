    var outer_height = 300;
    var outer_width = parseInt($(".span7").css("width"));

    var margin = { top: 30, right: 20, bottom: 20, left: 20 }
    var chart_width = outer_width - margin.left - margin.right;
    var chart_height = outer_height -margin.top - margin.bottom;

    var graph_container_width = 300      
    var graph_container_height = 160;

    var graph_margin = { top: 30, right: 20, bottom: 35, left: 40 }
    var graph_width = graph_container_width - graph_margin.left - graph_margin.right;
    var graph_height = graph_container_height - graph_margin.top - graph_margin.bottom;

    var x_scale = d3.scale.linear().domain([0,10]).range([0,graph_width]);
    var y_scale_middle = d3.scale.linear().domain([75.5,78]).range([graph_height,0]);
    var y_scale_error = d3.scale.linear().domain([0,2]).range([graph_height,0]);

    var color_scale = d3.scale.category10();

    var graph;

function setupMiddleTemps(){
            $(".chart-container").empty();
            graph = d3.select(".chart-container").append("svg")
                .attr("class","graph").attr("height", graph_container_height)
                .attr("width",parseInt(graph_container_width)).append("g")
                .attr("transform","translate(" + graph_margin.left + "," + graph_margin.top + ")");

            graph.selectAll(".y-line").data(y_scale_middle.ticks(1)).enter().append("line")
                .attr("class", "y-line")
                .attr('x1', 0)
                .attr('x2', graph_width)
                .attr('y1', y_scale_middle)
                .attr('y2',y_scale_middle);
            
            graph.selectAll(".x-line").data(x_scale.ticks(1)).enter().append("line")
                .attr("class", "x-line").attr('x1', x_scale)
                .attr('x2', x_scale).attr('y1', 0)
                .attr('y2',graph_height);

            graph.append("rect")
                .attr("x",0)
                .attr("y",0)
                .attr("width",graph_width)
                .attr("height",graph_height)
                .attr("fill","#e4e4e4");
            
            graph.selectAll(".y-scale-label").data(y_scale_middle.ticks(6)).enter().append("text")
                .attr("class", "y-scale-label")
                .attr("x",x_scale(0))
                .attr('y',y_scale_middle)
                .attr("text-anchor","end")
                .attr("dy","0.3em")
                .attr("dx","-0.1em")
                .text(String);
            
            graph.append("text")
                .attr("class", "time-label")
                .attr("x",graph_width/2)
                .attr('y',y_scale_middle(0))
                .attr("text-anchor","middle")
                .attr("dy","2em")
                //.attr("dx","-0.1em")
                .text("size of timestep");

            graph.append("text")
                .attr("class", "prob-label")
                .attr("x",x_scale(0))
                .attr("y",graph_height/2)
                .attr("text-anchor","middle")
                .attr("transform",'rotate(-90 -12,65)')
                .text("middle temperature");
        }


        function updateMiddleTemps(){
            $(".graph").empty();
            setupMiddleTemps();
            var data_array = testData;
            //var data_array = [{0:1,1:0,2:0},{0:0.5,1:0.5,2:0},{0:3/8,1:0.5,2:1/8}];
            var restructured_data = [];
            for (var i = 0; i < testData[0].length; i++) {
                restructured_data.push(testData[i].finalTemps);
//                var inner_array = [];
//                for (var j = 0; j < data_array.length; j++) {
//                    inner_array.push({"px":j,"py":data_array[j][i],"color_id":i});
//                }
//                restructured_data.push(inner_array);
            }

            var x_new_scale = d3.scale.linear()
            .domain([testData[0].timestep,testData[testData.length-1].timestep])
            .range([0,graph_width]);

            graph.selectAll(".x-scale-label")
                .data(x_new_scale.ticks(8)).enter().append("text")
                    .attr("class", "x-scale-label")
                    .attr("x",x_new_scale)
                    .attr('y',y_scale_middle(75.5))
                    .attr("text-anchor","middle")
                    .attr("dy","0.9em")
                    //.attr("dx","-0.1em")
                    .text(String);
            
            graph.selectAll(".datapoint").data(testData).enter().append("circle")
                .attr("class", "datapoint")
                .attr("cx", function(d,i){console.log(d.finalTemps[16]); return x_new_scale(d.timestep)})
                .attr("cy", function(d){return y_scale_middle(d.finalTemps[16])})
                .attr("r", 2);
            
//            var line = d3.svg.line()
//                .x(function(d,i){
//                    return i;
//                })
//                .y(function(d){
//                    //console.log("this",d,d.y,y_scale(d.y));
//                    return y_scale(d.finalTemps[15]);
//                });

//            graph.append("path")
//                    .attr("class","line-graph line"+i)
//                    .attr("d",line(testData))
//                    .attr("stroke-width",3)  
//                    .attr("fill","none")
//                    .attr("stroke", color_scale(i));

        }

    function setupError(){
            $(".chart-container").empty();
        
            graph = d3.select(".chart-container").append("svg")
                .attr("class","graph").attr("height", graph_container_height)
                .attr("width",parseInt(graph_container_width)).append("g")
                .attr("transform","translate(" + graph_margin.left + "," + graph_margin.top + ")");

            graph.selectAll(".y-line").data(y_scale_error.ticks(1)).enter().append("line")
                .attr("class", "y-line")
                .attr('x1', 0)
                .attr('x2', graph_width)
                .attr('y1', y_scale_error)
                .attr('y2',y_scale_error);
            
            graph.selectAll(".x-line").data(x_scale.ticks(1)).enter().append("line")
                .attr("class", "x-line").attr('x1', x_scale)
                .attr('x2', x_scale).attr('y1', 0)
                .attr('y2',graph_height);

            graph.append("rect")
                .attr("x",0)
                .attr("y",0)
                .attr("width",graph_width)
                .attr("height",graph_height)
                .attr("fill","#e4e4e4");
            
            graph.selectAll(".y-scale-label").data(y_scale_error.ticks(6)).enter().append("text")
                .attr("class", "y-scale-label")
                .attr("x",x_scale(0))
                .attr('y',y_scale_error)
                .attr("text-anchor","end")
                .attr("dy","0.3em")
                .attr("dx","-0.1em")
                .text(String);
            
            graph.append("text")
                .attr("class", "time-label")
                .attr("x",graph_width/2)
                .attr('y',y_scale_error(0))
                .attr("text-anchor","middle")
                .attr("dy","2em")
                //.attr("dx","-0.1em")
                .text("size of timestep");

            graph.append("text")
                .attr("class", "prob-label")
                .attr("x",x_scale(0))
                .attr("y",graph_height/2)
                .attr("text-anchor","middle")
                .attr("transform",'rotate(-90 -12,65)')
                .text("middle temperature");
        }


        function updateError(){
            $(".graph").empty();
            setupError();
            var x_new_scale = d3.scale.linear()
                .domain([0,8]).range([0,graph_width]);
            
            var data_array = findError();

            graph.selectAll(".x-scale-label")
                .data(x_new_scale.ticks(8)).enter().append("text")
                    .attr("class", "x-scale-label")
                    .attr("x",x_new_scale)
                    .attr('y',y_scale_error(0))
                    .attr("text-anchor","middle")
                    .attr("dy","0.9em")
                    //.attr("dx","-0.1em")
                    .text(String);
            
            graph.selectAll(".datapoint").data(data_array).enter().append("circle")
                .attr("class", "datapoint")
                .attr("cx", function(d,i){return x_new_scale(i+1)})
                .attr("cy", function(d){console.log(d); return y_scale_error(d)})
                .attr("r", 2);

        }
        
        function findError(){
            var errors = [];
            for(var i=1; i<testData.length; i++){
                errors.push(testData[0].finalTemps[16]-testData[i].finalTemps[16])
            }
            return errors;
        }

updateMiddleTemps();