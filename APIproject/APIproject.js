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
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per-page=12`;

    const response = await fetch(url);
    const data = await response.json();
    
    const results = data.results;

    results.map ((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResults.appendChild(imageLink);
    })
    showMoreButton.style.display = 'block';
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener('click', () => {
    page++;
    searchImages();
});