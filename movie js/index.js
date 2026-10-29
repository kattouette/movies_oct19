let movies = [
    {id: 1, title:"Dune", year: 2021, genre: "Drama", watched: false, description: "Пол Атрід вирушає на пустельну планету Арракіс, де розгортається боротьба за владу та цінний ресурс."},
    {id: 2, title:"Interstellar", year: 2022, genre: "Fantasy", watched: false, description: "Команда астронавтів вирушає в космос, щоб знайти новий дім для людства."},
    {id: 3, title:"Cars", year: 2026, genre: "Cartoon", watched: false, description: "Гоночний автомобіль Блискавка Макквін вчиться дружбі та взаємодопомозі."},
    {id: 4, title:"Beginning", year: 2010, genre: "Mystery", watched: false, description: "Злодій проникає у сни людей, щоб викрадати ідеї або змінювати їхні переконання."},
]

const container = document.getElementById("movie-list");
const title = document.getElementById("movie-header");
const addInput= document.getElementById("movie-name");
const addButton = document.getElementById("movie-add");
const yearInput = document.getElementById("movie-year");
const searchInput = document.getElementById("movie-search");
const searchButton = document.getElementById("movie-find");
const clearButton = document.getElementById("delete-movies");
const form = document.getElementById("movie-form");
const genreSelect = document.getElementById("movie-genre");
const watchedCheckbox = document.getElementById("movie-watched");
const nameError = document.getElementById("name-error");
const yearError = document.getElementById("year-error");

// function addMovie() {
//     const movie = {
//         id: movies.length + 1,
//         title: addInput.value,
//         year: yearInput.value,
//         genre: genreSelect.value,
//         watched: false
//     };
//     movies.push(movie);
//     renderMovie(movie);
//     displayMoviesQuantity();
//     addInput.value = "";
// }
// addButton.addEventListener("click", addMovie);
// addInput.addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//         addMovie();
//     }
// });
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let title = addInput.value;
    let year = Number(yearInput.value);
    nameError.textContent = "";
    yearError.textContent = "";
    if (title === "") {
        nameError.textContent = "Enter movie title";
        return;
    }
    if (
        yearInput.value === "" ||
        !Number.isInteger(year) ||
        year < 1900 ||
        year > new Date().getFullYear()
    ) {
        yearError.textContent = "Enter correct year";
        return;
    }

    let movie = {
        id: movies.length + 1,
        title: title,
        year: year,
        genre: genreSelect.value,
        watched: watchedCheckbox.checked,
        description: ""
    };
    movies.push(movie);
    renderMovie(movie);
    displayMoviesQuantity();
    form.reset();
});


const renderMovie = (movie) => {
    const li = document.createElement("li");
    li.classList.add("movie-list-item");
    li.textContent = `${movie.title} (${movie.year}) (${movie.genre})`;
    li.classList.toggle("watched", movie.watched);
    li.setAttribute("data-id", movie.id);
    applyCardStyles(li);

    li.addEventListener("click", function () {
        markWatched(li);
        movie.watched = !movie.watched;
        displayMoviesQuantity();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    li.appendChild(deleteButton);

    const link = document.createElement("a");
    link.href = "#";
    link.textContent = "Детальніше";

    link.addEventListener("click", function (event) {
        showMovieDetails(event, movie, li);
    });

    li.appendChild(link);
    container.appendChild(li);
    li.setAttribute("data-id", movie.id);
};


container.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const li = event.target.closest("li");
        const id = Number(li.dataset.id);

        movies = movies.filter(movie => movie.id !== id);
        li.remove();
    }
});
const showMovieDetails = (event, movie, li) => {
    event.preventDefault();
    event.stopPropagation();
    if (li.querySelector("p")) {
        return;
    }
    const info = document.createElement("p");
    info.textContent = movie.description;
    li.appendChild(info);
};
const renderMovies = (movies) => {
    movies.forEach(function(movie) {
        renderMovie(movie);
    });
}
const displayMoviesQuantity = () => {
    const watchedMovies = movies.filter(function(movie) {
        return movie.watched;
    });
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
document.addEventListener("keydown", function(event) {
    if (
        event.key.toLowerCase() === "d" &&
        !event.target.closest("input, textarea")
    ) {
        toggleTheme();
    }
});
// toggleTheme();

function markWatched(card) {
    card.classList.toggle("watched");
}

