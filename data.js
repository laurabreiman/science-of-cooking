var tempScale={"Steak":
                [{'info':'lack of protein denaturization below 40\xB0 C','position':5},
                {'info':'Myosin breaks down 40-55\xB0 C','position':4},
                {'info':'Glycogen breaks down 55-60\xB0 C','position':3},
                {'info':'Myoglobin denatures 60-70\xB0 C','position':2},
                {'info':'Actin denatures 70-120\xB0 C','position':1},
                {'info':'Browning reactions occur 120+\xB0 C','position':0}],

              "Tuna":

                [{'info':'lack of protein denaturization below 40\xB0 C','position':5},
                {'info':'Myosin breaks down 40-50\xB0 C','position':4},
                {'info':'Myocommata begins to rupture 50\xB0 C','position':3},
                {'info':'Myoglobin denatures 60-70\xB0 C','position':2},
                {'info':'Actin denatures 70\xB0 C','position':1},
                {'info':'Fibers begin to disintegrate 90+\xB0 C+','position':0}],
			   "Turkey":
                [{'info':'lack of protein denaturization below 40\xB0 C','position':5},
                {'info':'Myosin breaks down 40-55\xB0 C','position':4},
                {'info':'Glycogen breaks down 55-60\xB0 C','position':3},
                {'info':'Myoglobin denatures 60-70\xB0 C','position':2},
                {'info':'Actin denatures 70-120\xB0 C','position':1},
                {'info':'Browning reactions occur 120+\xB0 C','position':0}]
              };

//color
var color = {
        "Steak":
            d3.scale.linear()
            .domain([0,1,5,9,10])
            .range(['#693d34' ,"#F58282","#f52900","#F58282",'#693d34']),
        "Tuna":
            d3.scale.linear()
            .domain([0,1,5,9,10])
            .range(['#692901','#FAEEE6','#FA3491', '#FAEEE6','#692901']),

        "Turkey":
            d3.scale.linear()
            .domain([0,1,5,9,10])
            .range(['#692901','#FAEEE6','#B56980','#FAEEE6','#692901'])
};
//boundaries where color change occurs
var boundaries= {"Steak":[120,70,60,55,40], "Tuna": [90,70,60,50,40],"Turkey":[120,70,60,55,40]};
