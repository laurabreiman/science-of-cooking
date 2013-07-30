var perfectSteak = function (div) {


    function Model(div) {
		var currentInfo={'meatTemp':23, 'thickness':6, 'data':[], 'numRows':2}
        var timeStep = 15;
        var inputTable = $(".inputTable");

        var changeThickness = function (newVal) {

            currentInfo["thickness"] = newVal;

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
			console.log(currentInfo["data"])
        }
		
		var buildData=function(){
			var newData=[];
			console.log(currentInfo["numRows"]);
				for (var g=0; g<currentInfo["numRows"]; g++){
					var side1data=$("#inp1_"+g).val();
					var side2data=$("#inp2_"+g).val();
					var timedata=$("#row"+g+"time").val();
					newData.push([timedata, side1data, side2data]);
				}
			console.log(newData)
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
			numRowsMinus:numRowsMinus
        }
    }




    function View(div, model) {

        var inputTable = $("<table class='inputTable table table-striped'></table>");
        var displayDiv = $("<div class='displayDiv'></div>");
        displayDiv.append(inputTable);
        div.append(displayDiv);

        div.append
        var addButton;
        var subButton;
        var flipButton;
        var cookButton;

        var buildTable = function () {
            var inpTabHeader = $("<tr><th class='inpTabHeader'>Time (s)</th><th class='inpTabHeader'>Side 1 (&#176;C)</th><th class='inpTabHeader'>Side 2 (&#176;C)</th></tr>");
            inputTable.append(inpTabHeader);
            var timeStep = model.timeStep;
            var len = model.currentInfo["data"].length;
            var newData = []
            $("#cookButton").remove();

            for (var i = 0; i < model.currentInfo["numRows"]; i++) {
                var iminus = i - 1;
                addButton = $("<button class='btn btn-mini' id='addButton'>+</button>");
                subButton = $("<button class='btn btn-mini' id='subButton'>-</button>");
                flipButton = $("<button class='btn btn-mini' id='flipButton" + i + "'><font size=4px>&harr;</font></button>");
                cookButton = $("<button class='btn' id='cookButton'>Let's get cooking!</button>");

                var row = $("<tr></tr>");
                var timeCol = $("<td ><input id='row" + i + "time' type='text' value=" + i * model.timeStep + "></td>");
                var inp1 = $("<input type='text' id='inp1_" + i + "'>");
                var inp2 = $("<input type='text' id='inp2_" + i + "'>");
                var step1Col = $("<td id='row" + i + "side1'></input>");
                step1Col.append(inp1);
                var step2Col = $("<td id='row" + i + "side2' class='row" + i + "'></td>");
                step2Col.append(inp2);
                step1Col.append(flipButton);
                row.append(timeCol, step1Col, step2Col);
                inputTable.append(row);
                if (i == model.currentInfo["numRows"] - 1) {
                    inputTable.append(addButton, subButton);
                    displayDiv.append(cookButton);
                }
                if (len == 0) {

                    inp1.val(23);
                    inp2.val(23);
                    model.dataAdd([parseFloat($("#row" + i + "time").val()), parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])

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

			var val=parseFloat($("#row" + (i-1) + "time").val())+model.timeStep;
			
            var timeCol = $("<td ><input id='row" + i + "time' type='text' value=" +(val)+ "></td>");
            var inp1 = $("<input type='text' id='inp1_" + i + "'>");
            var inp2 = $("<input type='text' id='inp2_" + i + "'>");
            var step1Col = $("<td id='row" + i + "side1'></input>");
            step1Col.append(inp1);
            var step2Col = $("<td id='row" + i + "side2' class='row" + i + "'></td>");
            step2Col.append(inp2);
            step1Col.append(flipButton);
            row.append(timeCol, step1Col, step2Col);
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
				console.log(model.currentInfo["data"]);
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

        var CookButtonFun = function () {
            cookButton.on("click", function () {
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
				console.log(meatType);
				//THIS WILL COOK THE STEAK IF WE HAVE VALID INPUTS
				if (OKtoCook==true){
					var steak = [model.currentInfo["data"][0][1]];
					for (var m = 0; m < parseFloat($("#thicknessInp").val()) * 10; m++) {
						steak.push(parseFloat($("#steakTemp").val()))
					}
					steak.push(model.currentInfo["data"][0][2]);
					calculate(model.currentInfo["data"], steak,meatType)
				}
            });
        }

        var timeFun = function (j) {
            $("#row" + j + "time").change(function () {
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


        //timeFun(0);

        view.buildTable();
		
        var thicknessInp = ($("<div id=thickInpDiv><input type='text' id='thicknessInp' value='6'></input> Meat Thickness (cm) </div>"));
        var steakTemp = ($("<div id=tempInpDiv><input type='text' id='steakTemp' value='23'></input>Initial Meat Temperature (&#176;C)</div>"));
		//Item to hold inputs of meat. Append meatInput to your display
		var meatInput=$('<form id="meatInp">What type of meat are you cooking?<br>'
		+'<input type="radio" name="meat" id="Steak" checked>Steak<br>'
		+'<input type="radio" name="meat" id="Tuna">Tuna<br>'
		+'<input type="radio" name="meat" id="Turkey">Turkey</form>');


        $('.displayDiv').prepend(thicknessInp, steakTemp, meatInput);
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