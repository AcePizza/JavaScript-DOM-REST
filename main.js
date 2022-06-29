// Second project - WebDev

async function getMarvelData() {
  try {
    const response = await fetch(
      "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=dd7f4f144fe3786105bea06c9a02d3ee&hash=8fda5d5a302ba2bbf1db8ceb456f928f"
    );
    let marvelData = await response.json();
    return marvelData.data.results;
  } catch (error) {
    console.log("Error", error);
  }
}

function displayCardData(marvelData) {
  for (let i = 0; i < marvelData.length; i++) {
    let divMainStuff = document.getElementById("main-Stuff");
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "col-sm-12 col-md-6 col-lg-4");

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      marvelData[i].thumbnail.path +
        "/portrait_medium" +
        "." +
        marvelData[i].thumbnail.extension
    );
    img.setAttribute("alt", "Thumbnail");
    img.classList.add("card-img-top");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerHTML = marvelData[i].name;

    let collapsDiv = document.createElement("div");
    collapsDiv.setAttribute("class", "collapse");
    collapsDiv.setAttribute("id", `ident${i}`);

    let btnCollExp = document.createElement("button");
    btnCollExp.setAttribute("class", "btn btn-primary");
    btnCollExp.setAttribute("type", "button");
    btnCollExp.setAttribute("data-bs-toggle", "collapse");
    btnCollExp.setAttribute("data-bs-target", `#ident${i}`);
    btnCollExp.setAttribute("aria-expanded", "false");
    btnCollExp.setAttribute("aria-controls", `ident${i}`);
    btnCollExp.innerHTML = "Open description";

    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    cardBody.appendChild(h5);

    divMainStuff.appendChild(divCard);

    let divText = document.createElement("div");
    divText.setAttribute("class", "card card-body");
    if (marvelData[i].description == "") {
      divText.classList.add("font-italic");
      divText.classList.add("text-muted");
      divText.innerHTML = "No description available";
      cardBody.appendChild(divText);
      // collapsDiv.appendChild(divText);
    } else {
      divText.innerHTML = marvelData[i].description;
      cardBody.appendChild(collapsDiv);
      collapsDiv.appendChild(divText);
      divCard.appendChild(btnCollExp);
    }
  }
}

async function controller() {
  // Run first stuff
  const marvelData = await getMarvelData();
  console.log("Inside the controller >> ", marvelData);
  // Run second stuff
  displayCardData(marvelData);
}

controller();
