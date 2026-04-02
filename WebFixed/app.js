const supabaseUrl = "https://zemsurdjdqlgojcswffl.supabase.co";
const supabaseKey = "sb_publishable_yQE57yIA2dL5IY6Da5Hr0g_2LNb2Pbe";

const { createClient } = window.supabase;
const db = createClient(supabaseUrl, supabaseKey);

const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("movie_id"));

async function loadMovieDetails() {

const movieList = document.getElementById("movieList");

if (!movieId) {
movieList.innerHTML = "<p>No movie_id found in the URL.</p>";
return;
}

const { data, error } = await db
.from("movies")
.select("*")
.eq("movie_id", movieId)
.single();

if (error) {
movieList.innerHTML = `<p>Error loading movie: ${error.message}</p>`;
return;
}

movieList.innerHTML = `
<h2>${data.title}</h2>
<p><strong>Genre:</strong> ${data.genre}</p>
<p><strong>Year:</strong> ${data.year}</p>
<p><strong>Description:</strong> ${data.description}</p>
<hr>
`;

}

async function loadReviews() {

const reviewsList = document.getElementById("reviewsList");

if (!movieId) {
reviewsList.innerHTML = "<p>No movie selected.</p>";
return;
}

const { data, error } = await db
.from("reviews")
.select("*");

if (error) {
reviewsList.innerHTML = `<p>Error loading reviews: ${error.message}</p>`;
return;
}

const filteredReviews = data.filter(
review => Number(review.movie_id) === movieId
);

if (filteredReviews.length === 0) {
reviewsList.innerHTML = "<p>No reviews yet.</p>";
return;
}

reviewsList.innerHTML = "";

filteredReviews.forEach(review => {

const reviewDiv = document.createElement("div");

/* convert rating out of 10 → stars */
const stars = "⭐".repeat(Math.round(review.rating / 2));

reviewDiv.innerHTML = `
<p><strong>${review.reviewer_name}</strong> ${stars} (${review.rating}/10)</p>
<p>${review.comment}</p>
<hr>
`;

reviewsList.appendChild(reviewDiv);

});

}

loadMovieDetails();
loadReviews();