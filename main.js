// Second project - WebDev

async function getFakeApi() {
  try {
    const response = await fetch(`http://fakestoreapi.com/products/`);
    let fakeApiData = await response.json();
    console.log("response :>> ", response);
    if (response.status === 400) {
      console.log("error 400 in response");
    }
    return fakeApiData;
  } catch (error) {
    console.log("error.message :>> ", error.message);
    // This is displayed in the console
    console.log("THAT DOES NOT COMPUTE :>> ", error);

    // The below does not work. Why??
    const mainError = document.getElementById("main-Stuff");

    const divError = document.createElement("div");
    divError.setAttribute("class", "container");

    const errorMessage = document.createElement("h1");
    errorMessage.innerHTML = "...thats an error!";

    mainError.appendChild(divError);
    divError.appendChild(errorMessage);
  }
}

// Dynamic search fetch
async function getSearchFakeApi(searchFieldValue) {
  console.log("searchFieldValue :>> ", searchFieldValue);
  try {
    const response = await fetch(
      `http://fakestoreapi.com/products/${searchFieldValue}`
    );
    let fakeApiData = await response.json();
    return fakeApiData;
  } catch (error) {
    console.log("THAT DOES NOT COMPUTE :>> ", error);
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
    divCard.setAttribute("class", "card col-sm-12 col-md-6 col-lg-4");

    let img = document.createElement("img");
    img.setAttribute("src", fakeApiData[i].image);
    img.setAttribute("alt", "Thumbnail");
    img.classList.add("card-img-top");
    img.classList.add("rounded");

    const ulListGroup = document.createElement("ul");
    ulListGroup.setAttribute("class", "list-group list-group-flush");

    const liCategory = document.createElement("li");
    liCategory.setAttribute("class", "list-group-item");
    liCategory.innerHTML = `Category: ${fakeApiData[i].category}`;

    const liPrice = document.createElement("li");
    liPrice.setAttribute("class", "list-group-item");
    liPrice.innerHTML = `Price: ${fakeApiData[i].price} €`;

    const liRating = document.createElement("li");
    liRating.setAttribute("class", "list-group-item");
    liRating.innerHTML = `Raing: ${fakeApiData[i].rating.rate}. Based on (${fakeApiData[i].rating.count}) counts`;

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
    divCard.appendChild(ulListGroup);
    ulListGroup.appendChild(liCategory);
    ulListGroup.appendChild(liPrice);
    ulListGroup.appendChild(liRating);
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
      const readLess = fakeApiData[i].description.slice(0, 30);
      const readMore = fakeApiData[i].description.slice(30);

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
  // fetch fakestore data
  const fakeApiData = await getFakeApi();
  // Display the data to the cards
  displayCardData(fakeApiData);
  // Create category dropdown
  createCatDropDown(fakeApiData);
  // Event listener
  setEventListeners(fakeApiData);
}

//listen for the events from the two HTML elements
const setEventListeners = (fakeApiData) => {
  document
    .querySelector("#category-dropdown")
    .addEventListener("change", (event) => {
      // console.log("Fist event: ", event.target.value);
      // filterByCategory(fakeApiData);
      filtersCombined(fakeApiData);
    });
  document
    .querySelector("#rating-dropdown")
    .addEventListener("change", (event) => {
      console.log("second event: ", event.target.value);
      // filterByRating(fakeApiData);
      filtersCombined(fakeApiData);
    });
  // keyup keyword instead of change
  document.querySelector("#search-form").addEventListener("keyup", (event) => {
    console.log("Search event :>> ", event.target.value);
    filterBySearch(fakeApiData);
  });
  document.querySelector("#slider-one").addEventListener("change", (event) => {
    console.log("Slider 1 event :>> ", event.target.value);
    filtersCombined(fakeApiData);
  });
  document.querySelector("#slider-two").addEventListener("change", (event) => {
    console.log("Slider 2 event :>> ", event.target.value);
    filtersCombined(fakeApiData);
  });
};

// Filter by search
const filterBySearch = async () => {
  const searchFieldValue = document.querySelector("#search-form").value;
  const getSearchFakeApiVar = await getSearchFakeApi(searchFieldValue);
  displayCardData(getSearchFakeApiVar);
};

// Filter by price function
// const filterByPrice = (fakeApiData) => {
//   let sliderOneValue = document.querySelector("#slider-one").value;
//   let sliderTwoValue = document.querySelector("#slider-two").value;

//   // covert strings into numbers
//   numSliderOneValue = Number(sliderOneValue);
//   numSliderTwoValue = Number(sliderTwoValue);

//   // draws the min price
//   sliderOneText = document.querySelector("#slider-one-text");
//   sliderOneText.innerHTML = `From: ${numSliderOneValue} €`;

//   // This makes the value of the second slider never go below the value of the first slider
//   if (numSliderTwoValue <= numSliderOneValue) {
//     numSliderTwoValue = numSliderOneValue;
//     return numSliderTwoValue;
//   }

//   // draws the max price
//   sliderTwoText = document.querySelector("#slider-two-text");
//   sliderTwoText.innerHTML = `To: ${numSliderTwoValue} €`;

//   const priceFilter = fakeApiData.filter((price) => {
//     console.log(typeof price);
//     return price.price >= numSliderOneValue && price.price <= numSliderTwoValue;
//   });
//   console.log("priceFilter :>> ", priceFilter);
//   displayCardData(priceFilter);
// };

// Combined filter section
const filtersCombined = (fakeApiData) => {
  // Category stuff
  const dropDownValue = document.querySelector("#category-dropdown").value;

  // Ratings stuff
  let ratingDropdown = document.querySelector("#rating-dropdown").value;
  ratingDropdownOne = Number(ratingDropdown);
  let ratingDropdownPlusOne = ratingDropdownOne + 1;

  // Price range stuff
  let sliderOneValue = document.querySelector("#slider-one").value;
  let sliderTwoValue = document.querySelector("#slider-two").value;

  // covert strings into numbers
  numSliderOneValue = Number(sliderOneValue);
  numSliderTwoValue = Number(sliderTwoValue);

  // draws the min price
  sliderOneText = document.querySelector("#slider-one-text");
  sliderOneText.innerHTML = `From: ${numSliderOneValue} €`;

  // This makes the value of the second slider never go below the value of the first slider
  if (numSliderTwoValue <= numSliderOneValue) {
    numSliderTwoValue = numSliderOneValue;
    return numSliderTwoValue;
  }

  // draws the max price
  sliderTwoText = document.querySelector("#slider-two-text");
  sliderTwoText.innerHTML = `To: ${numSliderTwoValue} €`;

  // the actual filter
  const filteredResults = fakeApiData.filter((filter) => {
    let ratingResults = 0;
    if (
      filter.rating.rate < ratingDropdownPlusOne &&
      filter.rating.rate >= ratingDropdownOne
    ) {
      ratingResults = filter.rating.rate;
    }
    return (
      (filter.category === dropDownValue || dropDownValue === "all") &&
      (filter.rating.rate === ratingResults || ratingDropdown === "all") &&
      filter.price >= numSliderOneValue &&
      filter.price <= numSliderTwoValue
    );
  });

  displayCardData(filteredResults);
};

//populate the data in the category dropdown
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

controller();
