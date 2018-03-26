


//code to open preview in a new window.
function preview(){
	//get the form from the current window
	var form = document.getElementById('create-bolo-form');
	//opens a new window and changes focus to new window
	var preview = window.open(window.location.href,'Preview');
	//sets form target to new window
    form.target = "Preview";
}

//code to normally submit in original window
function thisWindow(){
	//get the form from the current window
	var form = document.getElementById('create-bolo-form');
	//sets form target to current window
	form.target = "_self";
}



