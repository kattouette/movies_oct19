let movies = [
    {id: 1, title:"Dune", year: 2021, watched: false},
    {id: 2, title:"Interstellar", year: 2022, watched: false},
    {id: 3, title:"Cars", year: 2026, watched: false},
    {id: 4, title:"Beginning", year: 2010, watched: false},
]

const container = document.getElementById("movie-list");
const title = document.getElementById("movie-header");
const addInput= document.getElementById("movie-name");
const addButton = document.getElementById("movie-add");
const yearInput = document.getElementById("movie-year");
const searchInput = document.getElementById("movie-search");
const searchButton = document.getElementById("movie-find");
const clearButton = document.getElementById("delete-movies");

addButton.addEventListener("click", () => {
    const movie = {
        id: movies.length + 1,
        title: addInput.value,
        year: yearInput.value,
        watched: false
    };
    movies.push(movie);
    renderMovie(movie);
    displayMoviesQuantity();
});

const renderMovie = (movie) => {
    const li = document.createElement("li");
    li.textContent = `${movie.title} (${movie.year})`;
    li.setAttribute("data-id", movie.id);
    applyCardStyles(li);
    li.addEventListener("click", function () {
        markWatched(li);
        movie.watched = !movie.watched;
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    li.appendChild(deleteButton);
    // markWatched(li);
    container.appendChild(li);
};

const renderMovies = (movies) => {
    movies.forEach(function(movie) {
        renderMovie(movie);
    });
}

const displayMoviesQuantity = () => {
    const watchedMovies = movies.filter(function(movie) {
        return movie.watched; });
    title.textContent = `Watched: ${watchedMovies.length} of ${movies.length}`;
};

const searchMovies = () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(function(movie) {
        return movie.title.toLowerCase().includes(searchValue);
    });

    container.innerHTML = "";
    renderMovies(filteredMovies);
}

searchInput.addEventListener("input", searchMovies);

const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", toggleTheme);

clearButton.addEventListener("click", () => {
    container.innerHTML = "";
});

renderMovies(movies);
displayMoviesQuantity();

function applyCardStyles(card) {
    Object.assign(card.style, {
        backgroundColor: "#dff3ff",
        padding: "15px",
        borderRadius: "10px"
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}
// toggleTheme();

function markWatched(card) {
    card.classList.toggle("watched");
}
link.addEventListener("click", (event) => {
    event.preventDefault();
    detailsBlock.textContent = `${movie.year}, ${movie.watched}`;
});
