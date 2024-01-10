const divukas = document.createElement("div");
divukas.setAttribute("id", "container");
document.body.append(divukas);

const container = document.getElementById("container");
container.style.boxSizing = "border-box";
container.style.display = "grid";

const input = document.createElement("input");
input.type = "text";
input.placeholder = "search for movie";
input.style.marginBottom = "15px";
input.style.border = "thin solid black";
input.style.height = "20px";
input.style.width = "250px";

const button = document.createElement("button");
button.innerText = "show me some movies!";
button.style.height = "40px";
button.style.width = "250px";
button.style.border = "thick solid black";
button.style.borderRadius = "10px";
button.style.marginBottom = "15px";

container.append(input, button);

const getInfo = async (event) => {
  event.preventDefault();
  const inputValue = input.value.trim();
  const result = await fetch(
    `http://www.omdbapi.com/?apikey=900f786b&s=${encodeURIComponent(
      inputValue,
    )}`,
  );
  console.log(result);

  const data = await result.json();
  console.log(data);

  // clear movie cards
  const allMovieImgs = document.querySelectorAll("img");
  allMovieImgs.forEach((image) => image.remove());

  if (data.Response === "False") {
    alert("no such movie is found :(");
  } else {
    data.Search.map((image) => {
      const card = document.createElement("div");
      card.className = "card";
      container.append(card);

      const cardImg = document.createElement("img");
      cardImg.classname = "movieImg";
      cardImg.src = image.Poster;
      container.append(cardImg);
    });
  }
};
button.addEventListener("click", getInfo);
