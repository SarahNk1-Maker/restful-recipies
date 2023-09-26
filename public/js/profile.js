// Ensure that the code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Event listener to create a new recipe.
  const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#recipe-title').value.trim();
    const tag = document.querySelector('#recipe-tag').value.trim();
    const description = document.querySelector('#recipe-desc').value.trim();
    const ingredients = document.querySelector('#recipe-ingredients').value.trim();
    const instructions = document.querySelector('#recipe-instructions').value.trim();
    const prep_time = document.querySelector('#recipe-prepTime').value.trim();
    const cook_time = document.querySelector('#recipe-cookTime').value.trim();
console.log(tag)
    if (title && tag && description && ingredients && instructions && prep_time && cook_time) {
      const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({ title, tag, description, ingredients, instructions, prep_time, cook_time }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create recipe');
      }
    }
  };

  // Event listener to delete a recipe.
  const recipeDelButtonHandler = async (event) => {
    if (event.target.hasAttribute('recipeData-id')) {
      const id = event.target.getAttribute('recipeData-id');

      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };

  // Ensure that the elements with the specified IDs exist before adding event listeners
  const newRecipeForm = document.querySelector('#newRecipeForm');
  const chefRecipeList = document.querySelector('#chefRecipeList');

  if (newRecipeForm) {
    newRecipeForm.addEventListener('submit', newFormHandler);
  }

  if (chefRecipeList) {
    chefRecipeList.addEventListener('click', recipeDelButtonHandler);
  }
});

  // Event listener to delete a user.
  const userDelButtonHandler = async (event) => {
    if (event.target.hasAttribute('userData-id')) {
      const id = event.target.getAttribute('userData-id');

      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };

  const userDeleteBtn = document.querySelector('#userDeleteBtn');
  userDeleteBtn.addEventListener('click', userDelButtonHandler);