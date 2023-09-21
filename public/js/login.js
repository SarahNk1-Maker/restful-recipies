// This function handles the submission of the login form
const loginFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the email and password values from the form inputs
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // Check if both email and password are provided
    if (email && password) {
      // Send a POST request to the '/api/users/login' endpoint with email and password
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Check if the login request was successful (status code 200)
      if (response.ok) {
        // Redirect the user to the homepage if login was successful
        document.location.replace('/');
      } else {
        // Display an alert message if login failed
        alert('Failed to log in');
      }
    }
  };
  
  // Attach the loginFormHandler function to the form's submit event
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  