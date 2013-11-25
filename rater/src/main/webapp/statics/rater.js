var rater = {
		setup:function() {
		     var config = {
		    		 'ACTIVE_CLASS':'rating gold', // change this
		    		 'INACTIVE_CLASS':'rating gray',
		    		 'DESELECTED_ICON':'gray.png',
		             'RATE_MIN':1,
		             'RATE_MAX':5,
		             'INCREMENT_BY':1,
		             'RATE_DEFINITION':{"1":{"display":"1","weight":1},
		            	 				"2":{"display":"2","weight":2},
		            	 				"3":{"display":"3","weight":3},
		            	 				"4":{"display":"4","weight":4},
		            	 				"5":{"display":"5","weight":5}
		             					}
		             };
		       return {
		            get: function(name) { return config[name]; }
		        };
		       
		    }
		,	
		init:function(divId,options){
					var rateObjectDiv = document.getElementById(divId);
		    		var allowClear = (options!=null && options.allowClear == true)?options.allowClear:false;
		    		var readOnly = (options!=null && options.readOnly == true)?options.readOnly:false;
		    		var defaultCursorHtml = 'style="cursor:default"';
					var eventHtml = ' onClick="rater.select(this);" onmouseover="rater.onHover(this)" onmouseout="rater.reset(this)"';
					var clearHtml ='<div id="'+divId+'_0" class="rating clear" weight="0" title="Clear" '+(!readOnly?eventHtml:defaultCursorHtml)+'></div>';
					var html='';
		    		var def = rater.setup().get('RATE_DEFINITION');
		    		var currentWeight = rateObjectDiv.getAttribute('weight');
			    		for (var i=rater.setup().get('RATE_MIN');i<=rater.setup().get('RATE_MAX');i+=rater.setup().get('INCREMENT_BY')){
			    			html += '<div id="'+divId+'_'+i+'" class="'+(i<=currentWeight?rater.setup().get('ACTIVE_CLASS'):rater.setup().get('INACTIVE_CLASS'))+'" weight="'+def[i].weight+'" title="'+def[i].display+'" '+(!readOnly?eventHtml:defaultCursorHtml)+'></div>';
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
			var hiddenField = document.getElementById(ele.parentNode.getAttribute('hiddenField'));
			rater._setRate(selectedWeight,ele.parentNode.id);
			ele.parentNode.setAttribute('weight',selectedWeight);
				if(hiddenField!=null){
					hiddenField.value = selectedWeight;
				}
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