
const apiURLAll = 'http://api.tvmaze.com/shows?page=1';
const apiURLSearch = 'http://api.tvmaze.com/search/shows?q=';

//отображение
getMovies(apiURLAll);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData);
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies__wrapper');

    data.forEach((movie) => {
        let src = '';
        if (movie.image != null || movie.image != undefined) {
            src = `${movie.image.original}`
        } else {
            src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
        }
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
            <img class="movie__img" src="${src}" alt="${movie.name}">
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <h4 class="movie__title">${movie.name}</h4>
            <p class="movie__category">${movie.genres}</p>
            <a class="movie__favorite"></a>
        </div>`;
        moviesEl.appendChild(movieEl);
    });
}


//поиск
const button = document.querySelector('.search-btn');
const search = document.querySelector('.search');

button.addEventListener('click', (e) => {
    e.preventDefault();

    const apiSearchURL = `${apiURLSearch}${search.value}`;
    console.log(apiSearchURL)
    if (search.value) {
        getMoviesWithSearch(apiSearchURL);
    }
    search.value = '';
});

async function getMoviesWithSearch(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMoviesSearch(respData);
    console.log(respData)
}
function showMoviesSearch(data) {
    const moviesEl = document.querySelector('.movies__wrapper');
    //очистка страницы
    document.querySelector('.movies__wrapper').innerHTML = '';

    data.forEach((movie) => {
        let src = '';
        if (movie.show.image != null || movie.show.image != undefined) {
            src = `${movie.show.image.original}`
        } else {
            src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
        }
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
            <img class="movie__img" src="${src}" alt="${movie.show.name}">
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <h4 class="movie__title">${movie.show.name}</h4>
            <p class="movie__category">${movie.show.genres}</p>
            <a class="movie__favorite"></a>
        </div>`;
        moviesEl.appendChild(movieEl);
    });
}

// жанры



//select favorite


const movieList = document.querySelector('.movies__wrapper');
// const movieCard = movieList.querySelectorAll('.movie');

movieList.addEventListener('click', function (e) {
    const movieCard = e.target.closest('a.movie__favorite');
    if (movieCard) {
        e.target.closest('.movie__favorite').classList.add('movie__favorite--active');
        movieCard.toggleAttribute('data-favorite')
    }
});



// close popup
const popupClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

popupClose.addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.toggle('close');
});

// open popup

const movies = document.querySelector('.movies__wrapper');

movies.addEventListener('click', function (e) {
    const movieCard = e.target.closest('div.movie__info');
    let popupTitle = document.querySelector('.popup__title');
    let popupText = document.querySelector('.popup__text');
    let popupImg = document.querySelector('.popup__img');
    if (movieCard) {
        popupTitle.innerText = e.target.closest('.movie__title').textContent;
        document.querySelector('.popup').classList.remove('close');
        document.querySelector('.popup').classList.add('open');
    }
});

// popup data

