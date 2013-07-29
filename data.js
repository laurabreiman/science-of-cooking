var tempScale=[{'info':'lack of protein denaturization below 50°C','position':5},
			   {'info':'Myosin breaks down 50°-55°C','position':4},
			  {'info':'Glycogen breaks down 55°-60°C','position':3},
			  {'info':'Myoglobin denatures 60°-70°C','position':2},
			  {'info':'Actin denatures 70-120°C','position':1},
			  {'info':'Browning reactions occur 120°C+','position':0}];

//color
var color = d3.scale.linear()
    .domain([0,1,5,9,10])
    .range(['#693d34' ,"#F58282","#f52900","#F58282",'#693d34']);
//boundaries where color change occurs
var boundaries=[120,70,60,55,50];