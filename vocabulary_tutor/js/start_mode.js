
function get_unit_learning(){
	var unit_learn = document.getElementById("unit_learn").value;
	localStorage.setItem("unit_to_learn", unit_learn);
}

function get_unit_test(){
	var unit_test = document.getElementById("unit_test").value;
	localStorage.setItem("unit_to_test", unit_test);
}