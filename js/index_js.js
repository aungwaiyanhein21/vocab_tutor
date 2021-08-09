window.onload = loadData;

function loadData() {
	var xmlhttp;
	if (window.XMLHttpRequest){
		//  IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else{
		// IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("POST", 'php/index_php.php',true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var username = localStorage.getItem("username");
	var email = localStorage.getItem("email");

	var postdata="username="+username+"&email="+email;
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   var textString = xmlhttp.responseText;
		   var splitTextArray = textString.split(' ');
		   //alert(splitTextArray);
		   if (splitTextArray.length == 1) {
				//alert("Welcome "+textString);
				var logoutElement = document.getElementById("loginLogoutTxt");
				logoutElement.innerHTML = "Logout";
				
				var usernameElement = document.getElementById("signupDashboardTxt");
				usernameElement.innerHTML = textString;
				
				var logoutVersion2 = document.getElementById("joinLogoutTxt"); //another way to log out
				logoutVersion2.innerHTML = "Logout";
				
				logoutElement.addEventListener("click", loggingOut);
				logoutVersion2.addEventListener("click",loggingOut);
				
				//var logoutElement = document.getElementById("loginLogoutTxt");
				//logoutElement.setAttribute('href', "index.html");
		   }
		   else {
				//alert("Welcome Stranger");
				var loginElement = document.getElementById("loginLogoutTxt");
				loginElement.innerHTML = "Login";
				
				var signupElement = document.getElementById("signupDashboardTxt");
				signupElement.innerHTML = "SignUp";
				
				var signupVersion2 = document.getElementById("joinLogoutTxt"); //another way to sign up
				signupVersion2.innerHTML = "Join for free";
				
				loginElement.setAttribute('href', "login/login.html");
				
				signupElement.addEventListener("click",function(){
					window.location = "signup/signup.html";
				});
				//signupElement.setAttribute('href', "signup/signup.html");
				
				signupVersion2.addEventListener("click",function() {
					window.location = "signup/signup.html";
				});
				//signupVersion2.setAttribute('href',"login/login.html");
		   }
		}
	};	
	xmlhttp.send(postdata);
}

function loggingOut() {
	//alert("loggingOut");
	var xmlhttp;
	if (window.XMLHttpRequest){
		//  IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else{
		// IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("POST", 'php/logout_php.php',true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var username = localStorage.getItem("username");
	var email = localStorage.getItem("email");

	var postdata="username="+username+"&email="+email;
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   var textString = xmlhttp.responseText;
		   var splitTextArray = textString.split(' ');
		   //alert(splitTextArray);
		   if (splitTextArray.length == 1) {
				//alert("Session destroyed");
				var logoutElement = document.getElementById("loginLogoutTxt");
				//logoutElement.setAttribute('href', "signup/signup.html");
				localStorage.clear();
				window.location= "index.html";
		   }
		   else {
				//alert("Welcome Stranger");
				alert("error: "+textString);
				
		   }
		}
	};	
	xmlhttp.send(postdata);
}


	/* When the user clicks on the button, 
	toggle between hiding and showing the dropdown content */
	/*function dropDownToggling() {
		document.getElementById("userDropDown").classList.toggle("show");
		alert("clicked");
	}*/

	// Close the dropdown if the user clicks outside of it
	/*
	window.onclick = function(event) {
	  if (!event.target.matches('.user-drop-setting')) {

		var dropdowns = document.getElementsByClassName("content-dropdown");
		for (var i = 0; i < dropdowns.length; i++) {
		  var droppingDown = dropdowns[i];
		  if (droppingDown.classList.contains('show')) {
			droppingDown.classList.remove('show');
		  }
		}
	  }
	}
	*/