function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// button appear when scrolling down
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// cantos page stuff 
let slideindex = 1;
showSlides(slideindex);

function plusSlides(n) {
  showSlides(slideindex += n);
}

function currentSlide(n) {
  showSlides(slideindex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("canto-slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideindex = 1}    
  if (n < 1) {slideindex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideindex-1].style.display = "block";  
  dots[slideindex-1].className += " active";
}
// end of cantos page stuff