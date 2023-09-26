const searchButtonHandler = async (event) => {
  event.preventDefault();
  console.log("button clicked");

  const searchInput = document.querySelector("#search-input");
  const searchTerm = searchInput.value.trim().toLowerCase();
  console.log(searchTerm);

  if (searchTerm) {
    const response = await fetch(`/search?term=${searchTerm}`, {
      method: "GET",
    });

    if (response.ok) {
      document.location.replace(`/search?term=${searchTerm}`);
    }
  }
};

const searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", searchButtonHandler);
