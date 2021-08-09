var username;
var user_password; 

window.onload = init;
function init() {
	var user_input = document.getElementById("user_password");
	user_input.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("login_btn").click();
		}
	});
}

function loginProcessing() {
	username = document.getElementById("username").value;
	user_password = document.getElementById("user_password").value;
	
	if (username === "" || user_password === ""){
		document.getElementById("confirming-container").style.display = "block";
		document.getElementById("confirming").innerHTML = "One of the fields is missing!";
	}
	else {
		var learn_mode = new Learned_mode([],[]);
		var test_mode = new Test_mode(0);
		user = new User(username, user_password, "", "cards", learn_mode, test_mode);
		user = JSON.stringify(user);
		
		loadData(user);
	}
	
}

function loadData(user) {
	var xmlhttp;
	if (window.XMLHttpRequest){
		//  IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else{
		// IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("POST", 'php/login_php.php',true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var postdata="user="+user;
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   var textString = xmlhttp.responseText;
		   var splitTextArray = textString.split(',');
		   
		   if (splitTextArray.length == 2) {
				
				/* local storage */
				localStorage.setItem("username",splitTextArray[0]);
				localStorage.setItem("email",splitTextArray[1]);
				
				//alert(localStorage.getItem("username")+" "+localStorage.getItem("email"));
				
				/* redirecting */
				window.location= "../index.html";
				
		   }
		   else {
				document.getElementById("confirming-container").style.display = "block";
				document.getElementById("confirming").innerHTML = xmlhttp.responseText;
		   }
	
		   document.getElementById("username").value = "";
		   document.getElementById("user_password").value = "";
		   
		}
	};	
	xmlhttp.send(postdata);
}

function User(user_name, user_password, user_email, user_request, user_learn_mode, user_test_mode){
    this.user_name = user_name;
    this.pass_word = user_password;
    this.email = user_email;
    this.request = user_request;
    this.learn_mode = user_learn_mode;
    this.test_mode = user_test_mode;
}

function Learned_mode(user_learned_words,user_dontshow){
    this.learned_words=user_learned_words;
    this.dont_show=user_dontshow;
}

function Test_mode(scores){
    this.max_scores=scores;
}