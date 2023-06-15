document.addEventListener("DOMContentLoaded", async () => {
  const getMoviesBtn = document.getElementById("movies-btn");

  const upcomingMovies = await fetchMoviesLocal();
  const movies = upcomingMovies.results;

  displayMovies(movies);
});

async function fetchMoviesAPI() {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", apiKey);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function fetchMoviesLocal() {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("./response.json", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const getMovieDetails = (movie) => {
  const { originalTitleText, primaryImage, releaseYear, titleType } = movie;

  const movieDetails = {
    title: originalTitleText.text,
    image: primaryImage.url,
    releaseYear: releaseYear.year,
    type: titleType.text,
  };

  return movieDetails;
};

function displayMovies(movies) {
  const moviesHTML = movies
    .filter((movie) => movie.primaryImage)
    .map((movie) => {
      const { title, image, releaseYear, type } = getMovieDetails(movie);

      return `

        <div class="movies" >
          <div>
            <img src="${image}" />
          </div>

          <h4 style="font-family: sans-serif; margin-top: 5px">
            ${title}
          </h1>

          
          <div class="dateTime">
          <span>${releaseYear}</span>
          <span>${type}</span>
          </div>
  
        </div>
      `;
    });

  document.getElementById("movies").innerHTML = moviesHTML;
}

const nextPage = document.querySelector("#next");

nextPage.addEventListener("click", () => {});
