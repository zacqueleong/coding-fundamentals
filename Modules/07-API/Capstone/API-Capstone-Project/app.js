const ENDPOINT = 'https://api.thecatapi.com/v1/breeds';

async function getData() {
    try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        console.log(data);
        loadCat(data);
    } catch (error) {
        console.log(error);
    }
}

function loadCat(responseData) {
    const feedContainer = document.querySelector('#feed__container');

    // Loop will run for each item (cat) read from response data and generate new html elements dynamically.
    responseData.forEach(cat => {
        const elContainer = document.createElement('div');
        elContainer.classList.add('card__container');

        // Generate div element with id card__image (Cat Image)
        const elImage = document.createElement('div');
        elImage.classList.add('card__image');

        // Generate img element and construct cat image url along with set attribute onerror
        const elImg = document.createElement('img');
        const catImageURL = `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`;
        elImg.setAttribute('src', catImageURL);
        const errLogic = `this.onerror=null; this.src='./assets/missingcat.png'`
        elImg.setAttribute('onerror', errLogic);

        // Append img element as child to id card__image
        elImage.appendChild(elImg);

        // Generate div element with id card__info
        const elInfo = document.createElement('div');
        elInfo.classList.add('card__info');

        // Generate div element with id card__infoTitle (Cat Species)
        const elInfoTitle = document.createElement('div');
        elInfoTitle.classList.add('card__infoTitle');
        // Link cat name value with id infoTitle
        const catName = document.createTextNode(cat.name);
        elInfoTitle.appendChild(catName);

        // Generate div element with id card__infoDesc (Cat Description)
        const elInfoDesc = document.createElement('div');
        elInfoDesc.classList.add('card__infoDesc');
        // Link cat description value with id infoDesc
        const catDesc = document.createTextNode(cat.description);
        elInfoDesc.appendChild(catDesc);

        // Append id card__infoTitle and infoDesc to container card__info
        elInfo.appendChild(elInfoTitle);
        elInfo.appendChild(elInfoDesc);

        // Generate button element with id card__button
        const elButton = document.createElement('button');
        elButton.classList.add('card__button')

        // Set button attributes and action onclick.
        elButton.setAttribute('type', 'button');
        elButton.setAttribute('onclick', `window.open('${cat.wikipedia_url}')`);
        elButton.textContent = 'Wikipedia URL';

        // Append all sub components to the card__container.
        elContainer.appendChild(elImage);
        elContainer.appendChild(elInfo);
        elContainer.appendChild(elButton);

        // Append card__container to feed__container.
        feedContainer.appendChild(elContainer);
    })
}

// Function Execution
getData();