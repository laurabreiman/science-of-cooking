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
cookButton=$("<button class='btn' id='cookButton'>Cook!</button>");
	
var row=$("<tr></tr>");
var timeCol=$("<td id='row"+i+"time'><input type='text' value="+i*model.timeStep+"></td>");
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
model.dataAdd([timeStep*i, $("#inp1_"+i).val(), $("#inp2_"+i).val()])

} else if (i<=len){


inp1.val(model.data[i][1]);
inp2.val(model.data[i][2]);
model.dataAdd([timeStep*i, $("#inp1_"+i).val(), $("#inp2_"+i).val()])
} else{

inp1.val(model.data[i-1][1]);
inp2.val(model.data[i-1][2]);
model.dataAdd([timeStep*i, $("#inp1_"+iminus).val(), $("#inp2_"+iminus).val()])
}
timeFun(i);
flipButtonFun(i);
}
model.dataClear();
addButtonFun();
subButtonFun();
CookButtonFun(); 
 

};
 
var addButtonFun=function(){
addButton.on("click", function(){
numRows++;
$(".inputTable").empty();
buildTable(numRows);
});
};
 
var subButtonFun=function(){
subButton.on("click", function(){
numRows--;
//$(".inputTable").empty();
//buildTable(numRows);
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

model.dataClear();
for (var e=0; e<numRows; e++){
var curTime=model.timeStep*e;
var cur1=$("#inp1_"+e).val();
var cur2=$("#inp2_"+e).val();
model.dataAdd([curTime, cur1, cur2]);
model.changeMeatTemp($("#steakTemp").val())
model.changeThickness($("#thicknessInp").val())

}
var steak = [model.data[0][1]]
for(var m=0;m<model.thickness*10;m++)
{steak.push(model.meatTemp)
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
var thicknessInp=($("<div><input type='text' id='thicknessInp'></input> Meat Thickness</div>"));
var steakTemp=($("<div><input type='text' id='steakTemp'></input>Meat Temperature</div>"));
// thicknessInp.change(function(){
// model.changethickness(thicknessInp.val());
// })
 
div.append(thicknessInp, steakTemp);
};
return {setup:setup};
}();

//call setup when the document is ready
$(document).ready(function(){
    $('.perfectSteak').each(function(){
        perfectSteak.setup($(this));});
});