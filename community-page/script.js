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



// Save language choice
function setLanguage(lang) {
    localStorage.setItem('userLanguage', lang);
    // Update page content based on language
}

// Load on page visit
const userLang = localStorage.getItem('userLanguage') || 'en';

// cantos page stuff 
let modalImages = [];
let currentModalIndex = 0;
let slideindex = 1;
let showingFavorites = false;
showSlides(slideindex);

function plusSlides(n) {
  showSlides(slideindex += n);
}

function currentSlide(n) {
  showSlides(slideindex = n);
}
function filterGallery() {
  // Find the currently active canto gallery
  const activeGallery = document.querySelector(
    '.cantoI-gallery.active, .cantoII-gallery.active, .cantoIII-gallery.active, .cantoIV-gallery.active, .cantoV-gallery.active, .cantoVI-gallery.active, .cantoVII-gallery.active, .cantoVIII-gallery.active'
  );
  if (!activeGallery) return;

  const favs = getFavorites();
  activeGallery.querySelectorAll('.grid-img').forEach(img => {
    if (showingFavorites) {
      img.parentElement.style.display = favs.includes(img.src) ? "" : "none";
    } else {
      img.parentElement.style.display = "";
    }
  });
}
function getFavorites() {
    const favs = localStorage.getItem('favoriteImages');
    return favs ? JSON.parse(favs) : [];
}

function setFavorites(favs) {
    localStorage.setItem('favoriteImages', JSON.stringify(favs));
}

window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.canto-gallery .grid-img').forEach(img => {
        // Only wrap if not already wrapped
        if (img.parentElement.classList.contains('gallery-item')) return;

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-item';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'block';

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        // Create favorite button
        const btn = document.createElement('button');
        btn.className = 'favorite-btn';
        btn.title = 'Favorite';
        btn.innerHTML = '♥';

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const imgSrc = img.src;
            let favs = getFavorites();
            if (favs.includes(imgSrc)) {
                favs = favs.filter(f => f !== imgSrc);
                btn.classList.remove('favorited');
            } else {
                favs.push(imgSrc);
                btn.classList.add('favorited');
            }
            setFavorites(favs);
            filterGallery(); // update view immediately
        });

        // Set initial state
        const favs = getFavorites();
        if (favs.includes(img.src)) {
            btn.classList.add('favorited');
        }

        wrapper.appendChild(btn);

        // Attach modal/enlarge click handler HERE, after wrapping
        img.addEventListener('click', function() {
            const activeGallery = img.closest('.cantoI-gallery.active, .cantoII-gallery.active, .cantoIII-gallery.active, .cantoIV-gallery.active, .cantoV-gallery.active, .cantoVI-gallery.active, .cantoVII-gallery.active, .cantoVIII-gallery.active');
            if (!activeGallery) return;

            const allImages = Array.from(activeGallery.querySelectorAll('.grid-img'));
            const favs = getFavorites();

            if (typeof showingFavorites !== "undefined" && showingFavorites) {
                modalImages = allImages.filter(i => favs.includes(i.src));
                if (!favs.includes(img.src)) return;
                currentModalIndex = modalImages.indexOf(img);
            } else {
                modalImages = allImages;
                currentModalIndex = modalImages.indexOf(img);
            }

            showModalImage(currentModalIndex);
            document.getElementById('img-modal').style.display = 'flex';
        });
    });
});
function showModalImage(index) {
  if (!modalImages.length) return;
  document.getElementById('img-modal-img').src = modalImages[index].src;
}
// Close modal when clicking the close button or outside the image
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('img-modal');
  if (!modal) return;
  modal.querySelector('.img-modal-close').onclick = function() {
    modal.style.display = 'none';
  };
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };
});

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggle-favorites-btn');
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', function() {
    showingFavorites = !showingFavorites;
    toggleBtn.textContent = showingFavorites ? "Show All Images" : "Show Favorites Only";
    filterGallery();

    // --- Update modalImages if modal is open ---
    const modal = document.getElementById('img-modal');
    if (modal && modal.style.display === 'flex') {
      // Find the active gallery and all images
      const activeGallery = document.querySelector(
        '.cantoI-gallery.active, .cantoII-gallery.active, .cantoIII-gallery.active, .cantoIV-gallery.active, .cantoV-gallery.active, .cantoVI-gallery.active, .cantoVII-gallery.active, .cantoVIII-gallery.active'
      );
      if (activeGallery) {
        const allImages = Array.from(activeGallery.querySelectorAll('.grid-img'));
        const favs = getFavorites();
        if (showingFavorites) {
          modalImages = allImages.filter(i => favs.includes(i.src));
        } else {
          modalImages = allImages;
        }
        // If the current image is not in the new modalImages, close modal
        const currentImgSrc = document.getElementById('img-modal-img').src;
        const newIndex = modalImages.findIndex(i => i.src === currentImgSrc);
        if (newIndex === -1) {
          modal.style.display = 'none';
        } else {
          currentModalIndex = newIndex;
          showModalImage(currentModalIndex);
        }
      }
    }
  });
});

function nextModalImage() {
  if (!modalImages.length) return;
  currentModalIndex = (currentModalIndex + 1) % modalImages.length;
  showModalImage(currentModalIndex);
}
function prevModalImage() {
  if (!modalImages.length) return;
  currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
  showModalImage(currentModalIndex);
}

// Also call filterGallery when the slide changes
// For example, in your showSlides() function, add:
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

  // Hide all galleries
  let galleries = document.querySelectorAll('.cantoI-gallery, .cantoII-gallery, .cantoIII-gallery, .cantoIV-gallery, .cantoV-gallery, .cantoVI-gallery, .cantoVII-gallery, .cantoVIII-gallery');
  galleries.forEach(gallery => gallery.classList.remove('active'));

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
  filterGallery();
}


// end of cantos page stuff