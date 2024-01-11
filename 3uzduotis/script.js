const inputDiv = document.createElement("div");
inputDiv.setAttribute("id", "inputDiv");
document.body.append(inputDiv);

const inputContainer = document.getElementById("inputDiv");

const inputElement = inputContainer.appendChild(
  document.createElement("input"),
);
inputElement.className = "input";
inputElement.type = "text";
inputElement.placeholder = "search for art";

const button = document.createElement("button");
button.setAttribute("id", "button");
button.innerText = "show me some art";
inputContainer.append(inputElement, button);

const cardDiv = document.createElement("div");
cardDiv.setAttribute("id", "cardsDiv");
document.body.append(cardDiv);

const cardContainer = document.getElementById("cardsDiv");
cardContainer.setAttribute("class", "cards");

const getInfo = async (event) => {
  event.preventDefault();

  const inputValue = inputElement.value.trim().replace(/[^a-zA-Z0-9\s]/g, "");
  console.log(`paieskoje ivedete: ${inputValue}`);

  const randomizer = Math.floor(Math.random() * 11) + 10;
  const API = `https://openaccess-api.clevelandart.org/api/artworks?limit=${randomizer}&has_image=1&q=${inputValue}`;

  const result = await fetch(API);
  console.log(result);

  const data = await result.json();
  console.log(data);

  const allMovieCards = document.querySelectorAll(".card");
  allMovieCards.forEach((card) => card.remove());

  if (data.data.length === 0) {
    alert("no such painting is found :(");
  } else {
    data.data.map((searchResult) => {
      const card = document.createElement("div");
      card.className = "card";
      cardContainer.append(card);

      const cardImg = document.createElement("img");
      cardImg.className = "paintingImg";
      cardImg.src = searchResult.images.web.url;

      const cardAuthor = document.createElement("h2");
      cardAuthor.className = "paintingAuthor";

      if (searchResult.creators && searchResult.creators.length > 0) {
        cardAuthor.innerText = searchResult.creators[0].description;
      } else {
        cardAuthor.innerText = "Artist is unknown";
      }

      const cardName = document.createElement("h2");
      cardName.className = "paintingName";

      if (searchResult.title && searchResult.title.length > 0) {
        cardName.innerText = searchResult.title;
      } else {
        cardName.innerText = "title of the item is unknown";
      }

      const cardYear = document.createElement("h2");
      cardYear.className = "paintingYear";
      cardYear.innerText = searchResult.creation_date;

      card.append(cardImg, cardAuthor, cardName, cardYear);
    });
  }
};
document.addEventListener("DOMContentLoaded", getInfo);

button.addEventListener("click", getInfo);
