const seachInput = document
  .querySelector("#search-input")
  .value.trim()
  .toLowerCase();
const searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", searchButtonHandler);

const searchButtonHandler = async (event) => {
  if (seachInput) {
    const response = await fetch("/search", {
      method: "GET",
    });
  }
};
