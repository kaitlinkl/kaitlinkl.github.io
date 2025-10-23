let dogBtn = document.querySelector("#js-new-quote").addEventListener('click', newDog);

let current = {
    imageUrl: "",
}

const endpoint = "https://dog.ceo/api/breeds/image/random";

async function newDog() {
   // console.log("Success");

   try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        //console.log(json);
        displayDogImage(json["message"]);
        current.question = json["question"];
        //console.log(current.question);
        //console.log(current.answer);
   } catch (error) {
       console.error(error);
       alert('Failed to get new dog image');
   }
}


function displayDogImage(imageUrl) {
    const imageContainer = document.querySelector("#js-quote-text");
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Random Dog" />`;
}

newDog();