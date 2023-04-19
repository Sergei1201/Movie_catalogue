const global = {
    currentPage: window.location.pathname
}

// Display Popular Movies
const displayMovies = async () => {
    const { results } = await fetchAPIData('movie/popular')
    results.forEach(movie => {
        /* For each movie create a separate div element with all the necessary info from our API 
        and display in the DOM */
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path ?
            `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />
            `
            :

            `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />
            `
          } 
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
         ` 
         document.querySelector('#popular-movies').appendChild(div)
    })
}

const displayShows = async () => {
    const { results } = await fetchAPIData('tv/popular')
    results.forEach(show => {
        // Create an element and display it in the DOM
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path ? 
            `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />
            `
            :
            `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />
            `
            }
            
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
        `
        document.getElementById('popular-shows').appendChild(div)
    })
}

// Fetch API Movie Data
const fetchAPIData = async (endPoint) => {
    const API_KEY = 'e7fc0d311099e5e1dffea6b071e7902b'
    const API_MOVIE = 'https://api.themoviedb.org/3/'
    const res = await fetch(`${API_MOVIE}${endPoint}?api_key=${API_KEY}&language=en-US`)
    const data = res.json()
    return data
}


// Change Color Of Active Links
const changeColorOfActiveLink = () => {
    // Get all nav-links
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

// Init
const init = () => {
    switch(global.currentPage) {
        case '/':
        case '/index.html':
            displayMovies()
            break
        case '/shows.html':
            displayShows()
            break
        case '/movie-details.html':
            console.log('Movie details')
            break
        case '/search.html':
            console.log('Search')
            break
        case '/tv-details.html':
            console.log('TV details')
            break
    }
    changeColorOfActiveLink()
}



// Init when DOM is loaded
document.addEventListener('DOMContentLoaded', init)