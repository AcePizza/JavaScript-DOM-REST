

let divMainStuff = document.getElementById('main-Stuff');

for (let i = 0; i < marvelData.data.results.length; i++) {
    // console.log(marvelData.data.results[i]);
    
    let divCard = document.createElement("div");
    divCard.setAttribute('class', 'col-sm-12 col-md-6 col-lg-4 card')

    let img = document.createElement("img");
    img.setAttribute("src", marvelData.data.results[i].thumbnail.path + "/portrait_medium" + "." + marvelData.data.results[i].thumbnail.extension);
    img.setAttribute('alt', 'Thumbnail');
    img.classList.add('card-img-top');

    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    let h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.innerHTML = marvelData.data.results[i].name

    let p = document.createElement('p');
    p.classList.add('card-text');
    if (marvelData.data.results[i].description == "") {
        p.classList.add("font-italic");
        p.classList.add("text-muted");
        p.innerHTML = "No description available"
    } else {
        p.innerHTML = marvelData.data.results[i].description
    }
    
    let a = document.createElement('a');
    a.setAttribute("href", "#");
    a.setAttribute("class", "btn btn-primary");
    a.innerHTML = "TEST";

    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    cardBody.appendChild(h5);
    cardBody.appendChild(p);
    cardBody.appendChild(a);
    divMainStuff.appendChild(divCard);
}