const searchInput = document  .querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener("click", searchButtonHandler);

async function searchButtonHandler() {
    const searchTerm = searchInput.value.trim().toLowerCase();
  
    if (searchTerm) {
      // Send a request to your server with the search term
      const response = await fetch(`/search?term=${searchTerm}`, {
        method: "GET",
      });
  
      if (response.ok) {
        // Handle the response and display search results
        const recipes = await response.json();
        // You can render the recipes here in your search.handlebars
        console.log(recipes);
      } else {
        console.error("Search request failed.");
      }
    }
  }
