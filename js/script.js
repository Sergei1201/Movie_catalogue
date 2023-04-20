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
// Display Popular Shows
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

// Show Single Movie Details
const showMovieDetails = async () => {
  const movieId = window.location.search.split('=')[1]
  const movie = await fetchAPIData(`movie/${movieId}`)
  // Load Background Image Using Specific API
   displayBackgroundImage('movie', movie.backdrop_path)
  // Create a new element for a single movie and display it in the DOM
  const div = document.createElement('div')
  div.innerHTML = `
     <div class="details-top">
          <div>
          ${
            movie.poster_path ?
            `
            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />
            
            `
            :
            `
             <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />
            `
          }
           
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed()}/ 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
           ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumbers(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumbers(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies.map(company => company.name).join(', ')}
          </div>
        </div>
  `
  document.getElementById('movie-details').appendChild(div)
}

// Background Image
const displayBackgroundImage = (type, imagePath) => {
  const overLayDiv = document.createElement('div')
  overLayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${imagePath})`
  overLayDiv.style.backgroundSize = 'cover'
  overLayDiv.style.backgroundPosition = 'center'
  overLayDiv.style.backgroundRepeat = 'no-repeat'
  overLayDiv.style.height = '100vh'
  overLayDiv.style.width = '100vw'
  overLayDiv.style.position = 'absolute'
  overLayDiv.style.top = '0'
  overLayDiv.style.left = '0'
  overLayDiv.style.zIndex = '-1'
  overLayDiv.style.opacity = '0.1'

  // Check for the type
  if (type === 'movie') {
    document.getElementById('movie-details').appendChild(overLayDiv)
  } else {
    document.getElementById('show-details').appendChild(overLayDiv)
  }

}


// Show Spinner
const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show')
}

// Hide Spinner
const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show')
}

// Fetch API Movie Data
const fetchAPIData = async (endPoint) => {
    const API_KEY = 'e7fc0d311099e5e1dffea6b071e7902b'
    const API_MOVIE = 'https://api.themoviedb.org/3/'
    // Show spinner before fetching data
    showSpinner()
    const res = await fetch(`${API_MOVIE}${endPoint}?api_key=${API_KEY}&language=en-US`)
    const data = res.json()
    // Hide spinner when data is fetched
    hideSpinner()
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

// Add Commas To Numbers
const addCommasToNumbers = (number) => {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            showMovieDetails()
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