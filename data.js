var CtempScale={
			   "Steak":
                [{'info':'Raw: No protein denaturization below 40\xB0C ','position':6},
                {'info':'Rare: Myosin denatures 40-55\xB0C ','position':5},
                {'info':'Medium Rare: Glycogen denatures 55-60\xB0C ','position':4},
                {'info':'Medium: Myoglobin denatures 60-70\xB0C ','position':3},
                {'info':'Well: Actin denatures 70-120\xB0C ','position':2},
                {'info':'Browning reactions 120-180\xB0C','position':1},
				{'info':'Charring at >180\xB0C','position':0}],

              "Tuna":

                [{'info':'No protein denaturization below 40\xB0C','position':6},
                {'info':'Myosin denatures 40-50\xB0C','position':5},
                {'info':'Myocommata rupture 50-60\xB0C','position':4},
                {'info':'Myoglobin denatures 60-70\xB0C','position':3},
                {'info':'Actin denatures 70-90\xB0C','position':2},
                {'info':'Fibers disintegrate +90\xB0C','position':1},
				{'info':'Charring at >180\xB0C','position':0}],
			   "Turkey":
			    [{'info':'Raw: No protein denaturization below 40\xB0C ','position':6},
                {'info':'Rare: Myosin denatures 40-55\xB0C ','position':5},
                {'info':'Medium Rare: Glycogen denatures 55-60\xB0C ','position':4},
                {'info':'Medium: Myoglobin denatures 60-70\xB0C ','position':3},
                {'info':'Well: Actin denatures 70-120\xB0C ','position':2},
                {'info':'Browning reactions 120-180\xB0C','position':1},
				{'info':'Charring at >180\xB0C','position':0}],
	"False":[{}]
	
              };
var FtempScale={
			   "Steak":
                [{'info':'Raw: No protein denaturization below 100\xB0F ','position':6},
                {'info':'Rare: Myosin denatures 100-130\xB0F ','position':5},
                {'info':'Medium Rare: Glycogen denatures 130-140\xB0F ','position':4},
                {'info':'Medium: Myoglobin denatures 140-150\xB0F ','position':3},
                {'info':'Well: Actin denatures 150-250\xB0F ','position':2},
                {'info':'Browning reactions 250-350\xB0F ','position':1},
				{'info':'Charring at >350\xB0F','position':0}],

              "Tuna":

                [{'info':'No protein denaturization below 100\xB0F','position':6},
                {'info':'Myosin denatures 100-120\xB0F','position':5},
                {'info':'Myocommata rupture 120-140\xB0F','position':4},
                {'info':'Myoglobin denatures 140-150\xB0F ','position':3},
                {'info':'Actin denatures 150-200\xB0F','position':2},
                {'info':'Fibers disintegrate +200\xB0F','position':1},
				{'info':'Charring at >350\xB0F ','position':0}],
			   "Turkey":
			   [{'info':'Raw: No protein denaturization below 100\xB0F ','position':6},
                {'info':'Rare: Myosin denatures 100-130\xB0F ','position':5},
                {'info':'Medium Rare: Glycogen denatures 130-140\xB0F ','position':4},
                {'info':'Medium: Myoglobin denatures 140-150\xB0F ','position':3},
                {'info':'Well: Actin denatures 150-250\xB0F ','position':2},
                {'info':'Browning reactions 250-350\xB0F ','position':1},
				{'info':'Charring at >350\xB0F','position':0}],
	"False":[{}]
	
              };
var miniInfo={"Steak":['raw','rare','medium rare','medium','well','browned','charred'],
			  "Tuna":['raw','rare','medium rare','medium','well','browned','charred'],
			  "Turkey":['raw','rare','medium rare','medium','well','browned','charred']
			 }
//color
var color = {
     
	"Steak":
            d3.scale.linear()
            .domain([0,1,3,6,9,11,12])
            .range(['black','#693d34' ,"#FFC4C5","#8B0000","#FFC4C5",'#693d34','black']),
        "Tuna":
            d3.scale.linear()
            .domain([0,1,3,6,9,11,12])
            .range(['black','#692901','#FAEEE6','#FA3491', '#FAEEE6','#692901','black']),

        "Turkey":
            d3.scale.linear()
            .domain([0,1,3,6,9,11,12])
            .range(['black','#692901','#FAEEE6','#B56980','#FAEEE6','#692901','black']),
		"False":
            d3.scale.linear()
            .domain([0,.25,.5,.75,1])
            .range(['blue','limegreen','yellow','red','darkred'])
};
//boundaries where color change occurs
var boundaries= {"Steak":[180,120,70,60,55,40], "Tuna": [180,90,70,60,50,40],"Turkey":[180,120,70,60,55,40],"False":[]};
//var boundaries= {"Steak":[350,250,150,140,130,100], "Tuna": [350,200,150,140,120,100],"Turkey":[350,250,150,140,130,100],"False":[]};