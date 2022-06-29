let url =
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=dd7f4f144fe3786105bea06c9a02d3ee&hash=8fda5d5a302ba2bbf1db8ceb456f928f";

async function getMarvelData(str) {
  const response = await fetch(str); //The first promise (to check if the data is avilible)
  let marData = await response.json(); //The second promise (to put the data into a usable format(JSON))
  mainStuffTest(marData); //* This is important. It calls the function below with the data from this function
}

getMarvelData(url); //You need to call the fuction with the url variable from the top of the code

function navBarTop() {
  
}

function mainStuffTest(marvelData) {
  for (let i = 0; i < marvelData.data.results.length; i++) {
    let divMainStuff = document.getElementById("main-Stuff");
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "col-sm-12 col-md-6 col-lg-4");

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      marvelData.data.results[i].thumbnail.path +
        "/portrait_medium" +
        "." +
        marvelData.data.results[i].thumbnail.extension
    );
    img.setAttribute("alt", "Thumbnail");
    img.classList.add("card-img-top");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerHTML = marvelData.data.results[i].name;

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
    if (marvelData.data.results[i].description == "") {
      divText.classList.add("font-italic");
      divText.classList.add("text-muted");
      divText.innerHTML = "No description available";
      cardBody.appendChild(divText);
      // collapsDiv.appendChild(divText);
    } else {
      divText.innerHTML = marvelData.data.results[i].description;
      cardBody.appendChild(collapsDiv);
      collapsDiv.appendChild(divText);
      divCard.appendChild(btnCollExp);
    }
  }
}
