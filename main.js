let page = 1;

// 1. Page loads
document.addEventListener("DOMContentLoaded", async () => {
  const movieUrl = "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming";

  // 2. Fetch upcoming movies and series
  // const upcomingMovies = await fetchMoviesAPI(movieUrl);
  const upcomingMovies = await fetchMoviesAPI(movieUrl);
  // 3. Save the results of the fetch request in movies variable
  const movies = upcomingMovies.results;

  // 4. Display the movies in our HTML
  displayMovies(movies);

  // Saving our next button in variable
  const nextPage = document.querySelector("#next");

  // Listening for click event on our next button
  nextPage.addEventListener("click", getNextPage);

  // saving our previous button in variable
  const previousBtn = document.querySelector("#Previous");

  // listening for click event o previous page
  previousBtn.addEventListener("click", getPreviousPage);

  // get the search field
  const search = document.getElementById("search");
  search.addEventListener("keyup", async (e) => {
    if (e.target.value.trim() === "") {
      // 2. Fetch upcoming movies and series
      // const upcomingMovies = await fetchMoviesAPI(movieUrl);
      const upcomingMovies = await fetchMoviesAPI(movieUrl);
      // 3. Save the results of the fetch request in movies variable
      const movies = upcomingMovies.results;

      // 4. Display the movies in our HTML
      displayMovies(movies);
    }
  });

  // add event listener to the search field
  search.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.querySelector("input");
    const inputValue = input.value;

    if (inputValue.trim() !== "") {
      try {
        const searchPageURL = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${inputValue}`;

        // 2. Fetch upcoming movies and series
        const upcomingMovies = await fetchMoviesAPI(searchPageURL);
        // 3. Save the results of the fetch request in movies variable
        const movies = upcomingMovies.results;

        // 4. Display the movies in our HTML
        displayMovies(movies);
      } catch (e) {
        console.log(e);
      }
    }
  });
});

async function fetchMoviesAPI(movieUrl) {
  toggleLoading(true);
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", apiKey);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(movieUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toggleLoading(false);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

// async function fetchMoviesLocal() {
//   return new Promise((resolve, reject) => {
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow",
//     };

//     fetch("./response.json", requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

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

        <div class="movie" >
          <div>
            <img src="${image}" />
          </div>

          <h4 >
            ${title}
          </h4>

          
          <div class="dateTime">
          <span>${releaseYear}</span>
          <span>${type}</span>
          </div>
  
        </div>
      `;
    })
    .join(" ");

  document.getElementById("movies").innerHTML = moviesHTML;
}

async function getNextPage() {
  try {
    page++;
    const nextPageURL = `https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?page=${page}`;

    // 2. Fetch upcoming movies and series
    const upcomingMovies = await fetchMoviesAPI(nextPageURL);
    // 3. Save the results of the fetch request in movies variable
    const movies = upcomingMovies.results;

    // 4. Display the movies in our HTML
    displayMovies(movies);
  } catch (e) {
    console.log(e);
  }
}

async function getPreviousPage() {
  if (page == 1) {
    return;
  }

  page--;

  const previousPageUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?page=${page}`;

  try {
    if (page == 2) {
      previousPageUrl ==
        "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming";
    } else {
      // 2. Fetch upcoming movies and series
      const upcomingMovies = await fetchMoviesAPI(previousPageUrl);
      // 3. Save the results of the fetch request in movies variable
      const movies = upcomingMovies.results;

      // 4. Display the movies in our HTML
      displayMovies(movies);
    }
  } catch (e) {
    console.log(e);
  }
}

function toggleLoading(loading) {
  // Getting the overlay
  let overlay = document.getElementsByClassName("loading-overlay")[0];

  setTimeout(
    () => {
      // console.log(loading);

      // Toggling is active on the overlay
      overlay.classList.toggle("is-active");
    },
    loading ? 0 : 1500
  );
}

const bar = document.querySelector(".bar");

bar.addEventListener("click", () => {
  const header = document.querySelector("header");

  header.classList.toggle("active");
});
