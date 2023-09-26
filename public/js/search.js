const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener("click", searchButtonHandler);

async function searchButtonHandler() {
  console.log("Button clicked"); 
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (!searchTerm) {
    docu
    try {
      const response = await fetch(`/search?term=${searchTerm}`, {
        method: "GET",
      });

      if (response.ok) {
        const recipes = await response.json();
        console.log(recipes);
        // Render recipes on the page
      } else {
        alert(response.statusText);
        console.error("Search request failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}