
$(document).ready(function(){
	//https://developer.mozilla.org/En/CSS/::selection
	//https://developer.mozilla.org/en/DOM/HTMLInputElement
	//https://developer.mozilla.org/en/DOM/Selection
	//https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_Editable

	$(document).keydown(function(e) {
			// MAC webkit caps lock defect::
			// known issue in webkit
			// https://bugs.webkit.org/show_bug.cgi?id=18792
			//
			// https://lists.webkit.org/pipermail/webkit-dev/2012-December/023164.html
			// There's a bug reported against Chromium (crbug.com/144757) for the
			// CapsLock key generating only a keydown when first pressed and released, and
			// a keyup when next pressed and released, i.e. the keydown & keyup events
			// correspond with the caps lock-state being toggled, rather than with the key
			// itself being pressed or released.

			if(e.which != 20) {return;} /*if the key isnt CAPSLOCK return*/
			var field = $(e.target),
					start = field.get(0).selectionStart,
					end = field.get(0).selectionEnd,
					fieldVal,
					selStr,
					selArray,
					caseStr,
					otherText,
					charCode;

		if(start != end) {	/*im not sure how to access "isCollapsed or something"*/
			fieldVal = field.val();
			selStr = (fieldVal).slice(start,end);
			selArray = selStr.split('');
			caseStr = '';
			otherText = [(fieldVal).slice(0,start), (fieldVal).slice(end)];
			for(var c=0; c<selArray.length; c++) {
				charCode = selArray[c].charCodeAt(0);
				// im doing a series of Math.max calls to determine the case of each character or if its a non-alpha character.
				// 64 and less is a non-alpha + 65-90 is UPPER + 91-96 is a non-alpha + 97-122 is a lower + 123 and greater is a non-alpha
				caseStr += (Math.max(charCode,65) == charCode ? (Math.max(charCode,90) == charCode ? (Math.max(charCode,97) == charCode ? (Math.max(charCode,122) == charCode ? '' : 'l') : '') : 'U') : '');
			}
			/*replace the field text with the newly transformed text -by creating an array and joining it (for easier to read string concatination)*/
			field.val([otherText[0],
				/* if there is a match (not null) and all the characters are upper then use toLowerCase, else the string is mixed case or all lower and use toUpperCase*/
				(caseStr.match(/U/g) && caseStr.match(/U/g).length == caseStr.length) ? selStr.toLowerCase() : selStr.toUpperCase(),
				otherText[1] ].join('')
			);
			/*
			var logObj = {
				start: start +'',
				end: end  +'',
				fieldVal: fieldVal +'',
				selStr: selStr +'',
				selArray: selArray,
				caseStr: caseStr +'',
				otherText: otherText,
				charCode: charCode +''
			};
			console.log('logObj', logObj);
			*/
			field.get(0).setSelectionRange(start,end); /* always reselect what was selected */
		}
	});

	function textareaAutoHeight() {
		var h = $('textarea').height(0).height();
		console.log('h: ',h);
		var unseen = $('textarea').scrollTop(0).scrollTop(999).scrollTop();
		console.log('unseen: ',unseen);
		$('textarea').height($('textarea').height() + unseen);
		$('.box').css('min-height',$('textarea').outerHeight());
	}

	textareaAutoHeight();
	$(document).on('focus keydown keyup mousedown mouseup', textareaAutoHeight);

});