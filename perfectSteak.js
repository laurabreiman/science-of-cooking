var perfectSteak = function (div) {


    function Model(div) {

        var currentInfo={'meatTemp':23, 'thickness':3, 'data':[], 'numRows':2, 'time':0, 'OKToGraph':true, 'recipe':{}, totalTime:0};
        
        var timeStep = 15;
        var inputTable = $(".inputTable");

        var changeThickness = function (newVal) {

            currentInfo["thickness"] = newVal;

        }

        var browserInfo=function(M){
			currentInfo["browser"]=M;
		}
		
		var updateTotalTime=function(secs){
			currentInfo["totalTime"]=secs;
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
			currentInfo['recipe'][name]=recipe;
		}

	

		//CHANGES X SECONDS INTO Y:X WHERE Y IS MINUTES X IS SECONDS
		var convertTime=function(secs){
			console.log("calling convertTime")
			var minutes=Math.floor(parseInt(secs)/60);
			var seconds=parseInt(secs)%60;
			console.log("minutes "+minutes+" seconds "+seconds);
			if (minutes==0 && seconds<10){
				console.log("1")
				console.log(String(0)+":0"+String(seconds))
				return String(0)+":0"+String(seconds);
			}else if (seconds==0){
				console.log(2);
				console.log(String(minutes)+':'+String(seconds)+'0')
				return String(minutes)+':'+String(seconds)+'0';
			}else{
				console.log(3);
				console.log(String(minutes)+':'+String(seconds))
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
         
            var steak = [currentInfo["data"][0][1]];
            for (var m = 0; m < parseFloat($("#thicknessInp").val()) * 10; m++) {
            steak.push(parseFloat($("#steakTemp").val()))
            }
            steak.push(currentInfo["data"][0][2]);
            var myheatsolver = HeatSolver(steak);
            var Thedata=myheatsolver.sixty_graph_arrays_duration(currentInfo["data"]);
            var maxTemps=Thedata.maxTemps;
            var meatType = $("input[type='radio'][name='meat']:checked").attr('id');
            var recipe=[meatType,maxTemps,currentInfo["data"],currentInfo["meatTemp"]];
            addRecipe(name,recipe);
        
        }

 

        var buildData=function(){
        var newData=[];
        
        for (var g=0; g<currentInfo["numRows"]; g++){
        var side1data=parseFloat($("#inp1_"+g).val());
        var side2data=parseFloat($("#inp2_"+g).val());
        var timedata=$("#row"+g+"time").val();
         
        if (timedata.length>2){
        var timeMin=function(time){
         
        var timeString='';
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
         
         
        var timeForGraph=60*timeMin(timedata)+timeSec;
        newData.push([timeForGraph, side1data, side2data]);
         
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
            addRecipe:addRecipe,
            browserInfo:browserInfo,
            updateTotalTime:updateTotalTime
        }
    }




    function View(div, model) {
navigator.sayswho= (function(){
var N= navigator.appName, ua= navigator.userAgent, tem;
 var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
 if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
 M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
 console.log("browserinfo"+M);
 console.log(M[1] +"1" + M[0]+"0");
 if (M[0]=="MSIE"){
$('input[type=text]').each(function(){
$(this).css(
"height", "100px !important"
)}
 )
 }
 model.browserInfo(M);
})();
 

 
 
 
        var inputTable = $("<table class='inputTable table table-striped'></table>");
var clicked=false;
 
        var displayDiv = $("<div class='displayDiv'></div>");
		
        displayDiv.append(inputTable);
        
		// displayDiv.change(function(){
				// model.checkDiv()
				// model.buildData();
				// updateTime();
				// for (var j=0; j<model.currentInfo["numRows"]; j++){
					// var timeInSecs=$("#row"+j+"time").val().replace(':','.').split('.');
					// if(timeInSecs.length>1)
					// {var time=60*parseFloat(timeInSecs[0])+parseFloat(timeInSecs[1]);}
					// else{var time=parseFloat(timeInSecs[0]);}
						// $("#row"+j+"time").val(model.convertTime(time))
					//}
				// }

				
				// model.buildData();
				// updateTime();

				// if(clicked&&model.currentInfo["OKToGraph"]){graph(false)}
			
			// else{ d3.selectAll(".containters").remove();
				 // d3.selectAll(".mysteak").remove();

        var addButton;
        var flipButton;
        var cookButton;

        var saveBut=$('<a href="#saveBut" role="button" class="btn sBut" data-toggle="modal" id="saveBut">Save</a>');
        var cookButt=$("<button class='btn'>Cook</button>");
        var addQuickButton = $("<button class='btn' id='addQuickButton'>Quick Add</button>");
        var addTextButton = $("<button class='btn' id='addTextButton'>Edit Recipe Text</button>");
        var saveModal=$('<div id="saveBut" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-body">Please select a name for your recipe <p> <input type="text" id="recipeName"></input><p><button class="btn" data-dismiss="modal" aria-hidden="true">OK</button></div></div>');
        displayDiv.append(saveModal)

saveBut.on("click", function(){
 
///var selectName=$("<div class='selectName'></div>")
//var name=$("#recipeName").val();
 
//model.saveRecipe(name);

});


        var updateTime=function(){
			var time=0;
			for(var i=0;i<model.currentInfo["numRows"];i++){
				//THIS WILL BE TRIGGERED IF THE TIME NEEDS TO BE CONVERTED
				if(String($("#row"+i+"time").val()).indexOf(':')==-1){
					time+=parseFloat($("#row" + i + "time").val());
					$("#row"+i+"time").val(model.convertTime(parseFloat($("#row" + i + "time").val())));
				}else{
					var colon=String($("#row"+i+"time").val()).indexOf(':');
					var min=String($("#row"+i+"time").val()).substring(0, colon);
					var sec=String($("#row"+i+"time").val()).substring(colon+1);
					time+= 60*min
					time+=sec;
				}
			}
			console.log("totalTime "+time);
			model.updateTotalTime(time);
			console.log("updated"+model.currentInfo["totalTime"])
		}

    var addDropdown=function(){
        $(".dropdown").remove();
         
        var dropdownDiv=$("<div class='dropdown'><div>Saved Methods</div></div>");
        var dropdown1=$('<select class="steakHist" id ="d1"></select>');
        var dropdown2=$('<select class="steakHist"id ="d2"></select>');
         
        
        for(var key in model.currentInfo['recipe']){
        dropdown1.append($('<option>'+key+'</option>'));
        dropdown2.append($('<option>'+key+'</option>'));
    }
     
    
    dropdownDiv.change(function(){
     
    var e1 = document.getElementById("d1");
    var name1 = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById("d2");
    var name2 = e2.options[e2.selectedIndex].text;
    var info=model.currentInfo['recipe'][name1];
    d3.selectAll('.finalsteak').remove();
    drawFinished(info[0],info[1],info[2],info[3],0);
    var inf=model.currentInfo['recipe'][name2];
    drawFinished(inf[0],inf[1],inf[2],inf[3],0);
    });
     
    
    dropdownDiv.append(dropdown1,dropdown2);
    $(".span9").prepend(dropdownDiv);
    
    }
    
    
            var buildDisplay = function () {
    if (model.currentInfo["OKToGraph"]){
    div.append("<div class='row'><div class='container optionBar'></div></div><div class='span3'><div class='container table-container' id='theTable'></div></div><div class='span9'></div></div>");
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
                var inpTabHeader = $("<tr><th class='inpTabHeader'>Duration (m:s)</th><th class='inpTabHeader'>Side 1 (&#176;C)</th><th class='inpTabHeader'>Side 2 (&#176;C)</th></tr>");
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
    saveBut=$('<a href="#saveBut" role="button" class="btn sBut" data-toggle="modal">Save</a>');
    var saveModal=$('<div id="saveBut" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-body">Please select a name for your recipe</div></div>');
    var nameInp=$('<input type="text" id=recipeName width="150px"></input>');
    var okModal=$('<button class="btn" data-dismiss="modal" aria-hidden="true" id="okModal">OK</button>');
    okModal.on("click", function(){
    
     
    model.saveRecipe($("#recipeName").val());
    var name=$("#recipeName").val();
    var dropdown1=$("#d1");
       var dropdown2=$("#d2");
    dropdown1.append($('<option>'+name+'</option>'));
    dropdown2.append($('<option>'+name+'</option>'));
    var e1 = document.getElementById("d1");
    var name1 = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById("d2");
    var name2 = e2.options[e2.selectedIndex].text;
    var info=model.currentInfo['recipe'][name1];
    d3.selectAll('.finalsteak').remove();
    drawFinished(info[0],info[1],info[2],info[3],0);
    var inf=model.currentInfo['recipe'][name2];
    drawFinished(inf[0],inf[1],inf[2],inf[3],0);
    })
    saveModal.append(nameInp,okModal);
     
    
    cookButt.on("click",function(){
    model.checkDiv()
    model.buildData();
    updateTime();
    // for (var j=0; j<model.currentInfo["numRows"]; j++){
    // var timeInSecs=$("#row"+j+"time").val().replace(':','.').split('.');
    // if(timeInSecs.length>1)
    // {var time=parseFloat(timeInSecs[0])+60*parseFloat(timeInSecs[1]);}
    // else{var time=parseFloat(timeInSecs[0]);}
    // $("#row"+j+"time").val(time)
    // }
    //}
    model.buildData();
    
    if(clicked&&model.currentInfo["OKToGraph"]){graph(false)}
    
    else{ d3.selectAll(".containers").remove();
    d3.selectAll(".mysteak").remove();
    
    model.dataClear();


}


})

            inputTable.append(addButton);//, saveBut,saveModal);
							  $(".span3").append(cookButt,addQuickButton,addTextButton);
                        addDropdown();
                }
var sumtime=0;
var time=$("#row" + i + "time").val().replace(':','.').split('.');
for (var k=0;k<time.length;k++)
{
sumtime+=parseFloat(time[k]);
}
 
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
 
            model.dataAdd([sumtime, parseFloat($("#inp1_" + i).val()), parseFloat($("#inp2_" + i).val())])
closeRowFun();
        }
 
}

// UNUSED FUNCTION - GONNA BE DELETED
//        var delRow = function () {
//            $('.inputTable tr:last').remove();
//        }

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


var graph=function(isFirst){
             d3.selectAll(".mysteak").remove();
  d3.selectAll(".containers").remove();
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
					calculate(model.currentInfo["data"], steak,meatType,isFirst,model.currentInfo["totalTime"])
				}
}
        var CookButtonFun = function () {
            $(".cookButton").on("click", function () {
clicked=true;
model.checkDiv();
d3.selectAll(".mysteak").remove();
d3.selectAll(".containers").remove();
if (model.currentInfo["OKToGraph"]){
d3.selectAll("svg").remove();

                model.dataClear();
graph(true);
};
            });
        }

        var timeFun = function (j) {
            $("#row" + j + "time").change(function () {
 
                if (j == 0) {
                    timeStep = parseInt($("#row" + j + "time").value);
                }
 

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
        $('.inputTable').offset({top:1060});
     


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