var perfectSteak = function (div) {


    function Model(div) {

        var currentInfo = {

            'meatTemp': 23, //initial temperature of the meat
            'meatType': "Steak",
            'thickness': 3, //thickness of the meat in centimeters
            'data': [
                [240, 150, 23],
                [240, 23, 150],
                [300, 23, 23]
            ], //timestamps of temperatures
            'numRows': 3, //how many steps there are in the recipe
            'time': 0, //time
            'OKToGraph': true, //flag for when data is ready to graph
            'recipe': {}, //recipes -- THIS HAS ALL SAVED RECIPES, INCLUDING THE ONES THAT WE SAVED
            'totalTime': 0, //total cooking
            'names': {
                'Steak': 0,
                'Tuna': 0,
                'Turkey': 0
            },
			'saved': [{
                "name": "4 minutes a side",
                "data": [[240, 150, 23],[240, 23, 150],[300, 23, 23]],
                "Temp": 23
            },  {
                "name": "Flip every 15 seconds (Heston Blumenthal)",
                "data": [[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150],[15, 150, 23],[15, 23, 150]],
                "Temp": 23
            }, {
                "name": "Sear then cook low (America's Test Kitchen)",
                "data": [[15, 230, 23],[15, 23, 230],[150, 110, 110],[900, 23, 23]],
                "Temp": 23
            }, {
                "name": "Sous Vide and Liquid Nitrogen (Nathan Myhrvold)",
                "data": [[3600, 53, 53],[30, -200, -200],[120, 200, 200]],
                "Temp": 23
            }]

        };

        var timeStep = 240;
        var toF = function (C) {
            return C * (9 / 5) + 32;
        }
        var toC = function (F) {
            return ((5 / 9) * (F - 32));
        }
		
		//this is called whenever the user creates a new recipe
		//it adds to the default list of recipes that is stuck on the dropdown of recipes ("#d3")
		var addSaved = function(name, data, temp){
			currentInfo['saved'].push({"name":name, "data":data, "Temp":temp})
		}
		
		//this is called whenever the user deletes a recipe
		//it just deletes from the default list of recipes
		var removeSaved = function(name){
			for (var i =0; i<currentInfo.saved.length; i++){
				console.log("this is the name" + name)
				if (currentInfo.saved[i]["name"]==name){
					console.log("splicing"+currentInfo.saved)
					currentInfo.saved.splice(i, 1);
					console.log(currentInfo.saved)
				}
			}
		}

        var importRecipes = function () {
			var saved = currentInfo.saved;
            for (var i = 0; i < saved.length; i++) {
                var name = saved[i]["name"];
                var data = saved[i]["data"];

                var steaktemp = saved[i]["Temp"];
                var steak = [data[0][1]];
                for (var m = 0; m < 30; m++) {
                    steak.push(steaktemp)
                }
                steak.push(data[0][2]);
                var myheatsolver = HeatSolver(steak);
                var Thedata = myheatsolver.sixty_graph_arrays_duration(data);
                var maxTemps = Thedata.maxTemps;
                var meatType = "Steak";
                var recipe = [meatType, maxTemps, data, steaktemp, 3, 'C'];
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

        var numRowsChange = function (num) {
            currentInfo["numRows"] = num;
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

        var changeRecipeName = function (oldName, newName) {
            if (newName != oldName) {
                currentInfo["recipe"][newName] = currentInfo["recipe"][oldName];
                delete currentInfo["recipe"][oldName];
            }
        }
		
		var deleteRecipe = function(oldName){
			delete currentInfo["recipe"][oldName];
		}

        var saveRecipe = function (name) {
			importRecipes();
            var steak = [currentInfo["data"][0][1]];
            var thickness = parseFloat($("#thicknessInp").val());
            for (var m = 0; m < thickness * 5; m++) {

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
            var meatdrop = document.getElementById("dMeat");
            var meatType = meatdrop.options[meatdrop.selectedIndex].text;
            currentInfo["meatType"] = meatType;
            var recipe = [meatType, maxTemps, currentInfo["data"], currentInfo["meatTemp"], thickness, $('.mytog2:checked').attr('id')];
            var isDuplicate = false;
			
            for (var i in currentInfo["recipe"]) {
                if (currentInfo['recipe'][i][0] == meatType && currentInfo['recipe'][i][4] == thickness && currentInfo['recipe'][i][2].toString() == currentInfo["data"].toString() && currentInfo['recipe'][i][3] == currentInfo["meatTemp"]) {

                    //already exists
                    isDuplicate = true;
                    break;
                }
				
            }
		
            if (isDuplicate) {
                return 0;
            } else {
                addRecipe(name, recipe);
                return 1;
            }

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

        // returns a human-readable string containing a temperature
        // temperature: temperature value in Celsius
        // mode: "C" if the result should be in Celsius, "F" if it should be in Fahrenheit
        // returns e.g. "5°C"
        var printTemperature = function (temperature, mode) {
            var value = temperature;
            if (mode == "F") {
                value = toF(value);
            }
            return value.toFixed(0) + "\xB0" + mode;
        }

        // returns a temperature value in Celsius, given the value as a string and a mode which is either "C" or "F". 
        var parseTemperature = function (temperatureStr, mode) {
            var value = parseInt(temperatureStr);
            if (mode == "F") {
                value = toC(value);
            }
            return value;
        }


        // Returns the recipe in currentInfo as a human-readable string, for display in the "as text" tab and
        // for the user to copy-and-paste and share with other people.
        // mode is "F" for Fahrenheit/inches, and "C" for Celsius/cm.
        // The format of the string is this (separated by newlines:
        //      <thickness> <meat> starts at <starting-temp>
        //      <side1-temp> and <side2-temp> for <time>
        //      ...
        //      <side1-temp> and <side2-temp> for <time>
        // where
        //     <thickness> ::= <number> [cm|in]
        //     <meat> ::= Steak | Tuna | Turkey | ...
        //     <temp> ::= <number> °[C|F]
        var printRecipe = function (mode) {
            var recipe = []; // make a list of lines that we'll then join into a string
            recipe.push(currentInfo["thickness"] + "cm " + currentInfo["meatType"] + " starts at " + printTemperature(currentInfo["meatTemp"], mode));
            var data = currentInfo["data"];
            for (var i = 0; i < data.length; i++) {
                var step = data[i];
                recipe.push(printTemperature(step[1], mode) + " and " + printTemperature(step[2], mode) + " for " + convertTime(step[0]));
            }
            return recipe.join("\n");
        }

        // capitalizes first character of s and lowercases the rest
        var toTitleCase = function (s) {
            return s[0].toUpperCase() + s.substring(1).toLowerCase();
        }

        // Parses the human-readable string returned by printRecipe() and stores the recipe in currentInfo.
        // Needs to be very tolerant of whitespace, alphabetic case changes, and extra words entered into the recipe, since
        // the user may edit the string before parseRecipe() gets to it.
        var parseRecipe = function (recipeStr) {
            var lines = recipeStr.split(/[\r\n]/);

            var data = [];
            var meatType;
            if (recipeStr.indexOf("Steak") > -1) {
                var meatType = "Steak";
            }
            if (recipeStr.indexOf("Tuna") > -1) {
                var meatType = "Tuna";
            }
            if (recipeStr.indexOf("Turkey") > -1) {
                var meatType = "Turkey";
            }

            currentInfo["meatType"] = meatType;
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];

                // try to parse starting conditions
                var m = line.match(/(\d+)\s*(in|cm).*?(steak|tuna|turkey).*?(-?\d+)\xB0\s*([CF])/i);
                if (m) {
                    currentInfo["thickness"] = parseInt(m[1]); // TODO: handle inches
                    currentInfo["meatTemp"] = parseTemperature(m[4], m[5]);
                    meatType = toTitleCase(m[4]); // so that "steak" becomes "Steak"
                    continue; // don't parse the line as a step
                }

                // otherwise try to parse a recipe step
                var m = line.match(/(-?\d+)\xB0\s*([CF]).*?(-?\d+)\xB0\s*([CF]).*?((\d+)+:)?(\d+)/i);
                if (m) {
                    var side1Temp = parseTemperature(m[1], m[2]);
                    var side2Temp = parseTemperature(m[3], m[4]);
                    var time = parseInt(m[7]); // seconds field
                    if (m[2]) time += 60 * parseInt(m[6]); // optional minutes field
                    data.push([time, side1Temp, side2Temp]);
                    continue;
                }


            }
            currentInfo["data"] = data;
            currentInfo["numRows"] = data.length;

            console.log(meatType);
            // TODO: need to update currentInfo["totalTime"]
        }

        return {
            currentInfo: currentInfo,
            changeThickness: changeThickness,
            timeStep: timeStep,
			addSaved: addSaved,
            dataAdd: dataAdd,
            dataClear: dataClear,
            dataChange: dataChange,
            buildData: buildData,
            changeMeatTemp: changeMeatTemp,
            numRowsPlus: numRowsPlus,
            numRowsMinus: numRowsMinus,
            numRowsChange: numRowsChange,
            convertTime: convertTime,
            changeTime: changeTime,
            addTime: addTime,
            saveRecipe: saveRecipe,
            addRecipe: addRecipe,
            browserInfo: browserInfo,
            updateTotalTime: updateTotalTime,
            printRecipe: printRecipe,
            parseRecipe: parseRecipe,
            importRecipes: importRecipes,
            changeRecipeName: changeRecipeName,
			deleteRecipe: deleteRecipe,
			removeSaved: removeSaved
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
        var displayDiv = $("<div class='displayDiv'></div>");
        var tableTabs = $('<ul class="nav nav-tabs"><li class="active"><a id="table-tab" href="#table" data-toggle="tab" class="mytab">as table</a></li><li><a id="text-tab" href="#text" data-toggle="tab" class="mytab">as text</a></li></ul>');
        var tabContent = $("<div class='tab-content'></div>");
        var tabPaneActive = $("<div class='tab-pane active' id='table'></div>");
        var meatInpDiv = $("<div id='meatInpDiv'><span>Meat type:</div>'");
        var thickInpDiv = $("<div id='thickInpDiv'><span>Thickness: </span><input type='text' id='thicknessInp' value='3'> cm </div>'");
        var tempInp = $("<div id='tempInpDiv'><span>Starting at:</span> <input type='text' id='steakTemp' value='23'><span id='work'>&#176;C</span></div>");
        var switcheroo = $('<span class="switcheroo"></span>');
        var mytog2 = $("<input type='radio' class='mytog2' id='C' name='toggle2' checked><label for='C' class='btn'>Celsius</label><input type='radio' class='mytog2' id='F' name='toggle2'><label for='F' class='btn'>Fahrenheit</label>");
        var inputTableContainer = $("<div class='inputTableContainer'></div>");
        var inputTable = $("<table class='inputTable table table-striped'></table>");
        inputTableContainer.append(inputTable)
        var tabPane = $("<div class='tab-pane' id='text'></div>")
        var inpTabHeader = $("<table class='inputTable table table-striped'><tr><td class='inpTabHeader' id= 'si1'>Side 1 </td><td class='inpTabHeader' id='si2'>Side 2</td><td class='inpTabHeader' id= 'dur'>min:sec</td></tr></table>");
        var containerm = $("<div class='containerm'><textarea id='recipeInput' cols=40 rows=5></textarea></div>");

        inputTableContainer.append(inputTable);
        switcheroo.append(mytog2);
        switcheroo.change(function () {
		
            $('#work').html("&#176;" + $('.mytog2:checked').attr('id'));
            $('.deg').html("&#176;" + $('.mytog2:checked').attr('id'));
            loadTextRecipeFromModel();
            loadTableFromModel();
            graph(false, $('.mytog:checked').attr('id'), false);
        });
        tabPaneActive.append(meatInpDiv, thickInpDiv, tempInp, inpTabHeader, inputTableContainer);
        // tabPaneActive.append( inpTabHeader);
        tabPane.append(containerm);
        tabContent.append(tabPaneActive, tabPane);

        $("#table-tab", tableTabs).on("click", function () {
            storeTextRecipeIntoModel();
        });

        $("#text-tab", tableTabs).on("click", function () {
            storeTableIntoModel();
        });

        displayDiv.append(tableTabs, tabContent);

        var addButton;

        var flipButton;
        var cookButton = $('<button class="btn" id="cookButton"><i class="icon-large icon-fire"></i> <span class="cook-text">Cook</span><i class="icon-large icon-fire"></i></button>');
//<input type="image" id="myimage" style="height:20px;width:20px;" src="flame.png">

        /*
            updateTime goes through the table and updates the total cooking time entered. It also checks for any entries that are in seconds and calls to change them into the format mm:ss
        */
        var updateTime = function () {
            var time = 0;
            for (var i = 0; i < model.currentInfo["numRows"]; i++) {
                //THIS WILL BE TRIGGERED IF THE TIME NEEDS TO BE CONVERTED

                if (String($("#row" + i + "time").val()).indexOf(':') == -1) {

                    time += isNaN(parseFloat($("#row" + i + "time").val())) ? 0 : parseFloat($("#row" + i + "time").val());
                    // $("#row" + i + "time").val(model.convertTime(parseFloat($("#row" + i + "time").val())));
                } else {
                    var colon = String($("#row" + i + "time").val()).indexOf(':');
                    var min = String($("#row" + i + "time").val()).substring(0, colon);
                    var sec = String($("#row" + i + "time").val()).substring(colon + 1);
                    time += 60 * parseFloat(min) + parseFloat(sec);
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
            var dropdown1 = $('<select class="steakHist" id ="d1"><option></option></select>');
            var dropdown2 = $('<select class="steakHist"id ="d2"><option></option></select>');
            var dropdownMeat = $('<select class="meatInp selectpicker steakHist" id="dMeat"><option name="Steak">Steak</option><option name="Tuna">Tuna</option><option name="Turkey">Turkey</option></select></ul>')

            var dropdown3 = $('<select class="steakHist dropdown" id="d3" name="dropdown3"></select><br class="dropdown">')
            dropdown3.append('<option></option>');

            for (var key in model.currentInfo['recipe']) {
                var rename = $('<span id="d1' + key + '">Rename</span>');
                var del = $('<button class="d1closer" id = "1' + key + '">&times;</button>');
                var rename1 = $('<span id="d1' + key + '">Rename</span>');
                var del1 = $('<button class="d1closer" id = "1' + key + '">&times;</button>');

                var option1 = $('<option>' + key + '</option>');
                var option2 = $('<option>' + key + '</option>');
                // option1.append(rename,del);
                //option2.append(rename1,del1);
                dropdown1.append(option1)

                del.on("click", function () {
                })
                dropdown2.append(option2);


                dropdown3.append($('<option>' + key + '</option>'));
            }

            dropdownDiv.change(function () {
						
                var e1 = document.getElementById("d1");
                var name1 = e1.options[e1.selectedIndex].text;
                var e2 = document.getElementById("d2");
                var name2 = e2.options[e2.selectedIndex].text;


                d3.selectAll('.finalsteak').remove();

                if (name1 != "") {
                    var info = model.currentInfo['recipe'][name1];
					temp= []
					for( i=0;i<info[1].length;i++){
						temp.push(info[1][i]);
			
					}
			
                    drawFinished(info[0], info[1], info[2], info[3], 0, info[4], $('.mytog2:checked').attr('id'));
				model.currentInfo['recipe'][name1][1]=temp	
                }
                if (name2 != "") {
                    var inf = model.currentInfo['recipe'][name2];
						temp= []
					for( i=0;i<inf[1].length;i++){
						temp.push(inf[1][i]);
			
					}
			
                    drawFinished(inf[0], inf[1], inf[2], inf[3], 1, inf[4], $('.mytog2:checked').attr('id'));
					model.currentInfo['recipe'][name1][1]=temp	
                }
		
            });

            //NOW THIS DELETES EVERY ROW AND ADDS THEIR OWN LITTLE ROWS
            dropdown3.change(function () {
                var e3 = document.getElementById("d3");
                var name3 = e3.options[e3.selectedIndex].text;
                model.dataChange(model.currentInfo['recipe'][name3][2]);
				console.log("I have just changed the dropdown" + model.currentInfo['data']);
                
                $("#renameInp").remove();
				$("#renameInpDeleteButton").remove();
                var renameInp = $("<input type='text' id='renameInp' value='"+name3+"'>");
				var renameInpDeleteButton = $("<button class= 'btn btn-small' id='renameInpDeleteButton'>Delete This Recipe</button>")
                renameInp.on("focusout", function () {
                    var newName = $('#renameInp').val();
                    var oldName = $("#d3").val();
                    model.changeRecipeName(oldName, newName);
                    dropdown3.empty();
                    for (var key in model.currentInfo['recipe']) {
                        dropdown3.append($('<option value="' + key + '">' + key + '</option>'));
                    }
                    $("#d3 > [value='" + newName + "']").attr("selected", "true");
                });
				
				renameInpDeleteButton.on("click", function(){
					console.log("current recipe name " + $("#d3").val());
					model.removeSaved($("#d3").val());
					dropdown3.empty();
					for (var key in model.currentInfo['recipe']){
						dropdown3.append($('<option value="' + key + '">' + key + '</option>'));
					}
				})
                
                var newNum = model.currentInfo['data'].length;
                //REMOVING ALL THE ROWS THAT CURRENTLY EXIST
                $('.recipe-step').remove();
                model.numRowsChange(newNum);

                //NOW ADDING THEM ALL AGAIN
                for (var j = 0; j < newNum; j++) {
                    addRow(j);
                }

                model.buildData();
                addAddButton();
                $("#graph-pane").prepend(renameInp, renameInpDeleteButton);
            })
            
            dropdownDiv.append(dropdown1, dropdown2);
            $("#meatInpDiv").append(dropdownMeat);
            $(".recipeHead").append(dropdown3);
            $(".span12").prepend(dropdownDiv);
            $("#d3 option").eq(1).prop("selected", "true");
        }

        /*
            buildDisplay places the necessary items on the screen for the user to interact with.
        */
        var buildDisplay = function () {
            switcheroo.addClass("pull-right");
            div.append("<div class='row'><div class='container optionBar'></div></div>");
			var recipePane=$("<div id='recipe-pane' class='span3'><h4 class='recipeHead'>Recipe:</h4><span></div>");
			var newRecipeButton = $("<button class = 'btn btn-small' id='newRecipeButton'>New</button></span>");
			//recipePane.append(newRecipeButton);
			
			newRecipeButton.on("click", function(){
				model.addRecipe("Create Your Own!", {
                "name": "Create Your Own!",
                "data": [[240, 150, 23],[240, 23, 150],[300, 23, 23]],
                "Temp": 23
				})
				model.addSaved("Create Your Own!", [[240, 150, 23],[240, 23, 150],[300, 23, 23]], 23);
				model.dataChange([[240, 150, 23],[240, 23, 150],[300, 23, 23]]);
				model.saveRecipe("Create Your Own!");
				console.log(model.currentInfo['data']+ "I have just changed the data");
				console.log(model.currentInfo['saved']+"these are my saved recipes");
				$('#renameInp').val("Create Your Own!");
				
				$("#d3").empty();
                for (var key in model.currentInfo['recipe']) {
                   $("#d3").append($('<option value="' + key + '">' + key + '</option>'));
                }
				$("#d3").val('Create Your Own!');
			})
			
			var graphPane=$("<div id='graph-pane' class='span9' style='visibility:hidden;'></div><div class='span12'></div></div>");
			div.append(recipePane, graphPane);
            var switches = $('<div class="switch"><input type="radio" class="mytog" id="PS" name="toggle" checked><label for="PS" class="btn" id ="state">Protein State</label><input type="radio" class="mytog"id="T" name="toggle"><label for="T" class="btn" id ="state">Temperature</label></div>');
            $('.navbar-inner').append(switcheroo);
            switches.change(function () {
                graph(false, $('.mytog:checked').attr('id'), false);
            });

            $("#recipe-pane").append(displayDiv);

            $("#graph-pane").append(switches);
            $("#startModal").modal("show");

            var cookButtonRow = $("<div style='width:150px; margin-left: auto; margin-right: auto;'></div>");
            cookButtonRow.append(cookButton);
            $("#recipe-pane").append(cookButtonRow);
            addDropdown();

            addAddButton();
            CookButtonFun();

            // lastly, load up the recipe that's predefined in the model
            loadTableFromModel();

        }

        var addRow = function (i) {
            var row = $("<tr class='row recipe-step' id='row" + i + "'></tr>");

            var labels = $("<span class = 'mlabel' id='label" + i + "' > " + (i + 1) + ".</span>");
            if (i < 9) {
                labels.css("margin-left", "8px");
            }
     

            var rowiside1 = $("<td id='row" + i + "side1'></td>");
            var inp1_i = $("<input id='inp1_" + i + "' type=text></input><span class='deg'>&#176" + $('.mytog2:checked').attr('id') + "</span>");
            rowiside1.append(labels, inp1_i);

            var flipButtoniCell = $("<td></td>");
            var flipButtoni = $("<button class='btn btn-mini flipButton' id='flipButton" + i + "'><font size=1px>&harr;</font></button>");
            flipButtoniCell.append(flipButtoni);

            var rowiside2 = $("<td id='row" + i + "side2' class='row" + i + "'></td>");
            var inp2_i = $("<input id='inp2_" + i + "' type='text'></input><span class='deg'>&#176" + $('.mytog2:checked').attr('id') + "</span>");
            rowiside2.append(inp2_i);

            var durationi = $("<td id='duration" + i + "'></td>");

            var rowitime = $("<input class = 'time' id='row" + i + "time' type=text></input>");
            
            durationi.append(rowitime);

            var rowibuttoncell = $("<td></td>")
            var rowibutton = $("<button type='button' id=row" + i + "button' class='close closeRow'>&times;</button>")
            rowibutton.on("click", function () {
                var rowNum = String($(this).attr("id").charAt(3))
                //NOW WE'RE REMOVING THE ROW WITH THE X NEXT TO IT
                row.remove();
                //REDUCING THE NUMBER OF EXPECTED ROWS
                model.numRowsMinus();
        
                //NOW WE NEED TO CHANGE THE ROW NUMBER OF ALL THE OTHER ROWS
                for (var l = i + 1; l < model.currentInfo["numRows"] + 1; l++) {

                    $("#row" + l).attr("id", String("row" + parseInt(l - 1)));
                    $("#row" + l + "time").attr("id", String("row" + parseInt(l - 1) + "time"))
                    $("#row" + l + "button").attr("id", String("row" + parseInt(l - 1) + "button"))
                    $("#duration" + l).attr("id", String("duration" + parseInt(l - 1)));
                    $("#row" + l + "side1").attr("id", String("row" + parseInt(l - 1) + "side1"));
                    $("inp1_" + l).attr("id", String("inp1_" + parseInt(l - 1)));
                    $("#row" + l + "side2").attr("id", String("row" + parseInt(l - 1) + "side2"));
                    $("#inp2_" + l).attr("id", String("inp2_" + parseInt(l - 1)));
                    $("#label" + (l)).attr("id", "label" + parseInt(l - 1))
                    $("#label" + (l - 1)).html(parseInt(l) + ".");
                }
                model.dataClear();
                model.buildData();
                updateTime();
                $('.tt').html(model.convertTime(model.currentInfo["totalTime"]));

            })
            rowibuttoncell.append(rowibutton);

            row.append(rowiside1, flipButtoniCell, rowiside2, durationi, rowibuttoncell);
            $("#lastrow").before(row);
            if (i < model.currentInfo['data'].length) {
                rowitime.val(model.convertTime(model.currentInfo['data'][i][0]));
                if ($('.mytog2:checked').attr('id') == 'F') {
                    inp1_i.val(toF(model.currentInfo['data'][i][1]));
                    inp2_i.val(toF(model.currentInfo['data'][i][2]))
                } else {
                    inp1_i.val(model.currentInfo['data'][i][1]);
                    inp2_i.val(model.currentInfo['data'][i][2])
                }
            } else {
                rowitime.val($("#row" + (i - 1) + "time").val() || "3:00");
                inp1_i.val($(String("#inp1_" + parseInt(i - 1))).val() || 23);
                inp2_i.val($(String("#inp2_" + parseInt(i - 1))).val() || 180);
            }
            flipButtonFun(i);
            //model.numRowsPlus();
        }

        var addAddButton = function () {
            $('#lastrow').remove();

            var row = $("<tr class ='row' id='lastrow'></tr>");
            var addrow = $("<td></td>");
            var addButton = $("<button class='btn btnBar addButton' id='addButton" + model.currentInfo['numRows'] + "'>+</button>");
            addButtonFun(addButton)

            var label = $('<td><span class ="tots">Total:</span></td>');
          
            updateTime();
            addrow.append(addButton);
            var info = $('<td><span class="tt">' + model.convertTime(model.currentInfo["totalTime"]) + '</span></td>');
            row.append(addrow, $("<td></td>"), label, info);
            inputTable.append(row);
        }

        var addButtonFun = function (addButton) {
            addButton.on("click", function () {
                storeTableIntoModel();
                model.numRowsPlus();
                addRow(model.currentInfo['numRows'] - 1);
                updateTime();
                $('.tt').html(model.convertTime(model.currentInfo["totalTime"]));
                $(".inputTableContainer").animate({
                    scrollTop: 1000
                }, 300);


            });
        };


        var checkTableForImpossibleValues = function () {
            model.currentInfo["OKToGraph"] = true;
            $(".alert").remove();

            for (var h = 0; h < model.currentInfo["numRows"]; h++) {


                if (parseFloat($("#inp1_" + h).val()) < -270) {
                    var side1Alert = $("<div class='alert alert-danger' id='row" + h + "side1alert'>Too low!</div>");
                    $("#row" + h + "side1").append(side1Alert);
                    model.currentInfo["OKToGraph"] = false;
                }
                if (parseFloat($("#inp2_" + h).val()) < -270) {
                    var side2Alert = $("<div class='alert alert-danger' id='row" + h + "side2alert'>Too low!</div>");
                    $("#row" + h + "side2").append(side2Alert);
                    model.currentInfo["OKToGraph"] = false;
                }
                if (convertToSeconds($("#row" + h + "time").val()) <= 0) {
                    var timeAlert = $("<div class='alert alert-danger' id='row" + h + "timeAlert'>Invalid time</div>");
                    $("#duration" + h).append(timeAlert);
                    model.currentInfo["OKToGraph"] = false;
                }
            }
        }

        //changes Y:Z into X seconds
        var convertToSeconds = function (minutesSeconds) {
            return parseFloat(minutesSeconds) * 60 + parseFloat(minutesSeconds.slice(-2));
        }

        var storeTableIntoModel = function () {
            var newData = [];
            //THIS IS BEFORE THE NEXT BUTTON IS ADDED, SO NUMROWS IS ACTUALLY ONE LESS THAN IT DISPLAYS

            var meatdrop = document.getElementById("dMeat");
            var meat = meatdrop.options[meatdrop.selectedIndex].text;
            model.currentInfo["meatType"] = meat;

            for (var g = 0; g < model.currentInfo["numRows"]; g++) {

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
                if ($('.mytog2:checked').attr('id') == 'C') {
                    newData.push([timeForGraph, side1data, side2data]);
                } else {
                    newData.push([timeForGraph, toC(side1data), toC(side2data)]);
                }

            }

            model.dataChange(newData);

            loadTextRecipeFromModel();
        };

        var loadTableFromModel = function () {

            // TODO: handle meat type
            $("#thicknessInp").val(model.currentInfo["thickness"]);
			//MARISSA WORKING HERE
			if($('.mytog2:checked').attr('id')=='F'){
			$("#steakTemp").val(toF(model.currentInfo["meatTemp"]));}
			else
			{$("#steakTemp").val(model.currentInfo["meatTemp"]);}

            $(".recipe-step").remove();
            for (var i = 0; i < model.currentInfo['data'].length; i++) {
                addRow(i)
            }
            updateTime();
            $('.tt').html(model.convertTime(model.currentInfo["totalTime"]));

            var meat = model.currentInfo["meatType"];

            var meatdrop = document.getElementById("dMeat");
            for (var i = 0; i < meatdrop.options.length; i++) {
                if (meatdrop.options[i].text == meat) {
                    $(meatdrop.options[i]).prop('selected', true);
                }
            }
        };


        var storeTextRecipeIntoModel = function () {
            model.parseRecipe($("#recipeInput").val());

            loadTableFromModel();
        }


        var loadTextRecipeFromModel = function () {
            var recipe = model.printRecipe($('.mytog2:checked').attr('id'));
            $("#recipeInput").val(recipe);
        }


        var graph = function (isFirst, falseColor, animated) {

            d3.selectAll(".mysteak").remove();
            d3.selectAll(".containers").remove();

            model.dataClear();

            for (var e = 0; e < model.currentInfo["numRows"]; e++) {

                var curTime = String($("#row" + e + "time").val());

                var cur1 = parseFloat($("#inp1_" + e).val());
                var cur2 = parseFloat($("#inp2_" + e).val());

                var time = curTime.replace(':', '.').split('.');
                if (time.length > 1) {
                    var sumtime = parseFloat(time[1]) + 60 * parseFloat(time[0]);
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
            } else if (($('.mytog2:checked').attr('id') == 'C') && (parseInt($("#steakTemp").val()) < -273) ||
                ($('.mytog2:checked').attr('id') == 'F') && (parseInt($("#steakTemp").val()) < -459)) {
                $("#tempInpDiv").append(tempAlert);
                OKtoCook = false;
            } else {
				if($('.mytog2:checked').attr('id') == 'F'){model.changeMeatTemp(toC(parseFloat($("#steakTemp").val())))}
                else{model.changeMeatTemp(parseFloat($("#steakTemp").val()))}
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
            var meatdrop = document.getElementById("dMeat");
            var meatType = meatdrop.options[meatdrop.selectedIndex].text;
            model.currentInfo["meatType"] = meatType;
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
                updateTime();
                $('.tt').html(model.convertTime(model.currentInfo["totalTime"]));

                calculate(model.currentInfo["data"], steak, meatType, isFirst, $('.mytog2:checked').attr('id'), animated)
            }
			    var e1 = document.getElementById("d1");
                var name1 = e1.options[e1.selectedIndex].text;
                var e2 = document.getElementById("d2");
                var name2 = e2.options[e2.selectedIndex].text;
                d3.selectAll('.finalsteak').remove();
                               if (name1 != "") {
                    var info = model.currentInfo['recipe'][name1];
					temp= []
					for( i=0;i<info[1].length;i++){
						temp.push(info[1][i]);
			
					}
			
                    drawFinished(info[0], info[1], info[2], info[3], 0, info[4], $('.mytog2:checked').attr('id'));
				model.currentInfo['recipe'][name1][1]=temp	
                }
                if (name2 != "") {
                    var inf = model.currentInfo['recipe'][name2];
						temp= []
					for( i=0;i<inf[1].length;i++){
						temp.push(inf[1][i]);
			
					}
			
                    drawFinished(inf[0], inf[1], inf[2], inf[3], 1, inf[4], $('.mytog2:checked').attr('id'));
					model.currentInfo['recipe'][name1][1]=temp	
                }
			
        }

            function playSound(soundfile) {
                document.getElementById("dummy").innerHTML =
                    "<embed src=\"" + soundfile + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
            }
        var cookingFood = function () {
            clicked = true;
            playSound('steak.wav');
            checkTableForImpossibleValues();
            d3.selectAll(".mysteak").remove();
            d3.selectAll(".containers").remove();
            if (model.currentInfo["OKToGraph"]) {
                d3.selectAll("svg").remove();
                model.dataClear();
                graph(true, '', true);
            };

            $("#graph-pane").css("visibility", "visible");

            var meatdrop = document.getElementById("dMeat");
            var meat = meatdrop.options[meatdrop.selectedIndex].text;
            model.currentInfo['names'][meat] = model.currentInfo['names'][meat] + 1;
            var name = "My " + meat + " " + model.currentInfo['names'][meat];
            var saved = model.saveRecipe(name);
            // if we're viewing the text view, store it back to model so that the table view becomes consistent too
            if ($("#recipeInput").closest(".tab-pane").hasClass("active")) {
                storeTextRecipeIntoModel();
                saved = 1;
            }
            var dropdown1 = $("#d1");
            var dropdown2 = $("#d2");
            var dropdown3 = $('#d3');

			//WHAT IS THIS SECTION DOING??
			
			//K
            if (saved == 1) { //if there was no duplicate
	
                dropdown1.append($('<option>' + name + '</option>'));
                dropdown2.append($('<option>' + name + '</option>'));
                dropdown3.append($('<option>' + name + '</option>'));
                var e1 = document.getElementById("d1");
                var name1 = e1.options[e1.selectedIndex].text;
                var e2 = document.getElementById("d2");
                var name2 = e2.options[e2.selectedIndex].text;
                d3.selectAll('.finalsteak').remove();
				
                       if (name1 != "") {
                    var info = model.currentInfo['recipe'][name1];
					temp= []
					for( i=0;i<info[1].length;i++){
						temp.push(info[1][i]);
			
					}
			
                    drawFinished(info[0], info[1], info[2], info[3], 0, info[4], $('.mytog2:checked').attr('id'));
				model.currentInfo['recipe'][name1][1]=temp	
                }
                if (name2 != "") {
                    var inf = model.currentInfo['recipe'][name2];
						temp= []
					for( i=0;i<inf[1].length;i++){
						temp.push(inf[1][i]);
			
					}
			
                    drawFinished(inf[0], inf[1], inf[2], inf[3], 1, inf[4], $('.mytog2:checked').attr('id'));
					model.currentInfo['recipe'][name1][1]=temp	
                }

            } else {
                model.currentInfo['names'][meat] = model.currentInfo['names'][meat] - 1;
            }
            checkTableForImpossibleValues();
            updateTime();
            $('.tt').html(model.convertTime(model.currentInfo["totalTime"]));
            storeTableIntoModel();

            if (clicked && model.currentInfo["OKToGraph"]) {
                graph(false, $('.mytog:checked').attr('id'), true)
            } else {
                d3.selectAll(".containers").remove();
                d3.selectAll(".mysteak").remove();
                model.dataClear();
            }
        }

        var CookButtonFun = function () {
            $("#cookButton").on("click", cookingFood);
        }

        var timeFun = function (j) {
            $("#row" + j + "time").change(function () {

                if (j == 0) {
                    timeStep = parseInt($("#row" + j + "time").val());
                } else {
                    timeStep = parseInt($("#row" + (j - 1) + "time").val());
                }
            })
        };

        var flipButtonFun = function (k) {

            $("#flipButton" + k).on("click", function () {
                side1data = 0
                side1data += parseInt(parseFloat($('#inp1_' + k).val())) || 0;
                side2data = parseInt(parseFloat($('#inp2_' + k).val()));
                $('#inp1_' + k).val(side2data);
                $('#inp2_' + k).val(side1data);
                model.buildData();
            })
        };

        return {
            buildDisplay: buildDisplay,
            addButtonFun: addButtonFun,
            flipButtonFun: flipButtonFun,
            timeFun: timeFun
        }

    }


    var setup = function (div) {
        var model = Model();
        var view = View(div, model);

        // export the model and the view so we can find them and inspect them
        // in the Chrome debugging console 
        perfectSteak.model = model;
        perfectSteak.view = view;
        view.buildDisplay();
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