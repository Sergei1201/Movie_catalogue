const global = {
    currentPage: window.location.pathname,
    search: {
      type: '',
      page: 1,
      term: '',
      totalPages: 0,
      totalResults: 0
    },
    api: {
      api_key: 'e7fc0d311099e5e1dffea6b071e7902b',
      api_movie: 'https://api.themoviedb.org/3/'
    }
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

// Show Single Show Details
const showShowDetails = async () => {
  const showId = window.location.search.split('=')[1]
  const show = await fetchAPIData(`tv/${showId}`)
  // Load background image for a tv show
  displayBackgroundImage('show', show.backdrop_path)
  // Crate a new div for displaying info about a specific show
  const div = document.createElement('div')
  // InnerHTML
  div.innerHTML = `
     <div class="details-top">
          <div>
          ${
            show.poster_path ? 
            ` 
            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />
            `
            : 
            `
             <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />
            `
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed()} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre => `<li>${genre.name}</li>`)).join(' ')}
            </ul>
            <a href="${show.homepage}" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies.map(company => company.name).join(', ')}
          </div>
        </div>
  `
  // Insert into the DOM
  document.getElementById('show-details').appendChild(div)
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

// Display Movie Swiper
const movieSwiper = async () => {
  const { results } = await fetchAPIData('movie/now_playing')
  results.forEach(movie => {
    // For each movie create a div to display in the swiper
    const div = document.createElement('div')
    div.classList.add('swiper-slide')
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path ? 
              `
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
              `
              : 
              `
              <img src="./images/no-image.jpg" alt="${movie.title}" />
              `
            }
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed()} / 10
            </h4>
    `
    // Insert into the DOM
    document.querySelector('.swiper-wrapper').appendChild(div)
    // Call swiper function
     initSwiper()
    
  })
 
}

// Show Swiper
const showSwiper = async () => {
  const { results } = await fetchAPIData('tv/on_the_air')
  console.log(results)
  results.forEach(show => {
    // Create a div and insert in into the DOM
    const div = document.createElement('div')
    div.classList.add('swiper-slide')
    div.innerHTML = `
     <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path ? 
              `
              <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" />
              `
              : 
              `
              <img src="./images/no-image.jpg" alt="${show.name}" />
              `
            }
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${show.vote_average.toFixed()} / 10
            </h4>
    `
    // Append child to the DOM
    document.querySelector('.swiper-wrapper').appendChild(div)
    initSwiper()
  })
}

// Movie Swiper 
const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false 
    },
    breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40
    },
    840: {
      slidesPerView: 5,
      spaceBetween: 50
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 60
    }
  }
  })
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
    const API_KEY = global.api.api_key
    const API_MOVIE = global.api.api_movie
    // Show spinner before fetching data
    showSpinner()
    const res = await fetch(`${API_MOVIE}${endPoint}?api_key=${API_KEY}&language=en-US`)
    const data = res.json()
    // Hide spinner when data is fetched
    hideSpinner()
    return data
}

// Fetch API Search Data
const fetchSearchAPI = async () => {
  const API_KEY = global.api.api_key
  const API_MOVIE = global.api.api_movie
  // Show spinner before fetching data
  showSpinner()
  const res = await fetch(`${API_MOVIE}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`)
  const data = res.json()
    // Hide spinner when data is fetched
    hideSpinner()
    return data

}

// Search For Movie Or Show
const searchData = async () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  global.search.type = urlParams.get('type')
  global.search.term = urlParams.get('search-term')
  // Check if there's is a search term
  if (global.search.term !== '' && global.search.term !== null) {
    const {results, page, total_results, total_pages} = await fetchSearchAPI()
    global.search.page = page
    global.search.totalResults = total_results
    global.search.totalPages = total_pages
   

    // Check if the results exist
    if (results.length === 0) {
      showAlert('Sorry, no results have been found')
      return
    } else {
      showAlert('See the results', 'alert-success')
      displaySearchResults(results)
    }
  } else {
    // Otherwise, show an alert
    showAlert('Please enter search info')
  }

}

// Display Search Results
const displaySearchResults = (results) => {
    // Clean the search heading results
    document.getElementById('search-results-heading').innerHTML = ''
    // Clean the search results
    document.getElementById('search-results').innerHTML = ''
    // Clean the pagination
    document.getElementById('pagination').innerHTML = ''
     results.forEach(result => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
          ${
            result.poster_path ?
            `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${global.search.type === 'movie' ? result.title : result.name}"
            />
            `
            :

            `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${global.search.type === 'movie' ? result.title : result.name}"
            />
            `
          } 
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type == 'movie' ? result.release_date : result.first_air_date}</small>
            </p>
          </div>
         ` 
         document.querySelector('#search-results').appendChild(div)
         // Display the number of the found results
         document.querySelector('#search-results-heading').innerHTML = `
          <h2>${results.length} of ${global.search.totalResults} for the term <span style="font-style:italic"> ${global.search.term}</span></h2>
         `
    })
    // Display pagination
    displayPagination()
}

// Display Pagination
const displayPagination = () => {
  // Create div
  const div = document.createElement('div')
  // Add class
  div.classList.add('pagination')
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `
  // Append child and insert into the DOM
  document.getElementById('pagination').appendChild(div)
  // After displaying pagination disable the previous page if it's the first one
  if (global.search.page === 1) {
    document.getElementById('prev').disabled = true
  }
  if (global.search.page === global.search.totalPages) {
    document.getElementById('next').disabled = true
  }
  // Navigate through the pages back and forth
  document.getElementById('next').addEventListener('click', async () => {
    global.search.page ++
    const {results, total_pages} = await fetchSearchAPI()
    displaySearchResults(results)
  })
  document.getElementById('prev').addEventListener('click', async () => {
    global.search.page --
    const {results, total_pages} = await fetchSearchAPI()
    displaySearchResults(results)
  })
}

// Show Alert
const showAlert = (message, className='alert-error') => {
  // Create an alert
  const alertElement = document.createElement('div')
  // Add classes 
  alertElement.classList.add('alert', className)
  // Create a text node
  alertElement.appendChild(document.createTextNode(message))
  // Insert into the DOM
  document.getElementById('alert').appendChild(alertElement)
  // Remove alert after 5 seconds
  setTimeout(() => {
    alertElement.remove()
  }, 5000)

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
            movieSwiper()
            displayMovies()
            break
        case '/shows.html':
            showSwiper()
            displayShows()
            break
        case '/movie-details.html':
            showMovieDetails()
            break
        case '/search.html':
            searchData()
            break
        case '/tv-details.html':
            showShowDetails()
            break
    }
    changeColorOfActiveLink()
}



// Init when DOM is loaded
document.addEventListener('DOMContentLoaded', init)