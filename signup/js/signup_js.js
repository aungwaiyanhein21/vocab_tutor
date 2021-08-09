//window.onload = init;

var newUsername;
var newEmail;
var newPassword;
var confirmPasswordLetters;

window.onload = init;
function init() {
	var user_last_input = document.getElementById("confirmPassword");
	user_last_input.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("signup_btn").click();
		}
	});
}


function signUpProcessing() {
	newUsername = document.getElementById("newUsername").value;
	newEmail = document.getElementById("newEmail").value;
	newPassword = document.getElementById("newPassword").value;
	confirmPasswordLetters = document.getElementById("confirmPassword").value;
	//alert(newUsername+" "+newEmail+" "+newPassword);
	
	var emailAddressValidation = validateEmail();
	var usernameValidation = validateUsername();
	
	var learn_mode = new Learned_mode([],[]);
	var test_mode = new Test_mode(0);
	user = new User(newUsername, newPassword, newEmail, "cards", learn_mode, test_mode);
	user = JSON.stringify(user);
	if (newUsername === "" || newEmail === "" || newPassword === "" || confirmPasswordLetters === ""){
		document.getElementById("confirming-container").style.display = "block";
		document.getElementById("confirming").innerHTML = "One of the fields is unfilled!";
	}
	else if(usernameValidation === "invalid"){
		document.getElementById("confirming-container").style.display = "block";
		document.getElementById("confirming").innerHTML = "Invalid username! No space and no special characters.";
	}
	else if (emailAddressValidation === "invalid") {
		document.getElementById("confirming-container").style.display = "block";
		document.getElementById("confirming").innerHTML = "Invalid Email Address!";
	}
	else if(newPassword !== confirmPasswordLetters){
		document.getElementById("confirming-container").style.display = "block";
		document.getElementById("confirming").innerHTML = "Passwords Not Matched!";
	}
	else {
		//alert("created");
		loadData(user);
	}
	//alert (user);
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
	xmlhttp.open("POST", 'php/signup_php.php',true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var postdata="user="+user;
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   document.getElementById("confirming-container").style.display = "block";
		   document.getElementById("confirming").innerHTML = xmlhttp.responseText;
		   
		   document.getElementById("newUsername").value = "";
		   document.getElementById("newPassword").value = "";
		   document.getElementById("newEmail").value = "";
		   document.getElementById("confirmPassword").value = "";
		   
		}
	};	
	xmlhttp.send(postdata);
}


function newPasswordProcessing() {
	newPassword = document.getElementById("newPassword").value;
}

function confirmingPassword() {
	confirmPasswordLetters = document.getElementById("confirmPassword").value;
	//alert(newPassword);
	document.getElementById("confirming-container").style.display = "block";
	if (confirmPasswordLetters === newPassword){
		document.getElementById("confirming").innerHTML = "Passwords Matched";
	}
	else{
		document.getElementById("confirming").innerHTML = "Passwords UnMatched";
	}
	
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

function validateEmail() {
    var emailAddress = document.getElementById("newEmail").value;
    var atPosition = emailAddress.indexOf("@");
    var dotPosition = emailAddress.lastIndexOf(".");
    if (atPosition<1 || dotPosition<atPosition+2 || dotPosition+2>=emailAddress.length) {
        //alert("Not a valid e-mail address");
        return "invalid";
    }
	else {
		return "valid";
	}
}

function validateUsername() {
	var username = document.getElementById("newUsername").value;
	var searchFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;  
	
	var test = searchFormat.test(username);
	
	if (test) {
		return "invalid";
	}
	else {
		return "valid";
	}
	
}

