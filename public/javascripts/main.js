const form = document.querySelector('#searchForm');
const cardContainer = document.querySelector('#cardContainer');

// on Form submit make a request at tvmaze API through axios
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // domElement . elements . name of the input . value
    // That's one way to get search input
    const searchTerm = form.elements.query.value;
    // construct the url and pass required params 
    const config = { params: { q: searchTerm } };
    // api call by axios
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    // Call the Card constructor function
    makeShowCard(res.data);
    // clear the search input
    form.elements.query.value = '';
})

// Constructor function for each Show Card
const makeShowCard = (shows) => {
    // clear previous card results 
    cardContainer.innerHTML = '';
    for (let result of shows) {
        const card = document.createElement('div');

        const img = document.createElement('img');
        // Give default image source if there isn't one available
        if (result.show.image) {
            img.src = result.show.image.medium;
        } else {
            img.src = '/images/imageNotAvailable.jpg';
        }
        card.append(img);
        // Make the details section at the right of the image

        const details = document.createElement('div');
        details.classList.add('details');
        card.append(details);

        const title = document.createElement('h3');
        title.append(result.show.name);
        details.append(title);

        if (result.show.genres.length > 0) {
            const category = document.createElement('p');
            category.append(`Category: ${result.show.genres}`)
            details.append(category);
        }

        if (result.show.rating.average) {
            const rating = document.createElement('p');
            rating.append(`Rating: ${result.show.rating.average}`)
            details.append(rating);
        }

        if (result.show.premiered) {
            const premiered = document.createElement('p');
            premiered.append(`Premiered: ${result.show.premiered}`)
            details.append(premiered);
        }

        if (result.show.status) {
            const status = document.createElement('p');
            status.append(`Status: ${result.show.status}`)
            details.append(status);
        }

        if (result.show.language) {
            const language = document.createElement('p');
            language.append(`Language: ${result.show.language}`)
            details.append(language);
        }

        const summaryBtn = document.createElement('button');
        summaryBtn.append('Summary');
        summaryBtn.addEventListener('click', function () {
            summary.style.display = 'flex'
            // summary.style.opacity = 1;
        })
        details.append(summaryBtn);

        const summary = document.createElement('div');
        summary.innerHTML = result.show.summary;
        summary.classList.add('summary');
        summary.addEventListener('click', function () {
            summary.style.display = 'none'
        })
        card.append(summary);

        card.classList.add('card');
        cardContainer.append(card);
    }
}

