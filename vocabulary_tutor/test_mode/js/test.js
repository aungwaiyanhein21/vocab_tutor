var question=[];
var answer=[];
var card_info_arr;
var path="";
var user;
var question_container;
var card_container;
var maxtime; //time limit

var data;
var question_answer_arr;
var question_answer_arr_static;
var learned_index=0;
var dont_show_index=0;
var users;
var user_index=0;

var words_learned_and_dont_show_words = [];
var question_words_arr = [];
var question_words_arr_temp = [];
var answers_def_arr = [];
var question_answer_dic = {};
var choice_random = [];
var real_answer;
var real_question;
//var removed_word;
//var percentage_correct = 0;
var number_of_correct_answers = 0;

var number_of_current_questions = 1 ;
var finished_text_element;
	
/* not working as intended 
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'Your score will not be saved.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE

    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
*/

window.onload = function (){
	var user_email=localStorage.getItem("email");
	var user_name=localStorage.getItem("username");
	if(user_name == null || user_email == null){
		window.location.href="../../login/login.html";
	}
	
	finished_text_element = document.getElementById('finished_text');
	
	question_container=document.getElementById("test1-container");
	card_container=document.getElementById("card-container");
	var unit_to_learn=localStorage.getItem("unit_to_learn");
	//var user_progress_arr = new Array("questions");
	var learn_mode = new Learned_mode([],[]);
	var test_mode = new Test_mode(0);
	
	
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
			//console.log(xmlhttp.responseText);
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
		var word=(question_answer_arr[i].split(":"))[0];  //word eg.steadfast
		//console.log(word);
		
		for (var j=0; j<user.learn_mode.learned_words.length; j++){
			if(user.learn_mode.learned_words[j]==word){
				//console.log("words: "+(question_answer_arr[i]));
				//console.log("Learned def: "+(question_answer_arr[i].split(":"))[0]);
				
				question_words_arr.push((question_answer_arr[i].split(":"))[0]);
				question_words_arr_temp.push((question_answer_arr[i].split(":"))[0]);
				
				answers_def_arr.push((question_answer_arr[i].split(":"))[3]);

			}
		}
		
		for (var k=0; k < user.learn_mode.dont_show.length; k++){
			if(user.learn_mode.dont_show[k]==word){
				//console.log("no show words: "+question_answer_arr[i]);
				
				question_words_arr.push((question_answer_arr[i].split(":"))[0]);
				question_words_arr_temp.push((question_answer_arr[i].split(":"))[0]);
				
				answers_def_arr.push((question_answer_arr[i].split(":"))[3]);
			}
		}
		//console.log(question_words_arr);
		//console.log(answers_def_arr);
	}
	
	
	for (var i=0; i < question_words_arr.length; i++){
		question_answer_dic[question_words_arr[i]] = answers_def_arr[i];
	}
	//console.log(question_answer_dic);
	
	maxtime = 60*(question_words_arr.length); //setting max time based on number of questions
	
	if(user.request=="cards"){
		card_info_arr=data.split("|");
		show_question();
		show_progress_table();
		show_progress(2);
	}
	
	//show_question();
}

function show_question(){
	//document.getElementById("words-remained").innerHTML = "words left: "+question_answer_arr.length;
	
	if (question_words_arr.length === 0) {
		finished_text_element.innerHTML = "You haven't learned yet!";
		setTimeout(function(){
			window.location ="../index_voctutotor.html";
		},700);
		//alert("You haven't learned yet");
		
	}
	else if(question_words_arr.length > 0 && question_words_arr.length < 4) {
		finished_text_element.innerHTML = "You have learnt less than 4 words. Keep on learning!";
		setTimeout(function(){
			window.location ="../index_voctutotor.html";
		},700);
	}
	else if(question_words_arr_temp.length === 0){
		user.test_mode.max_scores=number_of_correct_answers;
		save_progress();
		finished_text_element.innerHTML = "Finished!\nTotal score: "+number_of_correct_answers;
		setTimeout(function(){
			window.location ="../index_voctutotor.html";
		},700);
		//alert("finished");
		//percentage_correct = (number_of_correct_answers/question_words_arr.length)*100;
		
		
		//alert("Total score: "+number_of_correct_answers);
		//alert("Percentage: "+percentage_correct+"%");
		//window.location ="../index_voctutotor.html";
	}
	else {
		question_words_arr.sort(function() {
			return 0.5 - Math.random();
		});
		//console.log("question_words_arr: "+question_words_arr);
		
		question_words_arr_temp.sort(function(){
			return 0.5 - Math.random(); 
		});
		//console.log("question_words_arr_temp: "+question_words_arr_temp);
		
		if (choice_random.length === 0) {
			for (var i = 1; i < 5; i++) {
				choice_random.push(i);
			}
		}
		
		choice_random.sort(function() {
			return 0.5 - Math.random();
		});
		//console.log(choice_random);
		
		document.getElementById("question").innerHTML =  question_words_arr_temp[0];
		real_question = question_words_arr_temp[0];
		var indexOfQuestionWord = question_words_arr.indexOf(real_question);
		real_answer = question_answer_dic[question_words_arr[indexOfQuestionWord]];
		
		var answers = [];
		for (var i = 0; i < 4; i++) {
			var choicesElement = document.getElementById("choice"+choice_random[i]);
			if (answers.length === 0) {
				answers.push(question_answer_dic[question_words_arr[indexOfQuestionWord]]);
				choicesElement.innerHTML = question_answer_dic[question_words_arr[indexOfQuestionWord]];
				//console.log(choicesElement.innerHTML);
			}
			else {
				var isUsed;
				while (answers.indexOf(question_answer_dic[question_words_arr[indexOfQuestionWord]]) !== -1) {
					question_words_arr.sort(function(){
						return 0.5 - Math.random(); 
					});
				}
				answers.push(question_answer_dic[question_words_arr[indexOfQuestionWord]]);
				choicesElement.innerHTML = question_answer_dic[question_words_arr[indexOfQuestionWord]];
				
			}
		}	
	}
}


function choice_click(user_choice) {
	var choiceElement = document.getElementById("choice"+user_choice);
	if (choiceElement.innerHTML === real_answer) {
		choiceElement.style.color = "green";
		setTimeout(function(){
			choiceElement.style.color = "#666666";
			
			//alert("correct");
			number_of_correct_answers ++;
			show_progress(1);
			removeTestedWord();
			//console.log("Question words: "+question_words_arr_temp);
			next_question();
		},700);
		
		
	}
	else {
		choiceElement.style.color = "red";
		//document.getElementById("choice"+user_choice).style.backgroundColor = "red";
		setTimeout(function() {
			choiceElement.style.color = "#666666";
			
			//alert("incorrect");
			show_progress(0);
			removeTestedWord();
			//console.log("Question words: "+question_words_arr_temp);
			
			show_card(real_question);
			question_container.style.display = "none";
			card_container.style.display = "flex";
		},700);
		
		
	}
}


function next_question() {
	if (question_words_arr_temp.length !== 0) {
		number_of_current_questions++;
		show_progress(2);
	}
	show_question();
	
}

function removeTestedWord() {
	var index = question_words_arr_temp.indexOf(real_question);
	
    if (index !== -1) {
        question_words_arr_temp.splice(index, 1);
    }
	//question_words_arr_temp.splice(question_words_arr_temp.indexOf(real_answer),1);
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
	removeTestedWord();
	if (question_words_arr_temp.length !== 0) {
		number_of_current_questions++;
		show_progress(2);
	}
	show_question();
	question_container.style.display = "flex";
	card_container.style.display = "none";
}

function CountDown() {
	if (maxtime >= 0) {
		minutes = Math.floor(maxtime / 60);
		seconds = Math.floor(maxtime % 60);
		if (seconds<10) seconds="0"+seconds;
		msg = minutes + ":" + seconds;
		document.all["timer"].innerHTML = msg;
		if (maxtime == 1 * 60)alert("1 minute remaining");
			--maxtime;
	} 
	else{
		clearInterval(timer);
		alert("Time is up");
		//percentage_correct = (number_of_correct_answers/question_words_arr.length)*100;
		user.test_mode.max_scores=number_of_correct_answers;
		save_progress();
		finished_text_element.innerHTML = "Total score: "+number_of_correct_answers;
		setTimeout(function(){
			window.location ="../index_voctutotor.html";
		},700);
		//alert("Total score: "+number_of_correct_answers);
		//alert("Percentage: "+percentage_correct);
		//window.location.href="../index_voctutotor.html";
	}
}

timer = setInterval("CountDown()", 1000);

function go_home(){
	window.location.href="../index_voctutotor.html";
}

/* Table */
function show_progress_table(){
	var noOfQuestions = 1;
	var table=document.getElementById("progress_table");
	var row;
	var cell;
	for (var i=0; i < question_words_arr.length/5; i++) {
		row = table.insertRow(i);
		for (var j=1;j <= 5;j++) {
			if (!(noOfQuestions === question_words_arr.length+1)) {
				cell = row.insertCell(j-1);
				cell.innerHTML = noOfQuestions;
				cell.style.backgroundColor = "lightBlue";
				cell.setAttribute("id","question"+noOfQuestions);
				
				noOfQuestions++;
			}
		}
	}	
}

function show_progress(num) {
	var trElement = document.getElementById("question"+number_of_current_questions);
	if (num === 0) { //for incorrect questions
		trElement.style.backgroundColor = "red";
	}
	else if(num === 1) { //for correct questions
		trElement.style.backgroundColor = "green";
	}
	else if(num === 2) { //for current question
		trElement.style.backgroundColor = "navy";
	}
	trElement.style.color ="white";
	//trElement.style.color = "white";
}

function save_progress(){
	users[user_index]=JSON.stringify(user);
	user=users;
	loadXMLDoc("../php/save_userInfo.php","user=");
	return "All your progress is saved";
}


