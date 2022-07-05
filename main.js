// Second project - WebDev
const api_key =
  "dd7f4f144fe3786105bea06c9a02d3ee&hash=8fda5d5a302ba2bbf1db8ceb456f928f";

async function getFakeApi() {
  try {
    const response = await fetch(`http://fakestoreapi.com/products/`);
    let fakeApiData = await response.json();
    return fakeApiData;
  } catch (error) {
    console.log("Error", error);
  }
}

function displayCardData(fakeApiData) {
  console.log("fakeApiData :>> ", fakeApiData);
  // Grab main div
  let divMainStuff = document.getElementById("main-Stuff");

  // Clear the form
  divMainStuff.innerHTML = "";

  // Populate and draw cards
  for (let i = 0; i < fakeApiData.length; i++) {
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "g-5 col-sm-12 col-md-6 col-lg-4");

    let img = document.createElement("img");
    img.setAttribute("src", fakeApiData[i].image);
    img.setAttribute("alt", "Thumbnail");
    img.classList.add("card-img-top");
    img.classList.add("rounded");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerHTML = fakeApiData[i].title;

    let divTxtContainer = document.createElement("div");
    divTxtContainer.setAttribute("id", `ident${i}`);

    divMainStuff.appendChild(divCard);
    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    cardBody.appendChild(h5);

    let pCardText = document.createElement("p");
    pCardText.setAttribute("class", "card-text");

    // This draws "no description" if the description is empty
    if (fakeApiData[i].description == "") {
      pCardText.classList.add("font-italic");
      pCardText.classList.add("text-muted");
      pCardText.innerHTML = "No description available";
      cardBody.appendChild(pCardText);
      // collapsDiv.appendChild(divText);
    } else {
      // If the description is poulated the below will give Read more/less functionality
      const readLess = fakeApiData[i].description.slice(0, 20);
      const readMore = fakeApiData[i].description.slice(20);

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
  const fakeApiData = await getFakeApi();
  // Run second stuff
  displayCardData(fakeApiData);
  // Create category dropdown
  createCatDropDown(fakeApiData);
  // Create rating dropdown
  createRatingDropDown(fakeApiData);
  // Event listener
  setEventListeners(fakeApiData);
}

//listen for the events from the two HTML elements
const setEventListeners = (fakeApiData) => {
  document
    .querySelector("#category-dropdown")
    .addEventListener("change", (event) => {
      // console.log("Fist event: ", event.target.value);
      filterByCategory(fakeApiData);
    });
  document
    .querySelector("#rating-dropdown")
    .addEventListener("change", (event) => {
      // console.log("second event: ", event.target.value);
      filterByRating(fakeApiData);
    });
  document.querySelector("#search-form").addEventListener("change", (event) => {
    console.log("Search event :>> ", event.target.value);
    filterBySearch(fakeApiData);
  });
};

// Filter by search
const filterBySearch = (fakeApiData) => {
  const searchFieldValue = document.querySelector("#search-form").value;
  console.log("searchFieldValue :>> ", searchFieldValue);
  const searchFilter = fakeApiData.filter((search) => {
    return search.title === searchFieldValue;
  });
  displayCardData(searchFilter);
};

// Filter by category
const filterByCategory = (fakeApiData) => {
  console.log("fakeApiData :rrrrr>> ", fakeApiData);
  const dropDownValue = document.querySelector("#category-dropdown").value;
  console.log("selected element:", dropDownValue);
  const filteredCategory = fakeApiData.filter((category) => {
    return category.category === dropDownValue;
  });
  displayCardData(filteredCategory);
};

// Filter by rating
const filterByRating = (fakeApiData) => {
  console.log("fakeApiData :>> ", fakeApiData);
  const dropDownValue = document.querySelector("#rating-dropdown").value;
  console.log("dropDownValue :>> ", dropDownValue);
  const filteredRating = fakeApiData.filter((rating) => {
    return rating.rating.rate == dropDownValue;
  });
  console.log("filteredRating :>> ", filteredRating);
  displayCardData(filteredRating);
};

//populate the data in one of the dropdowns
const createCatDropDown = (fakeApiData) => {
  const dropdown = document.getElementById("category-dropdown");
  const categorys = [];
  fakeApiData.forEach(function (category) {
    let x = category.category;
    categorys.push(x);
  });

  const unique = [...new Set(categorys)];

  unique.forEach((item) => {
    let option = document.createElement("option");
    option.setAttribute("value", item);
    option.innerHTML = item;
    dropdown.appendChild(option);
  });
};

// Populate the data in the other dropdown
const createRatingDropDown = (fakeApiData) => {
  const dropdown = document.getElementById("rating-dropdown");
  const rating = [];
  fakeApiData.forEach(function (item) {
    let x = item.rating.rate;
    rating.push(x);
  });
  const unique = [...new Set(rating)];

  unique.forEach((item) => {
    let option = document.createElement("option");
    option.setAttribute("value", item);
    option.innerHTML = item;
    dropdown.appendChild(option);
  });
};

controller();
