var slideIndex = 1;
var overall_column_index=0;

//listen to the exit button
function exit_slide(slide_num) {
	slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("demo");
	for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
	}
    slides[slide_num-1].style.display = "none";
    slideIndex = 1;
	overall_column_index=0;
}

//when user click one course box
function currentSlide(n) {
  overall_column_index=n-1;
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
   
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  
  //make the opacity 0.9
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  
  //Show detailed info
  slides[slideIndex-1].style.display = "block";
  
  //set to be active, opacity 1
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