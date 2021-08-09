var question=[];
var answer=[];
var card_info_arr;
var path="";
var user;
var question_container;
var card_container;
var question_answer_arr;
var question_answer_arr_static;
var learned_index=0;
var dont_show_index=0;
var users;
var user_index=0;

window.onload = function (){
	question_container=document.getElementById("question-container");
	card_container=document.getElementById("card-container");
	var unit_to_learn=localStorage.getItem("unit_to_learn");
	//var user_progress_arr = new Array("questions");
	var learn_mode = new Learned_mode([],[]);
	var test_mode = new Test_mode(0);
	var user_email=localStorage.getItem("email");
	var user_name=localStorage.getItem("username");
	
	user = new User(user_name, "l123456", user_email, "cards", learn_mode, test_mode);
	loadXMLDoc("../php/vocabulary_tutor.php","data_requested=");
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

function pic_click(user_choice){
	if(user_choice==path[3]){
		document.getElementById("check"+user_choice).style.display = "block";
		
		setTimeout(function(){
			document.getElementById("check"+user_choice).style.display = "none";
			show_card(answer);
			question_container.style.display = "none";
			card_container.style.display = "flex";
		},700);
		
	}
	else{
		document.getElementById("cross"+user_choice).style.display = "block";
		setTimeout(function(){
			document.getElementById("cross"+user_choice).style.display = "none";
		},1000);
		
	}
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
			console.log(xmlhttp.responseText);
			data=xmlhttp.responseText.split("^")[0];
			
			users=(xmlhttp.responseText.split("^")[1]).split("|");
			users.splice(0,1);
			
			question_answer_arr=data.split("|");
			question_answer_arr.splice(0,1);
			
			question_answer_arr_static=data.split("|");
			question_answer_arr_static.splice(0,1);
			handle_data();//data requested		
		}
	}
	xmlhttp.open("POST", php_link, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(php_var+JSON.stringify(user));
}

function handle_data(){	
	for (var i=0; i<users.length; i++){
		if(JSON.parse(users[i]).email==user.email){
			user=JSON.parse(users[i]);
			user_index=i;
			break;
		}
	}
	
	learned_index=user.learn_mode.learned_words.length;
	dont_show_index=user.learn_mode.dont_show.length;
	for (var i=0; i<question_answer_arr.length; i++){
		var word=(question_answer_arr[i].split(":"))[0];
		
		for (var j=0; j<user.learn_mode.learned_words.length; j++){
			if(user.learn_mode.learned_words[j]==word){
				delete question_answer_arr[i];
			}
		}
		
		for (var k=0; k<user.learn_mode.dont_show.length; k++){
			if(user.learn_mode.dont_show[k]==word){
				delete question_answer_arr[i];
			}
		}
	}
	question_answer_arr = question_answer_arr.filter(function(e){return e}); 
	
	if(user.request=="cards"){
		card_info_arr=data.split("|");
		show_qustion();
	}
}

function show_qustion(){
	document.getElementById("words-remained").innerHTML = "words left: "+question_answer_arr.length;
	
	if(question_answer_arr.length==0){
		alert("finished");
		window.location.href="../index_voctutotor.html";
	}
	
	question_answer_arr.sort(function() {
		return .5 - Math.random();
	});
	
	question_answer_arr_static.sort(function() {
		return .5 - Math.random();
	});
	
	//console.log(question_answer_arr_static);
	answer=(question_answer_arr[0].split(":"))[0];
	question=(question_answer_arr[0].split(":"))[1];
	
	document.getElementById("question").innerHTML = question;
	path="pic"+(Math.floor(Math.random()*4)+1);
	document.getElementById(path).src = "../voc_data/"+answer+".png";
	question_answer_arr.splice(0,1);
	
	for(var i=1;i<5;i++){
		
		var word=(question_answer_arr_static[i].split(":")[0]);

		if(word.trim()==answer.trim()){
			word=(question_answer_arr_static[6].split(":")[0]);
		}
		
		if(i!=path[3] && word!="null"){
			document.getElementById("pic"+i).src = "../voc_data/"+word+".png";
		}
		
	}
}

function show_card(word_to_show){
	var card_arr=[];
	for(var i=0;i<card_info_arr.length;i++){
		var card_info=card_info_arr[i].split(":");
		if(card_info[0]==word_to_show){
			for (var j=0; j<5;j++){
				card_arr[j]=card_info[j];
			}
			break;
		}
	}
	document.getElementById("card-word").innerHTML= card_arr[0];
	document.getElementById("card-img").src = "../voc_data/"+card_arr[0]+".png";
	document.getElementById("card-chara").innerHTML= card_arr[2];
	document.getElementById("def").innerHTML= card_arr[3];
	document.getElementById("eg").innerHTML= card_arr[1];
	document.getElementById("syn").innerHTML= card_arr[4];	
}

function new_question_click(){
	user.learn_mode.learned_words[learned_index]=answer;
	learned_index++;
	show_qustion();
	question_container.style.display = "flex";
	card_container.style.display = "none";
}

function dont_show(){
	user.learn_mode.dont_show[dont_show_index]=answer;
	dont_show_index++;
	show_qustion();
	question_container.style.display = "flex";
	card_container.style.display = "none";
}

function go_home(){
	window.location.href="../index_voctutotor.html";
}

function save_progress(){
	//var user_info = JSON.stringify(user);
	//localStorage.setItem("testJSON", user_info);
	//window.location = "../php/save_userInfo.php?user=" + user_info;
	users[user_index]=JSON.stringify(user);
	user=users;
	loadXMLDoc("../php/save_userInfo.php","user=");
	return "All your progress is saved";
}

function sleep(ms) {
     for(var t = Date.now();Date.now() - t <= ms;);
}

