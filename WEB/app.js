const supabaseUrl = "https://zemsurdjdqlgojcswffl.supabase.co";
const supabaseKey = "sb_publishable_yQE57yIA2dL5IY6Da5Hr0g_2LNb2Pbe";

const { createClient } = window.supabase;
const db = createClient(supabaseUrl, supabaseKey);

async function loadMovies() {
  const movieList = document.getElementById("movieList");

  const { data, error } = await db
    .from("movies")
    .select("*");

  if (error) {
    console.error("Error loading movies:", error);
    movieList.innerHTML = `<p>Error loading movies: ${error.message}</p>`;
    return;
  }

  if (!data || data.length === 0) {
    movieList.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movieList.innerHTML = "";

  data.forEach((movie) => {
    const movieDiv = document.createElement("div");

    movieDiv.innerHTML = `
      <h2>${movie.title}</h2>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Year:</strong> ${movie.year}</p>
      <p><strong>Description:</strong> ${movie.description}</p>
      <hr>
    `;

    movieList.appendChild(movieDiv);
  });
}

loadMovies();