const accessKey = "Q-uBxW8Cn4q_FlUcUDCXlKUGsA7JC3fRmCn6X42U30M";

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResults = document.getElementById('search-results');
const showMoreButton = document.getElementById('show-more-button');

let keyword = '';
let page = 1;


async function searchImages() {
    if (page === 1) {
        searchResults.innerHTML = '';
    }
    keyword = searchBox.value.trim();
    if (!keyword) return; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(keyword)}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    
    const results = data.results || [];


    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || '';
        image.className = 'result-thumb';
        image.addEventListener('click', () => {
            openOverlay(result.urls.regular || result.urls.full || result.urls.small);
        });

        searchResults.appendChild(image);
    });

    showMoreButton.style.display = 'block';
}


function openOverlay(src) {
    const overlay = document.getElementById('image-overlay');
    const enlarged = document.getElementById('enlarged-image');
    if (!overlay || !enlarged) return;
    enlarged.src = src;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeOverlay() {
    const overlay = document.getElementById('image-overlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    document.getElementById('enlarged-image').src = '';
    document.body.style.overflow = '';
}


document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('image-overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target.id === 'image-overlay' || e.target.id === 'close-overlay') {
                closeOverlay();
            }
        });
    }
});


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener('click', () => {
    page++;
    searchImages();
});

// Get the button:
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
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}