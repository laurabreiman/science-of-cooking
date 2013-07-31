var perfectSteak = function (div) {


    function Model(div) {
		var currentInfo={'meatTemp':23, 'thickness':3, 'data':[], 'numRows':2, 'time':0, 'OKToGraph':true}
        var timeStep = 15;
        var inputTable = $(".inputTable");

        var changeThickness = function (newVal) {

            currentInfo["thickness"] = newVal;

        }


		var checkDiv=function(){
			currentInfo["OKToGraph"]=true;
			$(".alert").remove();
			for (var h=0; h<currentInfo["numRows"]; h++){
				console.log(h)
				console.log($("#inp1_"+h).val())
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

		var buildData=function(){
			var newData=[];

				for (var g=0; g<currentInfo["numRows"]; g++){
					var side1data=parseFloat($("#inp1_"+g).val());
					var side2data=parseFloat($("#inp2_"+g).val());
					var timedata=parseFloat($("#row"+g+"time").val());
					newData.push([timedata, side1data, side2data]);
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
			checkDiv:checkDiv
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
				if(clicked&&model.currentInfo["OKToGraph"]){graph()}
				else{d3.select("svg")
                    .remove();
				 d3.select("svg")
                    .remove();
                model.dataClear();}
		})

//        div.append
        var addButton;
        var subButton;
        var flipButton;
        var cookButton;
        var updateTime=function(){
			for(var i=0;i<model.currentInfo["numRows"];i++)
			{
				console.log("change");
				if(i>0){
				var vals=parseFloat($("#row" + (i-1) + "time").val());

				//var info=$("#timeCol"+(i-1)).html();
					//info = info.replace(":", ".").split('.');
					//console.log(info);
				//vals=vals+60*parseFloat(info[0])+parseFloat(info[1]);
				var minSecs=model.convertTime(vals);
				}
				else{
					var minSecs=model.convertTime(0);
				}
				//$("#timeCol"+(i)).html(" "+ minSecs);

			}
		}

        var buildDisplay = function () {
			console.log("isOK"+model.checkDiv())
			console.log("OK"+model.currentInfo["OKToGraph"])
			if (model.currentInfo["OKToGraph"]){
				console.log("isOK");
				console.log("click");

				div.append("<div class='row'><div class='span6'><div class='container optionBar'></div></div><div class='span6'><div class='container table-container'></div></div></div>")
				$(".table-container").append(displayDiv);
                
                $("#startModal").modal("show");
                
				cookButton = $(".cookButton");
//				
//				var thicknessInp = ($("<div id=thickInpDiv><input type='text' id='thicknessInp' value='6'></input> Meat Thickness (cm) </div>"));
//				thicknessInp.change(function(){
//						model.checkDiv();
//						if(clicked&&model.currentInfo["OKToGraph"]){graph()}});
//				var steakTemp = ($("<div id=tempInpDiv><input type='text' id='steakTemp' value='23'></input>Initial Meat Temperature (&#176;C)</div>"));
//				steakTemp.change(function(){
//							model.checkDiv();
//							if(clicked&&model.currentInfo["OKToGraph"]){graph()}});
//			//Item to hold inputs of meat. Append meatInput to your display
//				var meatInput=$('<form id="meatInp">What type of meat are you cooking?<br>'
//					+'<input type="radio" name="meat" id="Steak" checked>Steak<br>'
//					+'<input type="radio" name="meat" id="Tuna">Tuna<br>'
//					+'<input type="radio" name="meat" id="Turkey">Turkey</form>');
//				meatInput.change(function(){
//							model.checkDiv();
//							if(clicked&&model.currentInfo["OKToGraph"]){graph()}});
//				var cookbuttonrow = $("<div class='row'></div");
//				cookbuttonrow.append(cookButton);

//				$('.optionBar').append(thicknessInp, steakTemp, meatInput,cookbuttonrow);
                
                
//				cookButton = $("<button class='btn' id='cookButton'>Let's get cooking!</button>");
//				
//				var thicknessInp = ($("<div id=thickInpDiv><input type='text' id='thicknessInp' value='6'></input> Meat Thickness (cm) </div>"));
//				thicknessInp.change(function(){
//						model.checkDiv();
//						if(clicked&&model.currentInfo["OKToGraph"]){graph()}});
//				var steakTemp = ($("<div id=tempInpDiv><input type='text' id='steakTemp' value='23'></input>Initial Meat Temperature (&#176;C)</div>"));
//				steakTemp.change(function(){
//							model.checkDiv();
//							if(clicked&&model.currentInfo["OKToGraph"]){graph()}});
//			//Item to hold inputs of meat. Append meatInput to your display
//				var meatInput=$('<form id="meatInp">What type of meat are you cooking?<br>'
//					+'<input type="radio" name="meat" id="Steak" checked>Steak<br>'
//					+'<input type="radio" name="meat" id="Tuna">Tuna<br>'
//					+'<input type="radio" name="meat" id="Turkey">Turkey</form>');
//				meatInput.change(function(){
//							model.checkDiv();
//							if(clicked&&model.currentInfo["OKToGraph"]){graph()}});
//				
//						
//				var cookbuttonrow = $("<div class='row'></div");
//				cookbuttonrow.append(cookButton);
//
//				$('.optionBar').append(thicknessInp, steakTemp, meatInput,cookbuttonrow);

				buildTable();
				}
				else{
					(".")
				}
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
//            $("#cookButton").remove();
			var sumtime=0;
            for (var i = 0; i < model.currentInfo["numRows"]; i++) {
                var iminus = i - 1;
                addButton = $("<button class='btn btn-mini' id='addButton'>+</button>");
                subButton = $("<button class='btn btn-mini' id='subButton'>-</button>");
                flipButton = $("<button class='btn btn-mini' id='flipButton" + i + "'><font size=4px>&harr;</font></button>");

                var row = $("<tr></tr>");
				if(i>0){
				var vals=parseFloat($("#row" + (i-1) + "time").val());

				//var info=$("#timeCol"+(i-1)).html();
					//info = info.replace(":", ".").split('.');

				// vals=vals+60*parseFloat(info[0])+parseFloat(info[1]);
				// var minSecs=model.convertTime(vals);
				 }
				// else{
					// var minSecs=model.convertTime(i*timeStep);
				// }
				//var timeCol=$("<td id='timeCol"+i+"'>"+minSecs+"</td>");
                var duration = $("<td id='duration"+i+"'><input id='row" + i + "time' type='text' value='15'></td>");
                var inp1 = $("<input type='text' id='inp1_" + i + "'>");
                var inp2 = $("<input type='text' id='inp2_" + i + "'>");
                var step1Col = $("<td id='row" + i + "side1'></input>");
                step1Col.append(inp1);
                var step2Col = $("<td id='row" + i + "side2' class='row" + i + "'></td>");
                step2Col.append(inp2);
                step1Col.append(flipButton);
                row.append(duration, step1Col, step2Col);
                inputTable.append(row);
                if (i == model.currentInfo["numRows"] - 1) {
                    inputTable.append(addButton, subButton);
//                    displayDiv.append(cookButton);
                }
                if (len == 0) {

                    inp1.val(23);
                    inp2.val(23);
                    model.dataAdd([parseFloat($("#row" + i + "time").val()), parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())]);

                } else if (i <= len) {

                    inp1.val(model.currentInfo["data"][i][1]);
                    inp2.val(model.currentInfo["data"][i][2]);

                    model.dataAdd([parseFloat($("#row" + i + "time").val()), parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])
                } else {

                    inp1.val(model.currentInfo["data"][i - 1][1]);
                    inp2.val(model.currentInfo["data"][i - 1][2]);

                    model.dataAdd([parseFloat($("#row" + i + "time").val()), parseFloat($("#inp1_" + iminus).val()), parseFloat($("#inp2_" + iminus).val())])
                }
                timeFun(i);
                flipButtonFun(i);
            }

            model.dataClear();
            addButtonFun();
            subButtonFun();
            CookButtonFun();
        };


        var addRow = function (table) {
            flipButton = $("<button class='btn btn-mini' id='flipButton" + i + "'><font size=4px>&harr;</font></button>");
            var row = $("<tr></tr>");
            var i = model.currentInfo["numRows"] - 1;
				if(i>0){
					var vals=parseFloat($("#row" + (i-1) + "time").val());

				//var info=$("#timeCol"+(i-1)).html();
					//info = info.replace(":", ".").split('.');

				//vals=vals+60*parseFloat(info[0])+parseFloat(info[1]);
				//var minSecs=model.convertTime(vals);
					}
				//else{
					//var minSecs=model.convertTime(i*timeStep);
				//}

			//var timeCol=$("<td id='timeCol"+i+"'>"+minSecs+"</td>");
            var duration = $("<td ><input id='row" + i + "time' type='text' value='15'></td>");
            var inp1 = $("<input type='text' id='inp1_" + i + "'>");
            var inp2 = $("<input type='text' id='inp2_" + i + "'>");
            var step1Col = $("<td id='row" + i + "side1'></input>");
            step1Col.append(inp1);
            var step2Col = $("<td id='row" + i + "side2' class='row" + i + "'></td>");
            step2Col.append(inp2);
            step1Col.append(flipButton);
            row.append(duration, step1Col, step2Col);
            timeFun(i);
            flipButtonFun(i);
            table.append(row);
            inp1.val($("#inp1_" + (i-1)).val());
            inp2.val($("#inp2_" + (i-1)).val());
			if (model.currentInfo["numRows"]==2){
				subButton = $("<button class='btn btn-mini' id='subButton'>-</button>");
				table.append(subButton);
				subButtonFun();
			}
            model.dataAdd([parseFloat($("#row" + i + "time").val()), parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])
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

        var subButtonFun = function () {
            subButton.on("click", function () {

                model.numRowsMinus();
				model.buildData();
                delRow();
                if (model.currentInfo["numRows"] == 1) {
                    $(".inputTable").empty();
                    buildTable(model.currentInfo["numRows"]);
                    subButton.remove();
                } else {
                    $(".inputTable").empty();
                    buildTable(model.currentInfo["numRows"]);
                }
            });
        };
var graph=function(){
	              d3.select("svg")
                    .remove();
				 d3.select("svg")
                    .remove();
                model.dataClear();

                for (var e = 0; e < model.currentInfo["numRows"]; e++) {
                    var curTime = parseFloat($("#row" + e + "time").val());
                    var cur1 = parseFloat($("#inp1_" + e).val());
                    var cur2 = parseFloat($("#inp2_" + e).val());
                    model.dataAdd([curTime, cur1, cur2]);
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
				console.log("isOKtograph"+model.currentInfo["OKToGraph"]);
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
            subButtonFun: subButtonFun,
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