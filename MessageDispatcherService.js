/**
 * Message service - event dispatcher class
 */

'use strict';
 
function MessageService(){
	var listenersMap = {};

	 this.register = function(key,listener) {
		if(listenersMap[key] === undefined){
			listenersMap[key] = [];
		}
		
		if(listenersMap[key].indexOf(listener) == -1){
			if(!checkIfListenerExists(listener,listenersMap[key]))
				listenersMap[key].push(listener);
		}
	}
	 
	 function checkIfListenerExists(listener,listenerArray)
	 {
		 listenerArray.forEach(function(value) {
		 	if(listener === value)
		 	{
		 		return true;
		 	}
		 })
		 
		 return false;
		 
	 }
	
	this.deregister = function(key,listener){
		if(listenersMap === undefined){
			return;
		}
		
		var listenersList = listenersMap[key];
		if(listenersList !== undefined){
			var listenerIndex = listenersList.indexOf(listener)
			if(listenerIndex !== -1){
				console.log('deregister:'+key);
				listenersList.splice(listenerIndex, 1)
			}
		}	
	}
	
	this.hasListener = function(key){
		if(listenersMap === undefined){
			return false;
		}
		if(listenersMap[key] !== undefined) {
			return true;
		}
		return false;
	}
	
	this.dispatchEvent = function(key,data){
		if(listenersMap === undefined){
			return;
		}
		var listenersList = listenersMap[key];
		if(listenersList !== undefined){
			for(var i=0;i<listenersList.length;i++){
				listenersList[i].apply(this,[key,data]);
			}
		}
		
	}


}