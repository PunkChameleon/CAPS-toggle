
//https://developer.mozilla.org/En/CSS/::selection
//https://developer.mozilla.org/en/DOM/HTMLInputElement
//https://developer.mozilla.org/en/DOM/Selection



$(document).ready(function(){
	var selCodes = [];
	var lastSelection = [-1,-1];
	$(document).keydown(function(e) {
		
			var field = $('#inputHolder input');
			var start = field.get(0).selectionStart;
			var end = field.get(0).selectionEnd;
			
			var sameSelection = false;
			
			
		if(start != end) {	/*im not sure how to access "isCollapsed or something"*/
			//debugger;
			console.log('sameSelection: ', sameSelection);
			console.log('start: ', start);
			console.log('end: ', end);
			console.log('1) lastSelection[0]: ', lastSelection[0]);
			console.log('1) lastSelection[1]: ', lastSelection[1]);
			console.log('start == lastSelection[0]: ', start == lastSelection[0]);
			console.log('end == lastSelection[1]: ', end == lastSelection[1]);
			// if the current selection star/end match the last then assume its the same selection 
			sameSelection = (start == lastSelection[0] && end == lastSelection[1]) ? true : false;
			lastSelection[0] = start;
			lastSelection[1] = end;
			console.log('2) lastSelection[0]: ', lastSelection[0]);
			console.log('2) lastSelection[1]: ', lastSelection[1]);
			
			var val = field.val();
			var selStr = (field.val()).slice(start,end);
			var other = (field.val()).split(selStr);
			var selArray = selStr.split('');
			var caseStr = '';
			for(var i=0; i<selArray.length; i++) {
				//selCodes.push(selArray[i].charCodeAt(0));
				var val = selArray[i].charCodeAt(0);
				// x equal n, u, l which stands for None, Upper, Lower
				// im doing a series of Math.max calls to determine the case of each character or if its a non-alpha character.
				// 64 and lessis a non-alpha
				// 65-90 is UPPER
				// 91-96 is a non-alpha
				// 97-122 is a lower
				// 123 and greater is a non-alpha
				// the result is concatinated onto a string
				caseStr += (Math.max(val,65) == val ? (Math.max(val,90) == val ? (Math.max(val,97) == val ? (Math.max(val,122) == val ? '' : 'l') : '') : 'U') : '');
				
				
			}
			console.log('caseStr: ',caseStr);//[97, 122, 65, 90]
			
			if(e.which == 20) {
				// if there is a match (not null) and the matched length is equal to the caseStr length then the whole string matched 
				if(caseStr.match(/U/g) && caseStr.match(/U/g).length == caseStr.length) {
					//the caseString is upper, make it lower
					field.val(other[0]+(selStr.toLowerCase())+other[1]);
				} else {
					field.val(other[0]+(selStr.toUpperCase())+other[1]);
				}
			}   
			field.get(0).setSelectionRange(start,end);
		}
	});

	/*
	$(document).keydown(function(e) {

			console.log(e);	
	    // An empty field resets the visibility.
	    if(this.value === '') {
	        $('#capsLockWarning').hide();
	        return;
	    }

	    // We need alphabetic characters to make a match.
	    var character = String.fromCharCode(e.which);
	    if(character.toUpperCase() === character.toLowerCase()) {
	        return;
	    }

	    // SHIFT doesn't usually give us a lowercase character. Check for this
	    // and for when we get a lowercase character when SHIFT is enabled. 
	    if((e.shiftKey && character.toLowerCase() === character) ||
	        (!e.shiftKey && character.toUpperCase() === character)) {
	        $('#capsLockWarning').show();
	    } else {
	        $('#capsLockWarning').hide();
	    }

	});
	*/


});