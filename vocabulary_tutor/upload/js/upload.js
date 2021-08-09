 var wordCombination; 
 var wordElement,definitionElement,exampleElement,synonymsElement;
 
 
 /*** for image preview ***/
 function previewImage(img) {
	var imageElement = document.getElementById("image");
	var messageElement = document.getElementById("message");
	if (imageElement.value !== "") {
		messageElement.innerHTML = "";
	}
	var imgPreviewElement = document.getElementById("preview");
	preview.style.display = "inline";
	if (img.files && img.files[0]) {
		var fileReader = new FileReader();
		var previewImgElement = document.getElementById("preview");
		fileReader.onload = function (e) {
			previewImgElement.setAttribute("src",e.target.result);
		}
		fileReader.readAsDataURL(img.files[0]);
	}
}

function uploadProcessing() {
	wordElement = document.getElementById("word");
	definitionElement = document.getElementById("definition");
	exampleElement = document.getElementById("example");
	synonymsElement = document.getElementById("synonyms");
	
	var imageElement = document.getElementById("image");
	var messageElement = document.getElementById("message");
	var partsOfSpeechSelectionElement = document.getElementById("partsOfSpeechSelection");
	
	inputProcessing();
		
	if (wordElement.value.length === 0 || definitionElement.value.length === 0 || exampleElement.value.length === 0 || synonymsElement.value.length === 0) {
		return;
	}
	else if (imageElement.value === "") {
		messageElement.innerHTML = "Please choose an image for the word";
	}
	else {
		combinationInput(wordElement.value,exampleElement.value,partsOfSpeechSelectionElement.value,definitionElement.value,synonymsElement.value);
	}
	
}

function inputProcessing() {
	var wordElement = document.getElementById("word");
	var definitionElement = document.getElementById("definition");
	var exampleElement = document.getElementById("example");
	var synonymsElement = document.getElementById("synonyms");
	
	if (wordElement.value.length === 0){
		wordElement.style.border = "1px solid red";
	}
	else {
		wordElement.style.border = "1px solid black";
	}
	
	if (definitionElement.value.length === 0) {
		definitionElement.style.border = "1px solid red";
	}
	else {
		definitionElement.style.border = "1px solid black";
	}
	
	if (exampleElement.value.length === 0) {
		exampleElement.style.border = "1px solid red";
	}
	else {
		exampleElement.style.border = "1px solid black";
	}
	
	if (synonymsElement.value.length === 0) {
		synonymsElement.style.border = "1px solid red";
	}
	else {
		synonymsElement.style.border = "1px solid black";
	}
}

function combinationInput(word,example,partsOfSpeech,definition,synonyms) {
	wordCombination = word+":"+example+":"+partsOfSpeech+":"+definition+":"+synonyms;
	console.log(wordCombination);
	
	/*** load image ***/
	loadImage(word,wordCombination);
	
}

function loadImage(word,wordCombination) {
	const url = 'php/upload_image.php';

	const imgFile = document.getElementById("image").files[0];
	const fileName = imgFile['name'];
	var fileNameArray = fileName.split(".");
	var imgName = fileNameArray[0];
	var fileType = fileNameArray[1];
	fileType = fileType.toLowerCase();
	
	var messageElement = document.getElementById("message");
	
	console.log(imgName+":"+word);
	
	/*
	if (fileType === "jpg" || fileType === "jpeg" || fileType === "png" || fileType === "gif") {
		messageElement.innerHTML = "";
	}
	else {
		messageElement.innerHTML = "Not supported type! Accepted types: jpg,jpeg,png,gif";
		return;
	}
	*/
	
	if (fileType === "png") {
		messageElement.innerHTML = "";
	}
	else {
		messageElement.innerHTML = "Not supported type! Accepted types: png";
		return;
	}

	if (imgName === word) {
		messageElement.innerHTML = "";
	}	
	else {
		messageElement.innerHTML = "Please make sure the image name is the same as the name of word.";
		return;
	}
	
	const formData = new FormData();

	formData.append('files', imgFile);

	fetch(url, {
			method: 'POST',
			body: formData
		}).then(response => {
			console.log(response);
			if (response.status === 200) {
				/*** loading data ***/
				loadData(wordCombination);
			}
	});
	
}

function loadData(wordCombination) {
	//console.log("success");
	var xmlhttp;
	if (window.XMLHttpRequest){
		//  IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else{
		// IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("POST", 'php/upload.php',true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var postdata="word_combination="+wordCombination;
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert(xmlhttp.responseText);
			resetInputFields();
		}
	};	
	xmlhttp.send(postdata);
}

function resetInputFields() {
	wordElement.value = "";
	definitionElement.value = "";
	exampleElement.value = "";
	synonymsElement.value = "";
}

function goHome(){
	window.location.href="../index_voctutotor.html";
}