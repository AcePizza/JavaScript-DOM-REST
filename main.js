// Second project - WebDev
const api_key =
  "dd7f4f144fe3786105bea06c9a02d3ee&hash=8fda5d5a302ba2bbf1db8ceb456f928f";

async function getMarvelData() {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${api_key}`
    );
    let marvelData = await response.json();
    return marvelData.data.results;
  } catch (error) {
    console.log("Error", error);
  }
}

const test = "d";

async function getCreatorData() {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/creators?ts=1&nameStartsWith=${test}&apikey=${api_key}`
    );
    let marvelData = await response.json();
    return marvelData.data.results;
  } catch (error) {
    console.log("Error", error);
  }
}

function displayCardData(marvelData) {
  console.log(marvelData);
  for (let i = 0; i < marvelData.length; i++) {
    let divMainStuff = document.getElementById("main-Stuff");
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "g-5 col-sm-12 col-md-6 col-lg-4");

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      marvelData[i].thumbnail.path +
        "/portrait_fantastic" +
        "." +
        marvelData[i].thumbnail.extension
    );
    img.setAttribute("alt", "Thumbnail");
    img.classList.add("card-img-top");
    img.classList.add("rounded");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerHTML = marvelData[i].name;

    let divTxtContainer = document.createElement("div");
    divTxtContainer.setAttribute("id", `ident${i}`);

    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    cardBody.appendChild(h5);
    divMainStuff.appendChild(divCard);

    let pCardText = document.createElement("p");
    pCardText.setAttribute("class", "card-text");
    if (marvelData[i].description == "") {
      pCardText.classList.add("font-italic");
      pCardText.classList.add("text-muted");
      pCardText.innerHTML = "No description available";
      cardBody.appendChild(pCardText);
      // collapsDiv.appendChild(divText);
    } else {
      const readLess = marvelData[i].description.slice(0, 20);
      const readMore = marvelData[i].description.slice(20);

      let pReadLess = document.createElement("p");
      pReadLess.innerHTML = readLess;

      let spnDots = document.createElement("span");
      spnDots.setAttribute("id", `dots${i}`);
      spnDots.innerHTML = " ...";

      let spnMore = document.createElement("span");
      spnMore.setAttribute("id", `more${i}`);
      spnMore.setAttribute("style", "display: none;");
      spnMore.innerHTML = readMore;

      let btnReadMoreLess = document.createElement("button");
      btnReadMoreLess.setAttribute("class", "btn btn-primary");
      btnReadMoreLess.setAttribute("type", "button");
      btnReadMoreLess.setAttribute("id", `hide-text${i}`);
      btnReadMoreLess.innerHTML = "Read more";

      cardBody.appendChild(divTxtContainer);
      divTxtContainer.appendChild(pReadLess);
      pReadLess.appendChild(spnDots);
      pReadLess.appendChild(spnMore);
      divTxtContainer.appendChild(btnReadMoreLess);

      let listenForEvent = document
        .getElementById(`hide-text${i}`)
        .addEventListener("click", showHide);

      function showHide() {
        let dots = document.getElementById(`dots${i}`);
        let moreText = document.getElementById(`more${i}`);
        let btnText = document.getElementById(`hide-text${i}`);

        if (dots.style.display === "none") {
          dots.style.display = "inline";
          btnText.innerHTML = "Read More";
          moreText.style.display = "none";
        } else {
          dots.style.display = "none";
          btnText.innerHTML = "Read Less";
          moreText.style.display = "inline";
        }
      }
    }
  }
}

async function controller() {
  // fetch character data
  const marvelData = await getMarvelData();
  // fetch creator data
  const marvelCreator = await getCreatorData();
  // Run second stuff
  displayCardData(marvelData);
  // Event listener
  setEventListeners();
  // Create dropdown\
  createDropDown(marvelCreator);
}

//listen for the events from the two HTML elements
const setEventListeners = () => {
  document
    .querySelector("#alphabet-dropdown")
    .addEventListener("change", (event) => {
      console.log("Fist event: ", event);
    });
  document.querySelector("#description").addEventListener("change", (event) => {
    console.log("second event: ", event);
  });
};

//Get the value from the even handler
const filterByDropDown = () => {
  const dropDownValue = document.querySelector("#alphabet-dropdown").value;
  console.log("selected element:", dropDownValue);
};

//populate the data in one of the dropdowns
const createDropDown = (marvelCreator) => {
  console.log("marvelCreator :>> ", marvelCreator);
  marvelCreator.forEach((name) => {
    const dropdown = document.getElementById("creator-dropdown");
    let option = document.createElement("option");
    option.setAttribute("value", name.fullName);
    option.innerHTML = name.fullName;
    dropdown.appendChild(option);
  });

  // console.log(dropdown);
  // dropdown.appendChild(option);
};

controller();
