window.onload = init;

var usersRankLength = 0;
var userName;

function init(){
	userName=localStorage.getItem("username");
	if(userName==null){
		window.location.href="../../login/login.html";
	}
	
	var welcomeElement = document.getElementById("welcome-info");
	welcomeElement.innerHTML = "Welcome "+ userName+". This is the page for you to know where you stand based on the number of words you have mastered. Keep up the good work!";
	loadData(userName);
	
	var int = self.setInterval(
		function () {
			loadData(userName);
		}
		, 1000);
	
}

function loadData(userName) {
	var xmlhttp;
	if (window.XMLHttpRequest){
		//  IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else{
		// IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("POST", 'php/ranking_php.php',true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var postdata="username="+userName;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   var textString = xmlhttp.responseText;
		   var usersList= textString.split(',');
		   showRank(usersList);
		}
	};	
	xmlhttp.send(postdata);
}



function showRank(usersList) {
	var table=document.getElementById("rank_table");
	for(var i = table.rows.length - 1; i > 0; i--)
	{
		table.deleteRow(i);
	}
	var scoreList = [];
	for (var i=0; i < usersList.length; i++) {
		var userList = usersList[i].split(':');
		
		var username = userList[0];
		var score = userList[1];
		
		var row = table.insertRow(i+1);
		
		var rankNumberCell = row.insertCell(0);
		var usernameCell = row.insertCell(1);
		var scoreCell = row.insertCell(2);
		
		var checkSameScore = scoreList.includes(score);
		if (checkSameScore) {
			usernameCell.innerHTML = username;
			scoreCell.innerHTML = score;
		}
		else {
			rankNumberCell.innerHTML = i+1;
			usernameCell.innerHTML = username;
			scoreCell.innerHTML = score;
			scoreList.push(score);
		}
		
		if (username === userName) {
			row.style.color = "red";
		}
	}
}

function goHome(){
	window.location.href="../index_voctutotor.html";
}