var slideIndex = 1;
var overall_column_index=0;
var col_stored_check=1;
var plus_cur=0;
var first_time_check=1;

//initialize the scroll control
scrollRow(0);

//listen to the exit button
function exit_slide(slide_num) {
	slides = document.getElementsByClassName("mySlides");
    slides[slide_num-1].style.display = "none";
    slideIndex = 1;
	overall_column_index=0;
	col_stored_check=1;
	plus_cur=0;
	first_time_check=1;
    
	//initialize the scroll control
	scrollRow(0);
}

//when user click one course box
function currentSlide(n) {
  overall_column_index=n-1;
  scrollRow(0);
  showSlides(slideIndex = n);
}

//when user click next or prev icons
function plusSlides(n) {
  scrollRow(n);
  showSlides(slideIndex += n);
}

//To show the big detailed info slides
function showSlides(n=1) {
  var i;
  var overall_column_index=1;
  var row_store_check=1;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var next_icon=document.getElementsByClassName("next");
  
  if(first_time_check){
  	 next_icon[0].style.display = "block";
    first_time_check=0;
  }
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  
  //Show detailed info
  slides[slideIndex-1].style.display = "block";
  
  //set to be active
  dots[slideIndex-1].className += " active";
  
}

//Limit to show 6 coulums in a row
function hide_extra_columns(){
	var course_box = document.getElementsByClassName("column");
    if(course_box.length>6){
    	for(var i=6; i<course_box.length; i++){
        	course_box[i].style.display = "none";
        }
    }
    
}

//For row scrolling control
function scrollRow(colIndex){
  //get all classes needed
  var course_box = document.getElementsByClassName("box_column");
  var row_scroll = document.getElementsByClassName("row");
  var next_icon=document.getElementsByClassName("next");
  var pre_icon=document.getElementsByClassName("prev");
  var column_index=1;
  
  //show both pre and next icons by default
  next_icon[0].style.display = "block";
  pre_icon[0].style.display = "block";
  
  
  //when user press next icon
  if(colIndex==1){
    if((overall_column_index!=0)&&(overall_column_index%5==0)&&(overall_column_index<course_box.length)){
       row_scroll[0].scrollLeft = 230;
    }
    overall_column_index++;
  }
  
  //when user press pre icon
  if(colIndex==-1) {
  	if(course_box.length-overall_column_index==6){
    	row_scroll[0].scrollLeft = -230;
    }
  	overall_column_index--;
  }
  
  //For hiding next or pre icons
  if(overall_column_index==course_box.length-1){
	
    next_icon[0].style.display = "none";
  }
 
  if(overall_column_index==0){
    pre_icon[0].style.display = "none";
  }
  
  if(first_time_check){
  	 next_icon[0].style.display = "none";
  }
  
  
  /* If it needs to be recursive, uncoment the code
        if(overall_column_index==course_box.length){
        	for(var i=0; i<course_box.length; i++){
            	if(i<6){
            		course_box[i].style.display = "block";
                }

                else{
                	course_box[i].style.display = "none";
                }
            }
            overall_column_index=0;
        }
        */
}