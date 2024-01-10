const divukas = document.createElement("div");
divukas.setAttribute("id", "container");
document.body.append(divukas);
const container = document.getElementById("container");
container.style.boxSizing = "border-box";
container.style.display = "grid";
container.style.placeItems = "center";

const button = document.createElement("button");
button.innerText = "show me some doggies!";
button.style.height = "40px";
button.style.width = "250px";
button.style.border = "thick solid black";
button.style.borderRadius = "10px";
button.style.marginBottom = "15px";
container.append(button);

const pic = document.createElement("img");
pic.style.width = "250px";
pic.style.height = "250px";
pic.style.border = "thin solid purple";
pic.style.borderRadius = "10px";
pic.style.marginBottom = "15px";

const getPhoto = async () => {
  const result = await fetch("https://dog.ceo/api/breeds/image/random");
  console.log(result);

  const data = await result.json();
  console.log(data);

  pic.src = data.message;

  const existingLink = container.querySelector("a");
  if (existingLink) {
    container.removeChild(existingLink);
  }
  container.append(pic);

  const link = document.createElement("a");
  link.href = pic.src;
  link.innerText = `${pic.src}`;

  container.append(link);
};

button.addEventListener("click", getPhoto);

button.addEventListener("mouseover", () => {
  button.style.backgroundColor = "green";
});

button.addEventListener("mouseout", () => {
  button.style.backgroundColor = "";
});
