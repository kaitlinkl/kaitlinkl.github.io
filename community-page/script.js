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
let modalImages = {};
let currentModalIndex = 0;
let slideindex = 1;
showSlides(slideindex);

function plusSlides(n) {
  showSlides(slideindex += n);
}

function currentSlide(n) {
  showSlides(slideindex = n);
}

// Enlarge image on click

document.querySelectorAll('.grid-img').forEach(img => {
  img.addEventListener('click', function() {
    // Find the parent gallery of the clicked image
    const activeGallery = this.closest('.cantoI-gallery.active, .cantoII-gallery.active, .cantoIII-gallery.active, .cantoIV-gallery.active, .cantoV-gallery.active, .cantoVI-gallery.active, .cantoVII-gallery.active, .cantoVIII-gallery.active');
    if (!activeGallery) return;

    // Get all images in the active gallery
    modalImages = Array.from(activeGallery.querySelectorAll('.grid-img'));
    currentModalIndex = modalImages.indexOf(this);

    showModalImage(currentModalIndex);
    document.getElementById('img-modal').style.display = 'flex';
  });
});

function showModalImage(index) {
  const modalImg = document.getElementById('img-modal-img');
  modalImg.src = modalImages[index].src;
}

// Close modal when clicking the close button or outside the image
document.querySelector('.img-modal-close').onclick = function() {
  document.getElementById('img-modal').style.display = 'none';
};
document.getElementById('img-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
function showModalImage(index) {
  const modalImg = document.getElementById('img-modal-img');
  modalImg.src = modalImages[index].src;
}
// Previous/Next buttons
document.querySelector('.img-modal-next').onclick = function(e) {
  e.stopPropagation();
  if (modalImages.length === 0) return;
  currentModalIndex = (currentModalIndex + 1) % modalImages.length;
  showModalImage(currentModalIndex);
};

document.querySelector('.img-modal-prev').onclick = function(e) {
  e.stopPropagation();
  if (modalImages.length === 0) return;
  currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
  showModalImage(currentModalIndex);
};

// Show slides and corresponding galleries

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

  function showGalleryForSlide(slideIndex) {
  document.querySelectorAll('.canto-gallery').forEach(gallery => {
    gallery.classList.remove('active');
  });
  const galleryToShow = document.querySelector(`.canto${slideIndex}-gallery`);
  if (galleryToShow) galleryToShow.classList.add('active');
}
  // Hide all galleries
  let galleries = document.querySelectorAll('.cantoI-gallery, .cantoII-gallery, .cantoIII-gallery, .cantoIV-gallery, .cantoV-gallery, .cantoVI-gallery, .cantoVII-gallery, .cantoVIII-gallery');
  galleries.forEach(gallery => gallery.classList.remove('active'));

  function showGalleryForSlide(slideIndex) {
  document.querySelectorAll('.canto-gallery').forEach(gallery => {
    gallery.classList.remove('active');
  });
  const galleryToShow = document.querySelector(`.canto${slideIndex}-gallery`);
  if (galleryToShow) galleryToShow.classList.add('active');
}
  // Show the gallery for the current slide
  if (slideindex === 1) {
    document.querySelector('.cantoI-gallery').classList.add('active');
  } else if (slideindex === 2) {
    document.querySelector('.cantoII-gallery').classList.add('active');
  } else if (slideindex === 3) {
    document.querySelector('.cantoIII-gallery').classList.add('active');
  } else if (slideindex === 4) {
    document.querySelector('.cantoIV-gallery').classList.add('active');
  } else if (slideindex === 5) {
    document.querySelector('.cantoV-gallery').classList.add('active');
  } else if (slideindex === 6) {
    document.querySelector('.cantoVI-gallery').classList.add('active');
  } else if (slideindex === 7) {
    document.querySelector('.cantoVII-gallery').classList.add('active');
  } else if (slideindex === 8) {
    document.querySelector('.cantoVIII-gallery').classList.add('active');
  }
}
// end of cantos page stuff