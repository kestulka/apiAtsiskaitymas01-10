const inputDiv = document.createElement("div");
inputDiv.setAttribute("id", "inputDiv");
document.body.append(inputDiv);

const inputContainer = document.getElementById("inputDiv");

const inputElement = inputContainer.appendChild(
  document.createElement("input"),
);
inputElement.className = "input";
inputElement.type = "text";
inputElement.placeholder = "search for movie";

const button = document.createElement("button");
button.setAttribute("id", "button");
button.innerText = "show me some movies!";
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
  const result = await fetch(
    `http://www.omdbapi.com/?apikey=900f786b&s=${encodeURIComponent(
      inputValue,
    )}`,
  );
  console.log(result);

  const data = await result.json();
  console.log(data);

  // clear movie cards
  const allMovieCards = document.querySelectorAll(".card");
  allMovieCards.forEach((card) => card.remove());

  if (data.Response === "False") {
    alert("no such movie is found :(");
  } else {
    data.Search.map((searchResult) => {
      const card = document.createElement("div");
      card.className = "card";
      cardContainer.append(card);

      const cardImg = document.createElement("img");
      cardImg.className = "movieImg";
      cardImg.src = searchResult.Poster;

      const cardTitle = document.createElement("h2");
      cardTitle.className = "movieTitle";
      cardTitle.innerText = searchResult.Title;

      const cardYear = document.createElement("h2");
      cardYear.className = "movieYear";
      cardYear.innerText = searchResult.Year;

      card.append(cardImg, cardTitle, cardYear);
    });
  }
};
button.addEventListener("click", getInfo);
