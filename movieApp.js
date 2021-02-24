// create namespacing
const movieApp = {}
// save relevant API information
movieApp.apiUrl = "https://api.themoviedb.org/3/discover/movie";
movieApp.apiKey = "c096bc45d50fcc852c2cf237d6dab960";
movieApp.posterUrl = `https://image.tmdb.org/t/p/original`;

// create a method (function in the app object) which requests information from the API
movieApp.getMovies = () => {
    // use the URL constructor to specify the parameters we wish to include in our API endpoint (AKA in the request we are making to the API)
    const url = new URL(movieApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        language: 'en-US',
        with_genres: movieApp.genreId()
    })

    // using the fetch API to make a request to the API endpoint
    // pass in new url featuring params provided by the URLSearchParams constructor
    fetch(url)
        .then((response) => {
            //parse this response into JSON
            //return JSON response so that it can be used in the next function
            return response.json();
        })
         // parse the JSON promise response and log out readable data (AKA data in JSON format)
        .then((jsonResponse) => {
            // pass the data into the displayMovies method
            // AKA call the displayMovies within getMovies
            movieApp.displayMovies(jsonResponse)
        }) 
}

// create genreId function
movieApp.genreId = () => {
    let genreId = document.querySelector('select').value;
    return genreId;
}; 

// create displayMovies method
// create elements for movie details
// append data to the elements
movieApp.displayMovies = (apiData) => {
    apiData.results.forEach ((data)  => {
        const gallery = document.createElement('li') 
        const poster = document.createElement('img')
        const movieDetails = document.createElement('div')
        const movieTitle = document.createElement('span')
        const movieReleaseDate = document.createElement('span')

        poster.src = movieApp.posterUrl + data.poster_path;
        gallery.appendChild(poster);
        movieApp.ul.appendChild(gallery);
        movieTitle.innerText = data.title;
        movieReleaseDate.innerText = data.release_date;
        gallery.appendChild(movieDetails);
        movieDetails.append(movieTitle, movieReleaseDate);

    })
}

// create changeGenre method
// prevent default page refresh on submit
// create event listener on submit
// call in getMovies 
movieApp.changeGenre = () => {
    movieApp.form.addEventListener("submit", function(event){
        event.preventDefault();
        movieApp.genreId();
        movieApp.ul.innerHTML = '';
        movieApp.getMovies();
    })
}


// create an initalization method 
movieApp.init = () => {
    // calling the method which makes the request to the API
    movieApp.form = document.querySelector('form')
    movieApp.ul = document.querySelector('ul')
    movieApp.changeGenre()
    movieApp.getMovies()
}

// call the init method to kickstart our app
movieApp.init();