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
        var temp=0;
        var Actions=[];
        var time=0;
        var speed=1000;
        var eventHandler=EventHandler();
        var cookingType=0;
		var gradient=[];
        var process=function(command){
			if(command[0]='temp'){
				temp=command[1];
				Actions.push({'time':time,'action':'Temperature changed to' + temp})
				eventHandler.trigger('update',{"temp":temp,"Actions":Actions});
			}
				if(command[0]='time'){
				time+=
				gradient=updategradient()	
				eventHandler.trigger('update',{"time":time,'gradient':gradient});
			}
				if(command[0]='speed'){
				
			}
				if(command[0]='cookingType'){
				
			}
				if(command[0]='flip'){
				
			}
				if(command[0]='trash'){
				
			}
        
		eventHandler.trigger('update',{"time":time,'gradient':gradient});
		eventHandler.trigger('update',{"speed":speed});
		eventHandler.trigger('update',{"cookingType":cookingType});
		eventHandler.trigger('update',{"Actions":Actions});
		}
		function updateGradient(){
			
		}
        function getTemp(){
            return temp;
        }
         function getThicness(){
            return thickness;
        }
		
        return {process: process, getCost:getTemp,  getWeight: getThickness, on:eventHandler.on};
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
       
    }
    
    return {setup: setup};
}());
$(document).ready(function(){
    $('.cooking').each(function(){
        cooking.setup($(this));});
});