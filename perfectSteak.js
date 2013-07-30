var perfectSteak = function (div) {


    function Model(div) {
        var meatTemp = 23;
        var thickness = 6;
        var data = [];
        var timeStep = 15;
        var inputTable = $(".inputTable");

        var changeThickness = function (newVal) {

            thickness = newVal;

        }

        var changeMeatTemp = function (newVal) {
            meatTemp = newVal;
        }

        //OK THIS WORKS NOW
        var dataClear = function () {
            while (data.length > 0) {
                data.pop();
            }
        }

        //THIS ADDS AN ELEMENT TO THE DATA ARRAY
        var dataAdd = function (item) {

            data.push(item);
        }

        //THIS IS FOR CHANGING THE ENTIRE DATA ARRAY
        var dataChange = function (array) {
            data = array;
            for (var d = 0; d < array.length; d++) {
                data.push[array[d]]
            }
        }

        return {
            meatTemp: meatTemp,
            thickness: thickness,
            data: data,
            changeThickness: changeThickness,
            timeStep: timeStep,
            dataAdd: dataAdd,
            dataClear: dataClear,
            dataChange: dataChange,
            changeMeatTemp: changeMeatTemp
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

        var numRows = 2;

        var buildTable = function () {
            var inpTabHeader = $("<tr><th class='inpTabHeader'>Time (s)</th><th class='inpTabHeader'>Side 1 (&#176;C)</th><th class='inpTabHeader'>Side 2 (&#176;C)</th></tr>");
            inputTable.append(inpTabHeader);
            var timeStep = model.timeStep;

            var len = model.data.length;
            var newData = []
            $("#cookButton").remove();

            for (var i = 0; i < numRows; i++) {
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
                if (i == numRows - 1) {
                    inputTable.append(addButton, subButton);
                    displayDiv.append(cookButton);
                }
                if (len == 0) {

                    inp1.val(23);
                    inp2.val(23);
                    model.dataAdd([parseFloat($("#row" + i + "time").val()), parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])

                } else if (i <= len) {

                    inp1.val(model.data[i][1]);
                    inp2.val(model.data[i][2]);

                    model.dataAdd([parseFloat($("#row" + i + "time").val()), parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])
                } else {

                    inp1.val(model.data[i - 1][1]);
                    inp2.val(model.data[i - 1][2]);
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
            var i = numRows - 1;
            var timeCol = $("<td ><input id='row" + i + "time' type='text' value=" + i * model.timeStep + "></td>");
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
            inp1.val(23);
            inp2.val(23);
            model.dataAdd([parseFloat($("#row" + i + "time").val()), parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])
        }
        var delRow = function (table) {

            $('.' + table.class + ' tr:last').remove();
        }
        var addButtonFun = function () {
            addButton.on("click", function () {
                numRows++;
                addRow($(".inputTable"));
            });
        };

        var subButtonFun = function () {

            subButton.on("click", function () {
                numRows--;
                delRow($(".inputTable"));
                if (numRows == 1) {
                    $(".inputTable").empty();
                    buildTable(numRows);
                    subButton.remove();
                } else {

                    $(".inputTable").empty();
                    buildTable(numRows);
                }
            });
        };

        var CookButtonFun = function () {
            cookButton.on("click", function () {
                d3.select("svg")
                    .remove();
                model.dataClear();
                for (var e = 0; e < numRows; e++) {
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
				
				
				//THIS WILL COOK THE STEAK IF WE HAVE VALID INPUTS
				if (OKtoCook==true){
					var steak = [model.data[0][1]];
					for (var m = 0; m < parseFloat($("#thicknessInp").val()) * 10; m++) {
						steak.push(parseFloat($("#steakTemp").val()))
					}
					steak.push(model.data[0][2]);
					calculate(model.data, steak)
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
        // thicknessInp.change(function(){
        // model.changethickness(thicknessInp.val());
        // })

        div.append(thicknessInp, steakTemp);
    };
    return {
        setup: setup
    };
var perfectSteak=function(div){

 
function Model(div){
var meatTemp=23;
var thickness=6;
var data=[];
var timeStep=15;
var inputTable=$(".inputTable");
 
var changeThickness=function(newVal){

thickness=newVal;

}
 
var changeMeatTemp=function(newVal){
meatTemp=newVal;
}
 
//OK THIS WORKS NOW
var dataClear=function(){
while(data.length>0){
data.pop();
}
}
 
//THIS ADDS AN ELEMENT TO THE DATA ARRAY
var dataAdd=function(item){
	
data.push(item);
}
 
//THIS IS FOR CHANGING THE ENTIRE DATA ARRAY
var dataChange=function(array){
data=array;
for (var d=0; d<array.length; d++){
data.push[array[d]]
}
}
 
return {meatTemp:meatTemp, thickness:thickness, data:data, changeThickness:changeThickness, timeStep:timeStep, dataAdd:dataAdd,
dataClear:dataClear, dataChange:dataChange, changeMeatTemp:changeMeatTemp}
}
 
 
 
 
function View(div, model){
 
var inputTable = $("<table class='inputTable table table-striped'></table>");
var displayDiv = $("<div class='displayDiv'></div>");
displayDiv.append(inputTable);
div.append(displayDiv);
 
div.append
var addButton;
var subButton;
var flipButton;
var cookButton;
 
var numRows=2;
 
var buildTable=function(){
var inpTabHeader=$("<tr><th class='inpTabHeader'>Time (s)</th><th class='inpTabHeader'>Side 1 (&#176;C)</th><th class='inpTabHeader'>Side 2 (&#176;C)</th></tr>");
inputTable.append(inpTabHeader);
var timeStep=model.timeStep;

var len=model.data.length;
var newData=[]
$("#cookButton").remove();
 
for(var i=0; i<numRows; i++){
var iminus=i-1;
addButton=$("<button class='btn btn-mini' id='addButton'>+</button>");
subButton=$("<button class='btn btn-mini' id='subButton'>-</button>");
flipButton=$("<button class='btn btn-mini' id='flipButton"+i+"'><font size=4px>&harr;</font></button>");
cookButton=$("<button class='btn' id='cookButton'>Let's get cooking!</button>");
	
var row=$("<tr></tr>");
var timeCol=$("<td ><input id='row"+i+"time' type='text' value="+i*model.timeStep+"></td>");
var inp1=$("<input type='text' id='inp1_"+i+"'>");
var inp2=$("<input type='text' id='inp2_"+i+"'>");
var step1Col=$("<td id='row"+i+"side1'></input>");
step1Col.append(inp1);
var step2Col=$("<td id='row"+i+"side2' class='row"+i+"'></td>");
step2Col.append(inp2);
step1Col.append(flipButton);
row.append(timeCol, step1Col, step2Col);
inputTable.append(row);
if (i == numRows-1){
inputTable.append(addButton, subButton);
displayDiv.append(cookButton);
}
if (len==0){

inp1.val(23);
inp2.val(23);
model.dataAdd([parseFloat($("#row"+i+"time").val()),  parseFloat($("#inp1_"+i).val()),  parseFloat($("#inp2_"+i).val())])

} else if (i<=len){

inp1.val(model.data[i][1]);
inp2.val(model.data[i][2]);

model.dataAdd([parseFloat($("#row"+i+"time").val()),  parseFloat($("#inp1_"+i).val()),  parseFloat($("#inp2_"+i).val())])
} else{

inp1.val(model.data[i-1][1]);
inp2.val(model.data[i-1][2]);
model.dataAdd([parseFloat($("#row"+i+"time").val()),  parseFloat($("#inp1_"+iminus).val()),  parseFloat($("#inp2_"+iminus).val())])
}
timeFun(i);
flipButtonFun(i);
}
model.dataClear();
addButtonFun();
subButtonFun();
CookButtonFun(); 
};
 var addRow=function(table)
 {
flipButton=$("<button class='btn btn-mini' id='flipButton"+i+"'><font size=4px>&harr;</font></button>");
var row=$("<tr></tr>");
var i=numRows-1;
var timeCol=$("<td ><input id='row"+i+"time' type='text' value="+i*model.timeStep+"></td>");
var inp1=$("<input type='text' id='inp1_"+i+"'>");
var inp2=$("<input type='text' id='inp2_"+i+"'>");
var step1Col=$("<td id='row"+i+"side1'></input>");
step1Col.append(inp1);
var step2Col=$("<td id='row"+i+"side2' class='row"+i+"'></td>");
step2Col.append(inp2);
step1Col.append(flipButton);
row.append(timeCol, step1Col, step2Col);
timeFun(i);
flipButtonFun(i);
table.append(row);
inp1.val(23);
inp2.val(23);
model.dataAdd([parseFloat($("#row"+i+"time").val()),  parseFloat($("#inp1_"+i).val()),  parseFloat($("#inp2_"+i).val())])
 }
 var delRow=function(table)
 {
	 
	 $('.'+table.class+' tr:last').remove();
 }
var addButtonFun=function(){
addButton.on("click", function(){
numRows++;
addRow($(".inputTable"));
});
};
 
var subButtonFun=function(){
	
subButton.on("click", function(){
numRows--;
delRow($(".inputTable"));
if (numRows == 1){
$(".inputTable").empty();
buildTable(numRows);
subButton.remove();
}else{
	
$(".inputTable").empty();
buildTable(numRows);
}
});
};
 
var CookButtonFun=function(){
	cookButton.on("click", function(){
d3.select("svg")
       .remove();
model.dataClear();
for (var e=0; e<numRows; e++){
var curTime=parseFloat($("#row"+e+"time").val());
var cur1= parseFloat($("#inp1_"+e).val());
var cur2= parseFloat($("#inp2_"+e).val());
model.dataAdd([curTime, cur1, cur2]);
model.changeMeatTemp( parseFloat($("#steakTemp").val()))
model.changeThickness( Math.min(parseFloat($("#thicknessInp").val()),100));

}
var steak = [model.data[0][1]];
for(var m=0;m<Math.min(parseFloat($("#thicknessInp").val()),100)*10;m++)
{steak.push(parseFloat($("#steakTemp").val()))
}
steak.push(model.data[0][2]);
calculate(model.data, steak)
});
}
 
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
 
return {buildTable: buildTable, addButtonFun:addButtonFun, subButtonFun:subButtonFun, flipButtonFun:flipButtonFun, timeFun:timeFun}
 
}
 

var setup=function(div){
var model=Model();
var view=View(div, model);
 
 
//timeFun(0);
 
view.buildTable();
var thicknessInp=($("<div><input type='text' id='thicknessInp' ></input> Meat Thickness (cm) </div>"));
$("#thicknessInp").val("6");	
var steakTemp=($("<div><input type='text' id='steakTemp' ></input>Meat Temperature (&#176;C)</div>"));

// thicknessInp.change(function(){
// model.changethickness(thicknessInp.val());
// })
 
div.append(thicknessInp, steakTemp);
};
return {setup:setup};


}();

//call setup when the document is ready
$(document).ready(function () {
    $('.perfectSteak').each(function () {
        perfectSteak.setup($(this));
    });
});