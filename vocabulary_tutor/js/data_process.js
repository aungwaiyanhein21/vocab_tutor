var question=[];
var answer=[];
var card_info_arr;
var user;
var dash_container;
var table_container;
var card_container;
var card_arr;
var user_learned_arr=[];
var user_dontshow_arr=[];
var card_arr_static;
var users;
var user_index=0;
window.onload = function (){
	var user_email=localStorage.getItem("email");
	var user_name=localStorage.getItem("username");
	if(user_name==null || user_email==null){
		window.location.href="../login/login.html";
	}
	
	dash_container=document.getElementById("dash");
	table_container=document.getElementById("table");
	card_container=document.getElementById("card-container");
	
	var unit_to_learn=localStorage.getItem("unit_to_learn");
	//var user_progress_arr = new Array("questions");
	var learn_mode = new Learned_mode([],[]);
	var test_mode = new Test_mode(0);
		
	user = new User(user_name, "123456", user_email, "cards", learn_mode, test_mode);
	loadData(user_name);
	loadXMLDoc("php/vocabulary_tutor.php","data_requested=");
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


function loadXMLDoc(php_link,php_var)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{		
			data=xmlhttp.responseText.split("^")[0];
			
			users=(xmlhttp.responseText.split("^")[1]).split("|");
			users.splice(0,1);
			
			card_arr=data.split("|");
			card_arr.splice(0,1);
			
			card_arr_static=data.split("|");
			card_arr_static.splice(0,1);
			handle_data();//data requested		
		}
	}
	xmlhttp.open("POST", php_link, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(php_var+JSON.stringify(user));
}


function handle_data(){	
	var learned_index=0;
	var dontshow_index=0;
	for (var i=0; i<users.length; i++){
		if(JSON.parse(users[i]).email==user.email){
			user=JSON.parse(users[i]);
			user_index=i;
			break;
		}
	}
	
	for (var i=0; i<card_arr.length; i++){
		var word=(card_arr[i].split(":"))[0];
		for (var j=0; j<user.learn_mode.learned_words.length; j++){
			if(user.learn_mode.learned_words[j]==word){
				user_learned_arr[learned_index]=card_arr[i];
				learned_index++;
			}
		}
		
		for (var k=0; k<user.learn_mode.dont_show.length; k++){
			if(user.learn_mode.dont_show[k]==word){
				user_dontshow_arr[dontshow_index]=card_arr[i];
				dontshow_index++;
			}
		}
	}
	card_arr = card_arr.filter(function(e){return e}); 
	
	show_dash(user_learned_arr.length, user_dontshow_arr.length);
	
	if(user.request=="cards"){
		card_info_arr=data.split("|");
	}
	
}


function show_dash(learn_num, dontshow_num){
	table_container.style.display = "none";
	dash_container.style.display = "flex";
	document.getElementById("welcome-info").innerHTML="Welcome "+user.user_name+"! "+"click learning mode button to start learning and test mode to test the words you learned";
	//document.getElementById("rank").innerHTML="1st"//user.test_mode.rank;
	document.getElementById("words_tested").innerHTML=user.test_mode.max_scores;
	document.getElementById("word-info").innerHTML="SAT Vocabulary - Unit 1";
	document.getElementById("words-left").innerHTML="Word progress: "+(learn_num+dontshow_num);
	document.getElementById("words-total").innerHTML="/"+card_arr.length;
	var progress_percent=(((user_learned_arr.length+user_dontshow_arr.length)/card_arr.length)*100).toFixed(1)+"%"
	document.getElementById("progress").innerHTML=progress_percent;
	document.getElementById("progress").style.width = progress_percent;
}


function show_table(table){
	document.getElementById("list-welcome-info").innerHTML="Welcome "+user.user_name+"! "+"click 'Learned Words' to review the words you learned or 'Don't-show Words' to view words skiped.";
	if(table=="learned"){
		show_words_def("words_learned", "words_dontshow", user_learned_arr);
	}
	
	else if(table=="dontshow"){
		show_words_def("words_dontshow", "words_learned", user_dontshow_arr);
	}
	
	card_container.style.display = "none";
	dash_container.style.display = "none";
	table_container.style.display = "flex";
}


function show_words_def(active_word_button, inactive_word_button, user_word_arr){
	
	$("#word_table td").remove();
	
	document.getElementById(active_word_button).className="word-button-active context-menu";
	document.getElementById(inactive_word_button).className="word-button-container cursor word_botton_hover";	
	
    var table=document.getElementById("word_table");
	
	for(var i=0; i<user_word_arr.length;i++){
		var word=user_word_arr[i].split(":")[0];
		var def=user_word_arr[i].split(":")[3];
		
		var show_card_icon = document.createElement("i");
		show_card_icon.className="card-icon fa fa-list-alt cursor";
		show_card_icon.style.fontSize = "30px";
		var show_card_func="show_card("+'"'+word+'"'+")";	
		show_card_icon.setAttribute("onclick", show_card_func);
		
		var row = table.insertRow(i+1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = word;
		cell2.innerHTML = def;
		
		if(active_word_button=="words_dontshow"){
			var recover_button = document.createElement("button");
			recover_button.className="recover-button";
			recover_button.style.color="#191970";
			recover_button.innerHTML="recover";
			var recover_func="recover_word("+'"'+word+'"'+")";
			recover_button.setAttribute("onclick", recover_func);
			cell2.appendChild(show_card_icon);
			cell2.appendChild(recover_button);
		}
		
		else{
			cell2.appendChild(show_card_icon);
		}
	}
}


function recover_word(word_to_recover){
	
	for (var k=0; k<user.learn_mode.dont_show.length; k++){
		if((user.learn_mode.dont_show[k].split(":"))[0]==word_to_recover){
			delete user.learn_mode.dont_show[k];
		}
		if((user_dontshow_arr[k].split(":"))[0]==word_to_recover){
			delete user_dontshow_arr[k];
		}	
		
	}
	
	user.learn_mode.dont_show=user.learn_mode.dont_show.filter(function(e){return e}); 
	user_dontshow_arr=user_dontshow_arr.filter(function(e){return e});
	show_words_def("words_dontshow", "words_learned", user_dontshow_arr);
}


function show_card(word_to_show){
	var card=[];
	for(var i=0;i<card_info_arr.length;i++){
		var card_info=card_info_arr[i].split(":");
		if(card_info[0]==word_to_show){
			for (var j=0; j<5;j++){
				card[j]=card_info[j];
			}
			break;
		}
	}
	document.getElementById("card-word").innerHTML= card[0];
	document.getElementById("card-img").src = "voc_data/"+card[0]+".png";
	document.getElementById("card-chara").innerHTML= card[2];
	document.getElementById("def").innerHTML= card[3];
	document.getElementById("eg").innerHTML= card[1];
	document.getElementById("syn").innerHTML= card[4];	
	table_container.style.display = "none";
	card_container.style.display = "flex";
}


function back_to_table(){
	card_container.style.display = "none";
	dash_container.style.display = "none";
	table_container.style.display = "flex";
}


function go_home(){
	window.location.href="../index.html";
}


function go_back(){
	location.reload();
}


function save_progress(){
	//var user_info = JSON.stringify(user);
	//localStorage.setItem("testJSON", user_info);
	//window.location = "../php/save_userInfo.php?user=" + user_info;
	users[user_index]=JSON.stringify(user);
	user=users;
	loadXMLDoc("php/save_userInfo.php","user=");
	return "All your progress is saved";
}


function reset_progress(){
	if(confirm("Confirm to delete all your learning and testing records so far.")==true){
		user.learn_mode=new Learned_mode([],[]);
		user.test_mode=new Test_mode(0);
		save_progress();
		location.reload();	
	}
}


function sleep(ms) {
     for(var t = Date.now();Date.now() - t <= ms;);
}


/* for ranking */
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
	xmlhttp.open("POST", 'ranking/php/ranking_php.php',true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var postdata="username="+userName;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   var textString = xmlhttp.responseText;
		   var usersList= textString.split(',');
		   showRank(usersList,userName);
		}
	};	
	xmlhttp.send(postdata);
}



function showRank(usersList,userName) {
	var rankElement = document.getElementById('rank');
	var scoreList = [];
	for (var i=0; i < usersList.length; i++) {
		var userList = usersList[i].split(':');
		
		var username = userList[0];
		var score = userList[1];
		
		var checkSameScore = scoreList.includes(score);
		if (checkSameScore) {
			if (userName === username) {
				rankElement.innerHTML = i;
			}
		}
		else {
			if (userName === username) {
				rankElement.innerHTML = i+1;
			}
			scoreList.push(score);
		}
	}
}