var rater = {
		setup:function() {
		     var config = {
		    		 'ACTIVE_CLASS':'rating gold', // change this
		    		 'INACTIVE_CLASS':'rating gray',
		    		 'DESELECTED_ICON':'gray.png',
		             'RATE_MIN':1,
		             'RATE_MAX':5,
		             'INCREMENT_BY':1,
		             'RATE_DEFINITION':{"1":{"display":"Bad","weight":1},
		            	 				"2":{"display":"Poor","weight":2},
		            	 				"3":{"display":"Ok","weight":3},
		            	 				"4":{"display":"Good","weight":4},
		            	 				"5":{"display":"Excellent","weight":5}
		             					}
		             };
		       return {
		            get: function(name) { return config[name]; }
		        };
		       
		    }
		,	
		init:function(divId,allowClear){
					var rateObjectDiv = document.getElementById(divId);
					var eventHtml = ' onClick="rater.select(this);" onmouseover="rater.onHover(this)" onmouseout="rater.reset(this)"';
					var clearHtml ='<div id="'+divId+'_0" class="rating clear" weight="0" title="Clear" '+eventHtml+'></div>';
					var html='';
		    		var def = rater.setup().get('RATE_DEFINITION');
		    		var currentWeight = rateObjectDiv.getAttribute('weight');
			    		for (var i=rater.setup().get('RATE_MIN');i<=rater.setup().get('RATE_MAX');i+=rater.setup().get('INCREMENT_BY')){
			    			html += '<div id="'+divId+'_'+i+'" class="'+(i<=currentWeight?rater.setup().get('ACTIVE_CLASS'):rater.setup().get('INACTIVE_CLASS'))+'" weight="'+def[i].weight+'" title="'+def[i].display+'" '+eventHtml+'></div>';
			    		};
		
			    		if(allowClear){
							html =clearHtml+html;
			    		}
		
					rateObjectDiv.innerHTML = html;
				
			},
		onHover:function(e){
			rater._setRate(e.getAttribute('weight'),e.parentNode.id);
			},
		select:function(ele){
			var selectedWeight = ele.getAttribute('weight');
			rater._setRate(selectedWeight,ele.parentNode.id);
			ele.parentNode.setAttribute('weight',selectedWeight);
			},
		reset:function(ele){
			rater._setRate(ele.parentNode.getAttribute('weight'),ele.parentNode.id);
			},
		getRate:function(id){
			return document.getElementById(id).getAttribute('weight');
			},
		_setRate:function(currentWeight,raterParentId){
    		for (var i=rater.setup().get('RATE_MIN');i<=rater.setup().get('RATE_MAX');i+=rater.setup().get('INCREMENT_BY')){
				document.getElementById(raterParentId+'_'+i).className =(i<=currentWeight?rater.setup().get('ACTIVE_CLASS'):rater.setup().get('INACTIVE_CLASS'));
    		}
		}
	};