const createBeer = (name, description, image, likes, id, price, comments) => {

    const newDiv = document.createElement('div');
    newDiv.className = 'beer';

    const newH3 = document.createElement('h3');
    newH3.textContent = name;

    const newImg = document.createElement('img');
    newImg.src = image;

    const newP = document.createElement('p');
    newP.textContent = description;

    const newLikeButton = document.createElement('button');
    newLikeButton.textContent = 'Like';

    const newSpanLike = document.createElement('span');
    newSpanLike.textContent = likes;

    const newCommentButton = document.createElement('button');
    newCommentButton.textContent = 'Comments';

    newLikeButton.addEventListener('click', () => {
        like(id);
    });

    newCommentButton.addEventListener('click', () => {
        comment(id);
    });

    newImg.addEventListener('click', () => {
        detailContainer.appendChild(createBeerDetail(name, price, description, image, comments));
    });


    newDiv.appendChild(newH3);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newP);
    newDiv.appendChild(newSpanLike);
    newDiv.appendChild(newLikeButton);
    newDiv.appendChild(newCommentButton);
    return newDiv;
}

const createBeerDetail = (name, price, description, image, comments) => {
    const newDetailDiv = document.createElement('div');
    newDetailDiv.className = 'grid-container';

    const newTitleDiv = document.createElement('div');
    newTitleDiv.className = 'title';
    newTitleDiv.textContent = name;

    const newPriceDiv = document.createElement('div');
    newPriceDiv.className = 'price';
    newPriceDiv.textContent = price;

    const newSpanClose = document.createElement('span');
    newSpanClose.textContent = 'X';

    newSpanClose.addEventListener('click', () => {
        while (detailContainer.firstChild) { detailContainer.removeChild(detailContainer.firstChild); }
    })

    const newImageDiv = document.createElement('div');
    newImageDiv.className = 'image';
    const newImage = document.createElement('img');
    newImage.src = image;
    newImageDiv.appendChild(newImage);

    const newDescriptionDiv = document.createElement('div');
    newDescriptionDiv.className = 'description';
    newDescriptionDiv.textContent = description;

    const newCommentDiv = document.createElement('div');
    newCommentDiv.className = 'comments';
    const newCommentUl = document.createElement('ul');
    newCommentDiv.appendChild(newCommentUl);
    const newCommentLi = document.createElement('li');

    comments.map(comment => {
        newCommentLi.textContent = comment.comment;
        newCommentUl.appendChild(newCommentLi);
    })

    newDetailDiv.appendChild(newTitleDiv);
    newDetailDiv.appendChild(newSpanClose);
    newDetailDiv.appendChild(newPriceDiv);
    newDetailDiv.appendChild(newImageDiv);
    newDetailDiv.appendChild(newDescriptionDiv);
    newDetailDiv.appendChild(newCommentDiv);

    return newDetailDiv;
}

const displayBeers = (filteredBeers) => {
    while (container.firstChild) { container.removeChild(container.firstChild); }
    filteredBeers.map(beer => {
        container.appendChild(createBeer(beer.name, beer.description, beer.image, beer.likes, beer.beerId, beer.price, beer.comments));
    })
}

const search = () => {
    const inputValue = document.querySelector('.searchBar').value
    const beerSelect = beers.filter((beer) => {
        return beer.name === inputValue
    })
    displayBeers(beerSelect);
}

const load = () => {
    fetch("https://beerflix-api.herokuapp.com/api/v1/beers", {
            headers: {
                "X-API-KEY": "YJ0Y420-DYA4AZS-M511BG5-NNRK7RM"
            }
        })
        .then((resp) => resp.json())
        .then(function(data) {

            beers = data.beers;
            displayBeers(beers);
        })
}

const like = (id) => {
    fetch(`https://beerflix-api.herokuapp.com/api/v1/beers/${id}/like`, {
            headers: {
                "X-API-KEY": "YJ0Y420-DYA4AZS-M511BG5-NNRK7RM"
            },
            method: "POST"
        })
        .then((resp) => resp.json())
        .then(function(data) {
            load();
        })
}

const comment = (id) => {
    const data = { "comment": "comentario cerveza" };

    fetch(`https://beerflix-api.herokuapp.com/api/v1/beers/${id}/comment`, {
        method: "POST",
        headers: {
            "X-API-KEY": "YJ0Y420-DYA4AZS-M511BG5-NNRK7RM",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
}

const detailContainer = document.querySelector('.detail-container');

const container = document.querySelector('.card-container');

let beers = [];

const button = document.querySelector('.button');

button.addEventListener('click', search);

load();