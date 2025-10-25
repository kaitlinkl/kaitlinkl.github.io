let dogBtn = document.querySelector("#js-new-quote").addEventListener('click', newDog);

const endpoint = "https://dog.ceo/api/breeds/image/random";

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}


function toggleFavorite(imageUrl) {
    let favorites = getFavorites();
    const index = favorites.indexOf(imageUrl);
    if (index === -1) {
        favorites.push(imageUrl);
    } else {
        favorites.splice(index, 1);
    }
    saveFavorites(favorites);
    favoritedDogs();
}

function displayDogImage(imageUrl) {
    const imageContainer = document.querySelector("#js-quote-text");
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Random Dog" />`;

    const favoriteButton = document.getElementById('js-tweet');
    const favorites = getFavorites();

    

    if (favorites.includes(imageUrl)) {
        favoriteButton.textContent = 'Unfavorite';
    } else {
        favoriteButton.textContent = 'Favorite';
    }

    favoriteButton.onclick = () => {
        toggleFavorite(imageUrl);
        const favorites = getFavorites();
        if (favorites.includes(imageUrl)) {
            favoriteButton.textContent = 'Unfavorite';
        } else {
            favoriteButton.textContent = 'Favorite';
        }
    };
}

async function newDog() {
   // console.log("Success");

   try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log("Fetched data:", json);
        displayDogImage(json["message"]);
        //console.log(current.question);
        //console.log(current.answer);
   } catch (error) {
       console.error(error);
       alert('Failed to get new dog image');
   }
}

newDog();


function favoritedDogs() {
    const favorites = getFavorites();
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';

    favorites.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = "Favorited Dog";
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.margin = "5px";
        img.style.cursor = "pointer";

        favoritesContainer.appendChild(img);
    });

document.getElementById('js-show-favorites').onclick = () => {
    const favoritesContainer = document.getElementById('favorites-container');
    if (favoritesContainer.style.display === "none") {
        favoritesContainer.style.display = "block";
        favoritedDogs();
    } else {
        favoritesContainer.style.display = "none";
    }
};
}
favoritedDogs();