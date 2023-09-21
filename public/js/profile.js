//Script logic to add and remove recipies.

//Event listener to create a new recipe.
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#recipe-title').value.trim();
    const description = document.querySelector('#recipe-desc').value.trim();
    const ingredients = document.querySelector('#recipe-ingredients').value.trim();
    const instructions = document.querySelector('#recipe-instructions').value.trim();
    const prep_time = document.querySelector('#recipe-prepTime').value.trim();
    const cook_time= document.querySelector('#recipe-cookTime').value.trim();


    if (title && description && ingredients && instructions && prep_time && cook_time) {
      const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({ title, description, ingredients, instructions, prep_time, cook_time }),
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
  
  //EVent lsitener to delete a recipe.
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
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
  
  document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.recipe-list')
    .addEventListener('click', delButtonHandler);
  