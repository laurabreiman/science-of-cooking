var perfectSteak = function (div) {


    function Model(div) {
		var currentInfo={'meatTemp':23, 'thickness':3, 'data':[], 'numRows':2, 'time':0, 'OKToGraph':true, 'recipes':[]}
        var timeStep = 15;
        var inputTable = $(".inputTable");

        var changeThickness = function (newVal) {

            currentInfo["thickness"] = newVal;

        }
		var checkDiv=function(){
			currentInfo["OKToGraph"]=true;
			$(".alert").remove();
			for (var h=0; h<currentInfo["numRows"]; h++){

				if(parseFloat($("#inp1_"+h).val())<0){
					var side1Alert=$("<div class='alert alert-danger' id='row"+h+"side1alert'>Too low!</div>");
					$("#row"+h+"side1").append(side1Alert);
					currentInfo["OKToGraph"]=false;
					}
				if(parseFloat($("#inp2_"+h).val())<0){
					var side2Alert=$("<div class='alert alert-danger' id='row"+h+"side2alert'>Too low!</div>");
					$("#row"+h+"side2").append(side2Alert);
					currentInfo["OKToGraph"]=false;
				}
				if(parseFloat($("#row"+h+"time").val())<0){
					var timeAlert=$("<div class='alert alert-danger' id='row"+h+"timeAlert'>Negative time</div>");
					$("#duration"+h).append(timeAlert);
					currentInfo["OKToGraph"]=false;
				}
			}
		}

		var addTime=function(value){
			currentInfo['time']+=value;
		}

		var changeTime=function(value){
			currentInfo['time']=value;
		}
		
		var addRecipe=function(name, recipe){
			currentInfo['recipe']['name']=recipe;
		}

		var addRecipe=function(name, recipe){
			currentInfo['recipe']['name']=recipe;
		}

		//CHANGES X SECONDS INTO Y:X WHERE Y IS MINUTES X IS SECONDS
		var convertTime=function(secs){
			var minutes=Math.floor(parseInt(secs)/60);
			var seconds=parseInt(secs)%60;
			if (seconds==0){
				return String(minutes)+':'+String(seconds)+'0';
			}else{
				return String(minutes)+':'+String(seconds);
			}
		}

		var numRowsPlus=function(){
			currentInfo["numRows"]++;
		}

		var numRowsMinus=function(){
			currentInfo["numRows"]--;
		}

        var changeMeatTemp = function (newVal) {
            currentInfo["meatTemp"] = newVal;
        }

        //OK THIS WORKS NOW
        var dataClear = function () {
            currentInfo["data"]=[];
        }

        //THIS ADDS AN ELEMENT TO THE DATA ARRAY
        var dataAdd = function (item) {

            currentInfo["data"].push(item);
        }

        //THIS IS FOR CHANGING THE ENTIRE DATA ARRAY
        var dataChange = function (array) {
            currentInfo["data"]=array;

        }
		
		var saveRecipe=function(name){
			console.log(currentInfo["data"]);
		}

		var saveRecipe=function(name){
			console.log(currentInfo["data"]);
		}

		var buildData=function(){
			var newData=[];

				for (var g=0; g<currentInfo["numRows"]; g++){
					var side1data=parseFloat($("#inp1_"+g).val());
					var side2data=parseFloat($("#inp2_"+g).val());
					var timedata=$("#row"+g+"time").val();
					console.log("timedata"+timedata+" timedata length " +timedata.length)
					if (timedata.length>2){
						var timeMin=function(time){
							console.log("timeMin")
							var timeString=''
							for (var x=0; x<time.length; x++){
								if (time.charAt(x)==':'){
									break;
								} else {
								timeString += time.charAt(x);
								}
							}
							return parseInt(timeString)
						}
					}else{
						var timeMin=function(time){
							return 0;
						}
					}
					var timeSec=parseInt(timedata.charAt(timedata.length-2)+timedata.charAt(timedata.length-1));
					console.log('timeMin '+timeMin(timedata))
					console.log('timeSec '+timeSec);
					var timeForGraph=60*timeMin(timedata)+timeSec;
					newData.push([timeForGraph, side1data, side2data]);
					console.log('timeForGraph'+timeForGraph)
				}

			dataChange(newData);

		}

        return {
            currentInfo:currentInfo,
            changeThickness: changeThickness,
            timeStep: timeStep,
            dataAdd: dataAdd,
            dataClear: dataClear,
            dataChange: dataChange,
            changeMeatTemp: changeMeatTemp,
			buildData:buildData,
			numRowsPlus:numRowsPlus,
			numRowsMinus:numRowsMinus,
			convertTime:convertTime,
			changeTime:changeTime,
			addTime:addTime,
			buildData:buildData,
			checkDiv:checkDiv,
			saveRecipe:saveRecipe,
			addRecipe:addRecipe
        }
    }




    function View(div, model) {
        var inputTable = $("<table class='inputTable table table-striped'></table>");
		var clicked=false;
		//inputTable.change(function(){console.log("click"); model.buildData(); updateTime(); if(clicked){graph()}});
        var displayDiv = $("<div class='displayDiv'></div>");

        displayDiv.append(inputTable);
		displayDiv.change(function(){
				model.checkDiv()
				model.buildData();
				updateTime();
				for (var j=0; j<model.currentInfo["numRows"]; j++){
					var timeInSecs=parseFloat($("#row"+j+"time").val());
					if (timeInSecs>60){
						$("#row"+j+"time").val(model.convertTime(timeInSecs))
					}
				}

				//console.log("display_div changed")
				model.buildData();
				updateTime();

				if(clicked&&model.currentInfo["OKToGraph"]){graph()}

			else{d3.selectAll("svg")
                    .remove();


                model.dataClear();


				}


		})
        var addButton;
        var flipButton;
        var cookButton;
					var saveBut=$('<a href="#saveBut" role="button" class="btn" data-toggle="modal" id="saveBut">Save</a>');
			var saveModal=$('<div id="saveBut" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-body">Please select a name for your recipe <p> <input type="text" id=recipeName width="150px"></input><p><button class="btn" data-dismiss="modal" aria-hidden="true">OK</button></div></div>');
			displayDiv.append(saveModal)

			saveBut.on("click", function(){
				var selectName=$("<div class='selectName'></div>")
				var name=$("#recipeName").val();
				console.log("name "+ name);
				model.saveRecipe(name)
			});
        var updateTime=function(){
			for(var i=0;i<model.currentInfo["numRows"];i++)
			{
				//console.log("change");
				if(i>0){
				var vals=parseFloat($("#row" + (i-1) + "time").val());


				var minSecs=model.convertTime(vals);
				}
				else{
					var minSecs=model.convertTime(0);
				}

			}
		}

		var addDropdown=function(){
			var dropdownDiv=$("<div class='dropdown'></div>");

			var dropdown1=$('<select id="steakHist"></select>');
		dropdown1.append($('<option>Current</option>'));
			
				var dropdown2=$('<select id="steakHist"></select>');
		dropdown2.append($('<option>Current</option>'));
	
		
			dropdownDiv.append(dropdown1,dropdown2);
			$(".span6").append(dropdownDiv);

		}


        var buildDisplay = function () {
			if (model.currentInfo["OKToGraph"]){
				div.append("<div class='row'><div class='span3'><div class='container optionBar'></div></div><div class='span3'><div class='container table-container' id='theTable'></div></div><div class='span6'></div></div>");
				$(".table-container").append(displayDiv);

                $("#startModal").modal("show");
            
				cookButton = $(".cookButton");

				buildTable();
				}
				else{
					(".")
				}


				addDropdown();
        }


			var toF=function(C)
			{
			return (C*(5/9)+32 + "&#176;F");
	}
        var buildTable = function () {
            var inpTabHeader = $("<tr><th class='inpTabHeader'>Duration (s)</th><th class='inpTabHeader'>Side 1 (&#176;C)</th><th class='inpTabHeader'>Side 2 (&#176;C)</th></tr>");
            inputTable.append(inpTabHeader);
            var timeStep = model.timeStep;
            var len = model.currentInfo["data"].length;
            var newData = []
			var sumtime=0;
            for (var i = 0; i < model.currentInfo["numRows"]; i++) {
                var iminus = i - 1;
                addButton = $("<button class='btn btn-mini' id='addButton'>+</button>");
                flipButton = $("<button class='btn btn-mini' id='flipButton" + i + "'><font size=4px>&harr;</font></button>");

                var row = $("<tr id='row"+i+"'></tr>");

				if(i>0){
				var vals=parseFloat($("#row" + (i-1) + "time").val());

	
				 }

                var duration = $("<td id='duration"+i+"'><input id='row" + i + "time' type='text' value='15'></td>");
                var inp1 = $("<input type='text' id='inp1_" + i + "'>");
                var inp2 = $("<input type='text' id='inp2_" + i + "'><button type='button' class='close closeRow' id='row"+i+"button'>&times;</button>");
                var step1Col = $("<td id='row" + i + "side1'></input>");
                step1Col.append(inp1);
                var step2Col = $("<td id='row" + i + "side2' class='row" + i + "'></td>");
                step2Col.append(inp2);
                step1Col.append(flipButton);

                row.append(duration, step1Col, step2Col);
                inputTable.append(row);
                if (i == model.currentInfo["numRows"] - 1) {
                    inputTable.append(addButton,saveBut);

                }
				var sumtime=0;
				var time=$("#row" + i + "time").val().replace(':','.').split('.');
			for (var k=0;k<time.length;k++)
			{
				sumtime+=parseFloat(time[k]);
			}
				console.log(sumtime);
                if (len == 0) {

                    inp1.val(180);
                    inp2.val(23);


                    model.dataAdd([sumtime, parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())]);

                } else if (i <= len) {

                    inp1.val(model.currentInfo["data"][i][1]);
                    inp2.val(model.currentInfo["data"][i][2]);

                    model.dataAdd([sumtime, parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])
                } else {

                    inp1.val(model.currentInfo["data"][i - 1][1]);
                    inp2.val(model.currentInfo["data"][i - 1][2]);

                    model.dataAdd([sumtime, parseFloat($("#inp1_" + iminus).val()), parseFloat($("#inp2_" + iminus).val())])
                }
                timeFun(i);
                flipButtonFun(i);
            }

            model.dataClear();
            addButtonFun();
            CookButtonFun();
			closeRowFun();
        };


        var addRow = function (table) {
            flipButton = $("<button class='btn btn-mini' id='flipButton" + i + "'><font size=4px>&harr;</font></button>");
            var i = model.currentInfo["numRows"] - 1;
			var row = $("<tr id='row"+i+"'></tr>");



			if(i>0){
			var vals=parseFloat($("#row" + (i-1) + "time").val());


            var duration = $("<td ><input id='row" + i + "time' type='text' value='15'></td>");
            var inp1 = $("<input type='text' id='inp1_" + i + "'>");
            var inp2 = $("<input type='text' id='inp2_" + i + "'>");
            var step1Col = $("<td id='row" + i + "side1'></input>");
            step1Col.append(inp1);
            var step2Col = $("<td id='row" + i + "side2' class='row" + i + "'><button type='button' class='close closeRow' id='row"+i+"button'>&times;</button></td>");
            step2Col.append(inp2);
            step1Col.append(flipButton);
            row.append(duration, step1Col, step2Col);
			$('#theTable').stop().animate({
				scrollTop: $("#theTable")[0].scrollHeight
			}, 800);
			console.log($("#theTable").scrollTop());
            timeFun(i);
            flipButtonFun(i);
            table.append(row);
            inp1.val($("#inp1_" + (i-1)).val());
            inp2.val($("#inp2_" + (i-1)).val());
					var sumtime=0;
				var time=$("#row" + i + "time").val().replace(':','.').split('.');
			for (var k=0;k<time.length;k++)
			{
				sumtime+=parseFloat(60*k*time[k]);
			}
				console.log(sumtime);
            model.dataAdd([sumtime, parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])
			closeRowFun();
        }
		}


        var delRow = function () {
            $('.inputTable tr:last').remove();
        }

        var addButtonFun = function () {
            addButton.on("click", function () {
				model.buildData();
				model.numRowsPlus();
                addRow($(".inputTable"));
            });
        };


		var closeRowFun=function(){
			$(".closeRow").on("click", function(){
				var rowNum=String($(this).attr("id").charAt(3))
				$("#row"+rowNum).remove();
				model.numRowsMinus();

				//NOW WE NEED TO CHANGE THE ROW NUMBER OF ALL THE OTHER ROWS
				for (var l=rowNum+1; l<model.currentInfo["numRows"]; l++){
					$("#row"+l).attr("id", "row"+l-1);
					$("#duration"+l).attr("id", "duration"+l-1);
					$("#row"+l+"side1").attr("id", "row"+l-1+"side1");
					$("inp1_"+l).attr("id", "inp1_"+l-1);
					$("#row"+l+"side2").attr("id", "row"+l-1+"side2");
					$("#inp2_"+l).attr("id", "inp2_"+l-1);
				}

			});
		}


var graph=function(){
	              d3.selectAll("svg")
                    .remove();

                model.dataClear();

                for (var e = 0; e < model.currentInfo["numRows"]; e++) {
                    var curTime = $("#row" + e + "time").val();
                    var cur1 = parseFloat($("#inp1_" + e).val());
                    var cur2 = parseFloat($("#inp2_" + e).val());

				var time=curTime.replace(':','.').split('.');
					if(time.length>1){
				var sumtime=parseFloat(time[1]);	

				sumtime+=parseFloat(60*time[0]);
					}
					else{var sumtime=parseFloat(time[0]);}

				console.log(sumtime);
                    model.dataAdd([sumtime, cur1, cur2]);
                }

				var OKtoCook=true; //IF WE HAVE INVALID INPUTS, IT WILL BE CHANGED TO FALSE

				//THIS BIT IS CHECKING WHETHER THE THICKNESS AND INITIAL TEMP INPUTS ARE VALID
				$("#tempAlert").remove();
				$("#thickAlert").remove();
				var tempAlert=$("<div class='alert' id='tempAlert'>Temperature is not a valid number</div>");
				var thicknessAlert=$("<div class='alert' id='thickAlert'>Thickness is not a valid number</div>");
				if (String(parseInt($("#steakTemp").val()))=='NaN'){
					$("#tempInpDiv").append(tempAlert);
					OKtoCook=false;
				}else if(parseInt($("#steakTemp").val())<-273||parseInt($("#steakTemp").val())>300){
					$("#tempInpDiv").append(tempAlert);
					OKtoCook=false;
				}else{
					model.changeMeatTemp(parseFloat($("#steakTemp").val()))
				};

				if (String(parseInt($("#thicknessInp").val()))=='NaN'){
					$("#thickInpDiv").append(thicknessAlert);
					OKtoCook=false;
				}else if(parseFloat($("#thicknessInp").val())<0.5||parseFloat($("thicknessInp").val())>35){
					$("#thickInpDiv").append(thicknessAlert);
					OKtoCook=false;	
				}else{
					model.changeThickness(parseFloat($("#thicknessInp").val()))
				};

				//add to on click and calculate(blah,blah,blah, meatType)
				var meatType = $("input[type='radio'][name='meat']:checked").attr('id');

				//THIS WILL COOK THE STEAK IF WE HAVE VALID INPUTS
				if (OKtoCook==true){
					var steak = [model.currentInfo["data"][0][1]];
					for (var m = 0; m < parseFloat($("#thicknessInp").val()) * 10; m++) {
						steak.push(parseFloat($("#steakTemp").val()))
					}
					steak.push(model.currentInfo["data"][0][2]);
					calculate(model.currentInfo["data"], steak,meatType)
				}
}
        var CookButtonFun = function () {
            $(".cookButton").on("click", function () {
				clicked=true;
				model.checkDiv();
				//console.log("isOKtograph"+model.currentInfo["OKToGraph"]);
				if (model.currentInfo["OKToGraph"]){
					graph();
				};
            });
        }

        var timeFun = function (j) {
            $("#row" + j + "time").change(function () {
				console.log("timeFun")
                if (j == 0) {
                    timeStep = parseInt($("#row" + j + "time").value);
                }
				// var timeInSecs=parseFloat($("#row"+j+"time").val());
				// if (timeInSecs>60){
					// console.log("greaterthan60")
					// $("#row"+j+"time").val(convertTime(timeInSecs))
				// }

                if (j == 0) {
                    timeStep = parseInt($("#row" + j + "time").value);
                }

            })
        };

        var flipButtonFun = function (k) {
            flipButton.on("click", function () {
                side1data = 0
                side1data += parseInt(parseFloat($('#inp1_' + k).val())) || 0;
                side2data = parseInt(parseFloat($('#inp2_' + k).val()));
                $('#inp1_' + k).val(side2data);
                $('#inp2_' + k).val(side1data);
            })
        };

        return {
            buildDisplay: buildDisplay,
            buildTable: buildTable,
            addButtonFun: addButtonFun,
            flipButtonFun: flipButtonFun,
            timeFun: timeFun
        }

    }


    var setup = function (div) {
        var model = Model();
        var view = View(div, model);



        
        view.buildDisplay();
        $('.inputTable').offset({top:60});
     


    };
    return {
        setup: setup
    };

}();

//call setup when the document is ready
$(document).ready(function () {
    $('.perfectSteak').each(function () {
        perfectSteak.setup($(this));
    });
});