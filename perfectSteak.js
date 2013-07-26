var perfectSteak=function(div){
	
	var setup=function(div){
		var displayDiv = $("<div class='displayDiv'></div>");
		var inputTable = $("<table class='inputTable table table-striped'></table>");
		var inpTabHeader=$("<tr><th class='inpTabHeader'>Time (s)</th><th class='inpTabHeader'>Side 1 (&#176;C)</th><th class='inpTabHeader'>Side 2 (&#176;C)</th></tr>");
		var timeStep=15;

		var meatTemp=23;
		var thickness=8;
		
		var addButton;
		var subButton;
		var flipButton;
		var numRows=5;
		
		var addButtonFun=function(){
			addButton.on("click", function(){
				numRows++;
				inputTable.empty();
				buildTable(numRows);
				});
		};
		
		var subButtonFun=function(){
			subButton.on("click", function(){
			numRows--;
			inputTable.empty();
			buildTable(numRows);
			if (numRows == 1){
				inputTable.empty();
				buildTable(numRows);
				subButton.remove();
			}else{
				inputTable.empty();
				buildTable(numRows);
			}
			});
		};
		
		var timeFun=function(j){
			$("#row"+j+"time").change(function(){
			
				if (j==0){
					timeStep=parseInt($("#row"+j+"time").value);
				
				}
			})
		};
		
		var flipButtonFun=function(k){
			flipButton.on("click", function(){

				side1data=0
				side1data+=parseInt(parseFloat($('#inp1_'+k).val()))||0;
				side2data=parseInt(parseFloat($('#inp2_'+k).val()));
				$('#inp1_'+k).val(side2data);
				$('#inp2_'+k).val(side1data);
				

			})
		};
		
		
		timeFun(0);
		
		var data=[];
		
		//THIS FUNCTION IS CALLED WITHIN TABLE AND MAKES US SOME SHINY NICE DATA
		var buildData=function(numRows){
			data = [];
			for (var q=0; q<numRows; q++){
				//var currentTime=$("#row"+q+"time").val();
				var currentTime=timeStep*q;
				var currentSide1=$("#inp1_"+q).val()||23;
				var currentSide2=$("#inp2_"+q).val()||23;
				data.push([currentTime, currentSide1, currentSide2])
			}
		};
		
		var buildTable=function(n){
			var counter=0;
			inputTable.append(inpTabHeader);
			for(var i=0; i<n; i++){
				addButton=$("<button class='btn btn-mini' id='addButton'>+</button>");
				subButton=$("<button class='btn btn-mini' id='subButton'>-</button>");
				flipButton=$("<button class='btn btn-mini' id='flipButton"+i+"'><font size=4px>&harr;</font></button>");
				var row=$("<tr></tr>");
				var timeCol=$("<td id='row"+counter+"time'><input type='text' value="+counter*timeStep+"></td>");
				var inp1=$("<input type='text' id='inp1_"+counter+"'>");
				var inp2=$("<input type='text' id='inp2_"+counter+"'>");
				var step1Col=$("<td id='row"+counter+"side1'></input>");
				step1Col.append(inp1);
				var step2Col=$("<td id='row"+counter+"side2' class='row"+counter+"'></td>");
				step2Col.append(inp2);
				step1Col.append(flipButton);
				row.append(timeCol, step1Col, step2Col);
				inputTable.append(row);
				if (counter == n-1){
					inputTable.append(addButton, subButton);
				}
				if (data.length==0){
					
					if (i == 0){
						inp1.val(23);
						inp2.val(23);
						//data.push([timeStep, 25, 25])
					} else{
						var iminus = i-1;
						inp1.val($("#inp1_"+iminus).val()||23);
						inp2.val($("#inp2_"+iminus).val()||23);
						//data.push([timeStep*i, $("#inp1_"+iminus).val(), $("#inp2_"+iminus).val()])
					}
				}else if (data.length<=n){
				
					for (var a=0; a<data.length; a++){
						inp1.val(data[a][1]);
						inp2.val(data[a][2]);
					}
					if (i==n){
						inp1.val(data[n-1][1]);
						inp2.val(data[n-1][2]);
					}
				}else if (data.length>n){
					
					for (var b=0; b<n; b++){
						inp1.val(data[b][1]);
						inp2.val(data[b][2])
					}
				}
			
				timeFun(counter);
				flipButtonFun(i);
				counter++;
			}
			
			addButtonFun();
			subButtonFun();
			buildData(n)
			console.log(data);
			//reset data
		};
	
		buildTable(1);
		
		displayDiv.append(GoButton);
		displayDiv.append(inputTable);
		div.append(displayDiv);
		var steak=[data[0][1]];
		for(var i=0;i<thickness*10;i++)
		{
			steak.push(meatTemp)
		}
		steak.push[data[0][2]]
		console.log(steak);
		var GoButton=$("<button class='btn' id='GoButton'>Lets get Cooking!</button>");
		GoButton.on("click",function(){calculate(data,steak)});
		displayDiv.append(GoButton);
		
	};
	return {setup:setup};
}();

//call setup when the document is ready
$(document).ready(function(){
    $('.perfectSteak').each(function(){
        perfectSteak.setup($(this));});
});