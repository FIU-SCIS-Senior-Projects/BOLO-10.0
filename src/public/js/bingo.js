/*
This function is for when entering the grid card code.
Once the input form has content of length 2, focus will be shifted to the next input box.
*/
var next = function(){
	//gets an instance of each input box
	var val1 = document.getElementById("value1");
	var val2 = document.getElementById("value2");
	var val3 = document.getElementById("value3");
	
	//console.log(this.value.length);
	
	//if length is 2, switch focus to next box, or remove focus at the end of the last box.
	if(this.value.length == 2){
		switch(this) {
		case val1:
			val2.focus();
			break;
		case val2:
			val3.focus();
			break;
		default:
			val3.blur();
			break;
		} 
	}
}
