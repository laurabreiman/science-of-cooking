var cooking=(function(){
    
    function EventHandler(){
        
        var handlers={};
        //map event string to list of callbacks
        function on(eventString, callback){
            var cblist=handlers[eventString]
            if(cblist===undefined){
                cblist=[]
                handlers[eventString]=cblist;
            }
            cblist.push(callback);
            
        }
        function trigger(eventString,data){
            var cblist=handlers[eventString];
            if(cblist!== undefined){
                for (var i=0;i<cblist.length;i+=1)
                {
                    cblist[i](data);
                }
            }
        }
            return{on:on, trigger: trigger}
    }
    //addOne()
    function Model(div){
        var temp=23;
        var Actions=[];
        var time=0;
        var speed=1;
        var eventHandler=EventHandler();
        var cookingType='Stove';
		var gradient=[];
        var process=function(command){
			if(command[0]='temp'){
				temp=command[1];
				Actions.push({'time':time,'action':'Temperature changed to ' + temp +' degrees Celcius'});
				eventHandler.trigger('update',{"temp":temp,"Actions":Actions});
			}
				if(command[0]='time'){
				time+=speed*1000;
				gradient=updategradient()	
				eventHandler.trigger('update',{"time":time,'gradient':gradient});
			}
				if(command[0]='speed'){
					speed=command[1];
			}
				if(command[0]='cookingType'){
					cookingType=command[1];
					Actions.push({'time':time,'action':'Cooking on ' + cookingType});
					eventHandler.trigger('update',{"cookingType":cookingType,"Actions":Actions});
			}
				if(command[0]='flip'){
					gradient=flipGradient(gradient);
				Actions.push({'time':time,'action':'Flip'});
					eventHandler.trigger('update',{"gradient":gradient,"Actions":Actions});
			}
				
		eventHandler.trigger('update',{"Actions":Actions});
		}
		function updateGradient(){
			
		}
        function flipGradient(gradient){
			gradient.reverse();
		}
		
        return {process: process, on:eventHandler.on};
    }
   
    function Controller(model){
        function update(action)
        {
           
            model.process(action);
        }
         return {update: update};
    }
     function View (div, model, controller){
      
          function update(dict)
         {  
            
            var thickness=model.getThickness();
            
            
            
 
            
         }
         function trash(){
            
         
           
         };
         
         function toggle() {
        
		};
        
         
         model.on('update',update);
         return {trash:trash, toggle:toggle};
    }
    
 
 
    function setup(div){
      
        var model=Model();
        var controller=Controller(model);
        var view=View(div, model,controller);
       	var time=$('<div class=timer></div>');
		$(div).append(time);
		timer();
    }
    
    return {setup: setup};
}());
$(document).ready(function(){
    $('.cooking').each(function(){
        cooking.setup($(this));});
});