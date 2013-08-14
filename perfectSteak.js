var perfectSteak = function (div) {


    function Model(div) {

        var currentInfo = {

            'meatTemp': 23, //initial temperature of the meat
            'thickness': 3, //thickness of the meat in centimeters
            'data': [[240,180,23],[240,23,180],[300,23,23]], //timestamps of temperatures
            'numRows': 2, //how many steps there are in the recipe
            'time': 0, //time
            'OKToGraph': true, //flag for when data is ready to graph
            'recipe': {}, //recipes -- THIS HAS ALL SAVED RECIPES, INCLUDING THE ONES THAT WE SAVED
            'totalTime': 0, //total cooking
            'names': {
                'Steak': 0,
                'Tuna': 0,
                'Turkey': 0
            }

        };

        var timeStep = 240;
        var inputTable = $(".inputTable");
        var toC = function (F) {
            return ((5 / 9) * (F - 32));
        }
        var toC = function (F) {
            return ((5 / 9) * (F - 32));
        }

        var importRecipes = function () {
         
		var saved=[{"name":"Heston Blumenthal","data":[[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[15,23,150],[15,150,23],[150,23,23]],"Temp":23},
	{"name":"4 minutes a side","data":[[240,150,23],[240,23,150],[150,23,23]],"Temp":23},
	{"name":"America's Test Kitchen","data":[[15,230,23],[15,23,230],[150,110,110],[900,23,23]],"Temp":23},
				 {"name":"Nathan Myhrvold","data":[[3600,53,53],[30,-200,-200],[120,200,200]],"Temp":23}];
		for (var i=0;i<4;i++){
				var name=saved[i]["name"];
				var data=saved[i]["data"];




			var steaktemp=saved[i]["Temp"];
			var steak = [data[0][1]];
            for (var m = 0; m < 30; m++) {
                steak.push(toC(steaktemp))
            }
            steak.push(data[0][2]);
            var myheatsolver = HeatSolver(steak);
            var Thedata = myheatsolver.sixty_graph_arrays_duration(data);
            var maxTemps = Thedata.maxTemps;
            var meatType = "Steak";
            var recipe = [meatType, maxTemps, data, steaktemp,3,'C'];
            addRecipe(name, recipe);
			}
		}

        var changeThickness = function (newVal) {

            currentInfo["thickness"] = newVal;

        }

        var browserInfo = function (M) {
            currentInfo["browser"] = M;
        }

        var updateTotalTime = function (secs) {
            currentInfo["totalTime"] = secs;
        }

        var checkDiv = function () {
            currentInfo["OKToGraph"] = true;
            $(".alert").remove();
            for (var h = 0; h < currentInfo["numRows"]; h++) {

                if (parseFloat($("#inp1_" + h).val()) < 0) {
                    var side1Alert = $("<div class='alert alert-danger' id='row" + h + "side1alert'>Too low!</div>");
                    $("#row" + h + "side1").append(side1Alert);
                    currentInfo["OKToGraph"] = false;
                }
                if (parseFloat($("#inp2_" + h).val()) < 0) {
                    var side2Alert = $("<div class='alert alert-danger' id='row" + h + "side2alert'>Too low!</div>");
                    $("#row" + h + "side2").append(side2Alert);
                    currentInfo["OKToGraph"] = false;
                }
                if (parseFloat($("#row" + h + "time").val()) < 0) {
                    var timeAlert = $("<div class='alert alert-danger' id='row" + h + "timeAlert'>Negative time</div>");
                    $("#duration" + h).append(timeAlert);
                    currentInfo["OKToGraph"] = false;
                }
            }
        }

        var addTime = function (value) {
            currentInfo['time'] += value;
        }

        var changeTime = function (value) {
            currentInfo['time'] = value;
        }

        var addRecipe = function (name, recipe) {
            currentInfo['recipe'][name] = recipe;
        }



        //CHANGES X SECONDS INTO Y:X WHERE Y IS MINUTES X IS SECONDS
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

        var numRowsPlus = function () {
            currentInfo["numRows"]++;
        }

        var numRowsMinus = function () {
            currentInfo["numRows"]--;
        }

		var numRowsChange=function(num){
			currentInfo["numRows"]=num;
		}

        var changeMeatTemp = function (newVal) {
            currentInfo["meatTemp"] = newVal;
        }

        //OK THIS WORKS NOW
        var dataClear = function () {
            currentInfo["data"] = [];
        }

        //THIS ADDS AN ELEMENT TO THE DATA ARRAY
        var dataAdd = function (item) {

            currentInfo["data"].push(item);
        }

        //THIS IS FOR CHANGING THE ENTIRE DATA ARRAY
        var dataChange = function (array) {
            currentInfo["data"] = array;

        }

        var saveRecipe = function (name) {

            var steak = [currentInfo["data"][0][1]];
            for (var m = 0; m < parseFloat($("#thicknessInp").val()) * 10; m++) {

                if ($('.mytog2:checked').attr('id') == 'C') {
                    steak.push(parseFloat($("#steakTemp").val()))
                } else {
                    steak.push(toC(parseFloat($("#steakTemp").val())))
                }
            

                steak.push(parseFloat($("#steakTemp").val()))

				}
				 steak.push(currentInfo["data"][0][2]);
            
            var myheatsolver = HeatSolver(steak);
            var Thedata = myheatsolver.sixty_graph_arrays_duration(currentInfo["data"]);
            var maxTemps = Thedata.maxTemps;
            var meatType = $("input[type='radio'][name='meat']:checked").attr('id');
            var recipe = [meatType, maxTemps, currentInfo["data"], currentInfo["meatTemp"], currentInfo['thickness'], $('.mytog2:checked').attr('id')];
            addRecipe(name, recipe);

        }



        var buildData = function () {
            var newData = [];
            //THIS IS BEFORE THE NEXT BUTTON IS ADDED, SO NUMROWS IS ACTUALLY ONE LESS THAN IT DISPLAYS

            for (var g = 0; g < currentInfo["numRows"]; g++) {

                var side1data = parseFloat($("#inp1_" + g).val());
                var side2data = parseFloat($("#inp2_" + g).val());
                var timedata = $("#row" + g + "time").val() || 1000;


                if (timedata == 1000) {
                    var timeMin = 4;
                    return 4;
                } else if (timedata.length > 2) {
                    var timeMin = function (time) {

                        var timeString = '';
                        for (var x = 0; x < time.length; x++) {
                            if (time.charAt(x) == ':') {
                                break;
                            } else {
                                timeString += time.charAt(x);
                            }
                        }
                        return parseInt(timeString)
                    }
                } else {
                    var timeMin = function (time) {
                        return 0;
                    }
                }
                var timeSec = parseInt(timedata.charAt(timedata.length - 2) + timedata.charAt(timedata.length - 1));
                var timeForGraph = 60 * timeMin(timedata) + timeSec;
                newData.push([timeForGraph, side1data, side2data]);

            }

            dataChange(newData);

        }

        var parseRecipe = function (recipeStr) {


            recipeStr = recipeStr.replace(/\n/g, ' ');

            var pattTemp = /\d+/g;
            var pattCelsius = /\°(.+)$/g;
            var meatType;
            if (recipeStr.indexOf("Steak") > -1) {
                meatType = "Steak"
            }
            if (recipeStr.indexOf("Tuna") > -1) {
                meatType = "Tuna"
            }
            if (recipeStr.indexOf("Turkey") > -1) {
                meatType = "Turkey"
            }

            var pattTemp = /\d+/g;

            var numArray = recipeStr.match(pattTemp);
            for (var i = 0; i < numArray.length; i++) {
                numArray[i] = parseInt(numArray[i]);
            }

            //check if it's in celsius (celsius = true) or fahrenheit (celsius = false)
            var celsius = "C";
            if (recipeStr.match(pattCelsius)[0].charAt(1) == "F") {
                celsius = "F";
            }

            var parsedThickness = numArray.shift();

            var startingTemp = numArray.shift();

            var parsedData = [];
            var newRow;
            for (var i = 0; i < numArray.length; i += 3) {
                newRow = [];
                newRow.push(numArray[i], numArray[i + 1], numArray[i + 2]);

                parsedData.push(newRow);
            }

            var steak = [];
            for (var i = 0; i < parsedThickness * 10; i++) {
                if (celsius == 'C') {
                    steak.push(startingTemp)
                } else {
                    steak.push(toC(startingTemp))
                }
            }
            d3.selectAll(".mysteak").remove();
            d3.selectAll(".containers").remove();
            calculate(parsedData, steak, meatType, false, currentInfo["totalTime"], celsius);

            currentInfo["thickness"] = parsedThickness;

            currentInfo["meatTemp"] = startingTemp;
            currentInfo["data"] = parsedData;

        }

        return {
            currentInfo: currentInfo,
            changeThickness: changeThickness,
            timeStep: timeStep,
            dataAdd: dataAdd,
            dataClear: dataClear,
            dataChange: dataChange,
            changeMeatTemp: changeMeatTemp,
            buildData: buildData,
            numRowsPlus: numRowsPlus,
            numRowsMinus: numRowsMinus,
			numRowsChange: numRowsChange,
            convertTime: convertTime,
            changeTime: changeTime,
            addTime: addTime,
            buildData: buildData,
            checkDiv: checkDiv,
            saveRecipe: saveRecipe,
            addRecipe: addRecipe,
            browserInfo: browserInfo,
            updateTotalTime: updateTotalTime,
            parseRecipe: parseRecipe,
            importRecipes: importRecipes
        }
    }




    function View(div, model) {

        navigator.sayswho = (function () {
            var N = navigator.appName,
                ua = navigator.userAgent,
                tem;
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
            M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];


            if (M[0] == "MSIE") {
                $('input[type=text]').each(function () {
                    $(this).css(
                        "height", "100px !important"
                    )
                })
            }
            model.browserInfo(M);
        })();

        model.importRecipes();
        var clicked = false;
        var displayDiv = $("<div class='displayDiv'><h4>Input Recipe</h4></div>");
        var tableTabs = $('<ul class="nav nav-tabs"><li><a href="#table" data-toggle="tab" class="mytab">As table</a></li><li><a href="#text" data-toggle="tab"class="mytab">As text</a></li></ul>');

        var tabContent = $("<div class='tab-content'></div>");
        var tabPaneActive = $("<div class='tab-pane active' id='table'></div>");
        var thickInpDiv = $("<span id='thickInpDiv'>Thickness: <input type='text' id='thicknessInp' value='3'> cm </span>'");
		var tempInp=$("<div><span id='tempInpDiv'>   Initial Temperature: <input type='text' id='steakTemp' value='23'><span id='work'>&#176;C</span></span></div>");
        var meatInp = $("<span><form id='meatInp'><b>Meat: </b><input type='radio' name='meat' id='Steak' checked>Steak<input type='radio' name='meat' id='Tuna'>Tuna <input type='radio' name='meat' id='Turkey'>Turkey </form></span>");
        var switcheroo = $('<span class="switcheroo"></span>');
        var mytog2 = $("<input type='radio' class='mytog2' id='C' name='toggle2' checked><label for='C' class='btn'>C</label><input type='radio' class='mytog' id='F' name='toggle2'><label for='F' class='btn'>F</label>");
		var inputTableContainer=$("<div class='inputTableContainer'></div>");
        var inputTable = $("<table class='inputTable table table-striped'></table>");
		inputTableContainer.append(inputTable)
        var tabPane = $("<div class='tab-pane' id='text'></div>")
        var inpTabHeader = $("<table class='header table table-striped'><tr><th class='inpTabHeader'>Duration (mm:ss)</th><th class='inpTabHeader'>Side 1 (&#176;C)</th><th class='inpTabHeader'>Side 2 (&#176;C)</th></tr></table>");
        var containerm = $("<div class='containerm'><textarea id='recipeInput' cols=40 rows=5></textarea></div>");
        inputTableContainer.append(inputTable);
        switcheroo.append(mytog2);
        tabPaneActive.append( meatInp,thickInpDiv,tempInp,inpTabHeader,inputTableContainer);
        tabPane.append(containerm);
        tabContent.append(tabPaneActive, tabPane);


        displayDiv.append(tableTabs, tabContent);
        tabContent.change(function () {

            $('#si1').html("Side 1 (&#176;" + $('.mytog2:checked').attr('id') + ")");
            $('#si2').html("Side 2 (&#176;" + $('.mytog2:checked').attr('id') + ")");
            $('#work').html("&#176;" + $('.mytog2:checked').attr('id'));
            //graph(false, $('.mytog:checked').attr('id'));
        });
        var addButton;

        var flipButton;
        var cookButton;
		var cookButt=$('<button class="btn" id="Cook"><input type="image" id="myimage" style="height:20px;width:20px;"" src="flame.png"><span>Cook</span><input type="image" id="myimage" style="height:20px;width:20px;" src="flame.png"></button>');
        //var cookButt = $("<button class='btn' id='Cook'>"+flame+"Cook"+flame+"</button>");
        cookButt.css("width", '100%');

        /*
            updateTime goes through the table and updates the total cooking time entered. It also checks for any entries that are in seconds and calls to change them into the format mm:ss
        */
        var updateTime = function () {
            var time = 0;
            for (var i = 0; i < model.currentInfo["numRows"]; i++) {
                //THIS WILL BE TRIGGERED IF THE TIME NEEDS TO BE CONVERTED
                if (String($("#row" + i + "time").val()).indexOf(':') == -1) {
                    time += parseFloat($("#row" + i + "time").val());
                    $("#row" + i + "time").val(model.convertTime(parseFloat($("#row" + i + "time").val())));
                } else {
                    var colon = String($("#row" + i + "time").val()).indexOf(':');
                    var min = String($("#row" + i + "time").val()).substring(0, colon);
                    var sec = String($("#row" + i + "time").val()).substring(colon + 1);
                    time += 60 * min
                    time += sec;
                }
            }
            model.updateTotalTime(time);
        }

        /*
            addDropdown configures the two dropdowns associated with comparing different meats. It accounts for selecting a previous meat and calling a function to draw that meat in the appropriate window
        */
        var addDropdown = function () {
            $(".dropdown").remove();

            var dropdownDiv = $("<div class='dropdown'><div><h4>Compare Two Recipes</h4></div></div>");
            var dropdown1 = $('<select class="steakHist" id ="d1"></select>');
            var dropdown2 = $('<select class="steakHist"id ="d2"></select>');

            var dropdown3 = $('<select class="steakHist dropdown" id="d3" name="dropdown3"></select><br class="dropdown">')
            dropdown3.append('<option></option>');

            for (var key in model.currentInfo['recipe']) {
                dropdown1.append($('<option>' + key + '</option>'));
                dropdown2.append($('<option>' + key + '</option>'));
                dropdown3.append($('<option>' + key + '</option>'));
            }

     dropdownDiv.change(function () {

                var e1 = document.getElementById("d1");
                var name1 = e1.options[e1.selectedIndex].text;
                var e2 = document.getElementById("d2");
                var name2 = e2.options[e2.selectedIndex].text;
                var info = model.currentInfo['recipe'][name1];
				console.log(info);
                d3.selectAll('.finalsteak').remove();

                drawFinished(info[0], info[1], info[2], info[3], 0,info[4],$('.mytog2:checked').attr('id'));
                var inf = model.currentInfo['recipe'][name2];

                drawFinished(inf[0], inf[1], inf[2], inf[3], 1, inf[4], inf[5]);
            });
			
			//NOW THIS DELETES EVERY ROW AND ADDS THEIR OWN LITTLE ROWS
            dropdown3.change(function () {
				var e3=document.getElementById("d3");
				var name3=e3.options[e3.selectedIndex].text;
				model.dataChange(model.currentInfo['recipe'][name3][2]);
				var newNum=model.currentInfo['data'].length;
				//REMOVING ALL THE ROWS THAT CURRENTLY EXIST
				for (var i =0; i<model.currentInfo['numRows']; i++){
					console.log("current i ", model.currentInfo['numRows']);
					console.log("this is the number of rows" + model.currentInfo['numRows'])
					$("#row"+i).remove();	
				}
				model.numRowsChange(0);

				//NOW ADDING THEM ALL AGAIN
				for (var j=0; j<newNum; j++){
					addRow(j, inputTable);
				}
				addAddButton();
            })

            dropdownDiv.append(dropdown1, dropdown2);
            tabPaneActive.prepend(dropdown3);
            $(".span12").prepend(dropdownDiv);
        }

        /*
            buildDisplay places the necessary items on the screen for the user to interact with.
        */
        var buildDisplay = function () {
            if (model.currentInfo["OKToGraph"]) {
                div.append("<div class='row'><div class='container optionBar'></div></div><div class='span3'></div><div class='span9'></div><div class='span12'></div></div>");
                var switches = $('<div class="switch"><input type="radio" class="mytog" id="PS" name="toggle" checked><label for="PS" class="btn" >Protein State</label><input type="radio" class="mytog"id="T" name="toggle"><label for="T" class="btn" >Temperature</label></div>');
                div.append(switches,switcheroo);
                switches.change(function () {

                    graph(false, $('.mytog:checked').attr('id'));
                });

                $(".span3").append(displayDiv);

                $("#startModal").modal("show");

                cookButton = $(".cookButton");

                buildTable();
            } else {
                (".")
            }


            addDropdown();
        }
		
        var toF = function (C) {
            return (C * (9 / 5) + 32 + "&#176;F");
        }
        var toC = function (F) {
            return ((5 / 9) * (F - 32));
        }

//I'M NOT CONVINCED WE NEED THIS FUNCTION AT ALL. WE REALLY SHOULD JUST BE USING ADDROW I THINK --KATE
        var buildTable = function (inpTable) {

            var timeStep = model.timeStep;
            var len = model.currentInfo["data"].length || 1000;
            var newData = []
            var sumtime = 0;
            for (var i = 0; i < model.currentInfo["numRows"]; i++) {
                var iminus = i - 1;

                flipButton = $("<button class='btn btn-mini' id='flipButton" + i + "'><font size=4px>&harr;</font></button>");

                var row = $("<tr id='row" + i + "'></tr>");

                if (i > 0) {
                    var vals = parseFloat($("#row" + (i - 1) + "time").val());
                }

                var duration = $("<td id='duration" + i + "'><input id='row" + i + "time' type='text' value="+model.convertTime(240)+"></input></td>");
                var inp1 = $("<input type='text' id='inp1_" + i + "'>");
                var inp2 = $("<span id='inp2row" + i + "span'><input type='text' id='inp2_" + i + "'></span>");
                var closeButton = $("<button type='button' class='close closeRow' id='row" + i + "button'>&times;</button>");
                inp2.append(closeButton);
                var step1Col = $("<td id='row" + i + "side1'></input>");
                step1Col.append(inp1);
                var step2Col = $("<td id='row" + i + "side2' class='row" + i + "'></td>");
                step2Col.append(inp2);
                step1Col.append(flipButton);

                closeButton.on("click", function () {
                    var rowNum = String($(this).attr("id").charAt(3))
                    //NOW WE'RE REMOVING THE ROW WITH THE X NEXT TO IT
                    $("#row" + rowNum).remove();
                    //REDUCING THE NUMBER OF EXPECTED ROWS
                    model.numRowsMinus();
                    console.log("closed" + model.currentInfo["numRows"]);
                    //NOW WE NEED TO CHANGE THE ROW NUMBER OF ALL THE OTHER ROWS
                    for (var l = parseInt(rowNum) + 1; l < model.currentInfo["numRows"] + 1; l++) {
                        console.log("we're in the closeRow loop " + l);
                        console.log($("#row" + l).attr("id") + "id");
                        console.log(String("row" + parseInt(l - 1)))
                        $("#row" + l).attr("id", String("row" + parseInt(l - 1)));
                        $("#row" + l + "time").attr("id", String("row" + parseInt(l - 1) + "time"))
                        $("#row" + l + "button").attr("id", String("row" + parseInt(l - 1) + "button"))
                        $("#duration" + l).attr("id", String("duration" + parseInt(l - 1)));
                        $("#row" + l + "side1").attr("id", String("row" + parseInt(l - 1) + "side1"));
                        $("inp1_" + l).attr("id", String("inp1_" + parseInt(l - 1)));
                        $("#row" + l + "side2").attr("id", String("row" + parseInt(l - 1) + "side2"));
                        $("#inp2_" + l).attr("id", String("inp2_" + parseInt(l - 1)));
                    }

                });

                row.append(duration, step1Col, step2Col);
                inputTable.append(row);
                if (i == model.currentInfo["numRows"] - 1) {
                    saveBut = $('<a href="#saveBut" role="button" class="btn sBut" data-toggle="modal">Save</a>');
                    var saveModal = $('<div id="saveBut" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-body">Please select a name for your recipe</div></div>');
                    var nameInp = $('<input type="text" id=recipeName width="150px"></input>');
                    var okModal = $('<button class="btn" data-dismiss="modal" aria-hidden="true" id="okModal">OK</button>');
                   
                  cookButt.on("click", function () {
                        if ($("#recipeInput").closest(".tab-pane").hasClass("active")) {
                            var recipeString = $("#recipeInput").val();
                            model.parseRecipe(recipeString);
							
                        } else {
                            model.checkDiv();
                            updateTime();
                            model.buildData();


                            if (clicked && model.currentInfo["OKToGraph"]) {
                                graph(false, $('.mytog:checked').attr('id'))
                            } else {
                                d3.selectAll(".containers").remove();
                                d3.selectAll(".mysteak").remove();
                                model.dataClear();
                            }
                        }
                    })
              

                    $(".span3").append(cookButt);
                    addDropdown();
                }
                
                var time = $("#row" + i + "time").val().replace(':', '.').split('.');
                if (time.length > 1) {
                    var sumtime = parseFloat(time[1]);

                    sumtime += parseFloat(60 * time[0]);
                } else {
                    var sumtime = parseFloat(time[0]);
                }

               

                if (len == 0 || len == 1000) {

                    inp1.val(180);
                    inp2.val(180);


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
			addAddButton();
            CookButtonFun();
            closeRowFun();
        };

		
		
		//THIS FUNCTION JUST HAS A BARREL OF ISSUES
        var addRow = function (i, table) {
            var row = $("<tr id='row" + i + "'></tr>");

            var durationi = $("<td id='duration" + i + "'></td>");
            var rowitime = $("<input id='row" + i + "time' type=text></input>");
            durationi.append(rowitime);

            var rowiside1 = $("<td id='row" + i + "side1'></td>");
            var inp1_i = $("<input id='inp1_" + i + "' type=text></input>");
            var flipButtoni = $("<button class='btn btn-mini' id='flipButton" + i + "'><font size=4px>&harr;</font></button>");
            rowiside1.append(inp1_i, flipButtoni);

            var rowiside2 = $("<td id='row" + i + "side2' class='row" + i + "'></td>");
            var inp2_i = $("<input id='inp2_" + i + "' type='text'></input>");
            var rowibutton = $("<button type='button' id=row" + i + "button' class='close closeRow'>&times;</button>")
            rowiside2.append(inp2_i, rowibutton);

            rowibutton.on("click", function () {
				$(".addButton").remove();
                var rowNum = String($(this).attr("id").charAt(3))
                //NOW WE'RE REMOVING THE ROW WITH THE X NEXT TO IT
                row.remove();
                //REDUCING THE NUMBER OF EXPECTED ROWS
                model.numRowsMinus();
                console.log("closed" + model.currentInfo["numRows"]);
                //NOW WE NEED TO CHANGE THE ROW NUMBER OF ALL THE OTHER ROWS
                for (var l = i + 1; l < model.currentInfo["numRows"] + 1; l++) {
                    console.log("we're in the closeRow loop " + l);
                    console.log($("#row" + l).attr("id") + "id");
                    console.log(String("row" + parseInt(l - 1)))
                    $("#row" + l).attr("id", String("row" + parseInt(l - 1)));
                    $("#row" + l + "time").attr("id", String("row" + parseInt(l - 1) + "time"))
                    $("#row" + l + "button").attr("id", String("row" + parseInt(l - 1) + "button"))
                    $("#duration" + l).attr("id", String("duration" + parseInt(l - 1)));
                    $("#row" + l + "side1").attr("id", String("row" + parseInt(l - 1) + "side1"));
                    $("inp1_" + l).attr("id", String("inp1_" + parseInt(l - 1)));
                    $("#row" + l + "side2").attr("id", String("row" + parseInt(l - 1) + "side2"));
                    $("#inp2_" + l).attr("id", String("inp2_" + parseInt(l - 1)));
                }
				addAddButton();
            })

            row.append(durationi, rowiside1, rowiside2)
            table.append(row);
            if (i < model.currentInfo['data'].length) {
				console.log(model.currentInfo['data'])
                rowitime.val(model.convertTime(model.currentInfo['data'][i][0]));
                inp1_i.val(model.currentInfo['data'][i][1]);
                inp2_i.val(model.currentInfo['data'][i][2])
            } else {

                rowitime.val("4:00");
                inp1_i.val($(String("#inp1_" + parseInt(i - 1))).val() || 23);
                inp2_i.val($(String("#inp2_" + parseInt(i - 1))).val() || 180);
            }
			
			model.numRowsPlus();
        }

		var addAddButton=function(){
			$('.addButton').remove();
			var addButton = $("<button class='btn btnBar addButton' id='addButton" + model.currentInfo['numRows'] + "'>+</button>");
            addButton.on("click", function () {
                addButton.remove();
                model.buildData();
                model.numRowsPlus();
                console.log("just added a row" + model.currentInfo['numRows']);
                addRow($(".inputTable"));
            });

            inputTable.append(addButton);
		}
		
        var addButtonFun = function () {
            addButton.on("click", function () {
                addButton.remove();
                model.buildData();
                model.numRowsPlus();
                addRow(model.currentInfo['numRows']-1, $(".inputTable"));
				addAddButton();
                $('#table').stop().animate({
                    scrollTop: $("#table")[0].scrollHeight
                }, 8000);


            });
        };


        var closeRowFun = function () {
            $(".closeRow").on("click", function () {
                var rowNum = String($(this).attr("id").charAt(3))
                $("#row" + rowNum).remove();
                model.numRowsMinus();

                //NOW WE NEED TO CHANGE THE ROW NUMBER OF ALL THE OTHER ROWS
                for (var l = rowNum + 1; l < model.currentInfo["numRows"]; l++) {
                    $("#row" + l).attr("id", "row" + l - 1);
                    $("#duration" + l).attr("id", "duration" + l - 1);
                    $("#row" + l + "side1").attr("id", "row" + l - 1 + "side1");
                    $("inp1_" + l).attr("id", "inp1_" + l - 1);
                    $("#row" + l + "side2").attr("id", "row" + l - 1 + "side2");
                    $("#inp2_" + l).attr("id", "inp2_" + l - 1);
                }

            });
        }



		var loadRecipe=function(recipe){

		}


        var graph = function (isFirst, falseColor) {

            d3.selectAll(".mysteak").remove();
            d3.selectAll(".containers").remove();
            model.dataClear();

            for (var e = 0; e < model.currentInfo["numRows"]; e++) {
                var curTime = $("#row" + e + "time").val();
                var cur1 = parseFloat($("#inp1_" + e).val());
                var cur2 = parseFloat($("#inp2_" + e).val());

                var time = curTime.replace(':', '.').split('.');
                if (time.length > 1) {
                    var sumtime = parseFloat(time[1]);

                    sumtime += parseFloat(60 * time[0]);
                } else {
                    var sumtime = parseFloat(time[0]);
                }


                model.dataAdd([sumtime, cur1, cur2]);
            }
            var OKtoCook = true; //IF WE HAVE INVALID INPUTS, IT WILL BE CHANGED TO FALSE

            //THIS BIT IS CHECKING WHETHER THE THICKNESS AND INITIAL TEMP INPUTS ARE VALID
            $("#tempAlert").remove();
            $("#thickAlert").remove();
            var tempAlert = $("<div class='alert' id='tempAlert'>Temperature is not a valid number</div>");
            var thicknessAlert = $("<div class='alert' id='thickAlert'>Thickness is not a valid number</div>");
            if (String(parseInt($("#steakTemp").val())) == 'NaN') {
                $("#tempInpDiv").append(tempAlert);
                OKtoCook = false;
            } else if (parseInt($("#steakTemp").val()) < -223 || parseInt($("#steakTemp").val()) > 300) {
                $("#tempInpDiv").append(tempAlert);
                OKtoCook = false;
            } else {
                model.changeMeatTemp(parseFloat($("#steakTemp").val()))
            };

            if (String(parseInt($("#thicknessInp").val())) == 'NaN') {
                $("#thickInpDiv").append(thicknessAlert);
                OKtoCook = false;
            } else if (parseFloat($("#thicknessInp").val()) < 0.5 || parseFloat($("thicknessInp").val()) > 35) {
                $("#thickInpDiv").append(thicknessAlert);
                OKtoCook = false;
            } else {
                model.changeThickness(parseFloat($("#thicknessInp").val()))
            };

            //add to on click and calculate(blah,blah,blah, meatType)
            var meatType = $("input[type='radio'][name='meat']:checked").attr('id');


            if (falseColor == 'T') {

                meatType = 'False';
            }
            //THIS WILL COOK THE STEAK IF WE HAVE VALID INPUTS
            if (OKtoCook == true) {
                var steak = [model.currentInfo["data"][0][1]];
                for (var m = 0; m < parseFloat($("#thicknessInp").val()) * 10; m++) {
                    if ($('.mytog2:checked').attr('id') == 'C') {
                        steak.push(parseFloat($("#steakTemp").val()))
                    } else {
                        steak.push(toC(parseFloat($("#steakTemp").val())))
                    }
                }
                steak.push(model.currentInfo["data"][0][2]);

                calculate(model.currentInfo["data"], steak, meatType, isFirst, model.currentInfo["totalTime"], $('.mytog2:checked').attr('id'))
            }
        }
        var CookButtonFun = function () {
            $(".cookButton").on("click", function () {
                clicked = true;
                model.checkDiv();
                d3.selectAll(".mysteak").remove();
                d3.selectAll(".containers").remove();
                if (model.currentInfo["OKToGraph"]) {
                    d3.selectAll("svg").remove();
                    model.dataClear();
                    graph(true, '');
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
        //model.parseRecipe();



        view.buildDisplay();

        /* $('.inputTable').offset({
            top: 1030
        });*/




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