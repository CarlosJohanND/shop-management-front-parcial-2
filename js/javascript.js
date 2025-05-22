document.getElementById('formLogin').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('user_name').value;
  const password = document.getElementById('Password').value;

  const credentials = { username: username, password: password };

  fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
    .then(data => {
      const alertDiv = document.getElementById('alert');
      if (data.token) {
        alertDiv.innerHTML = '<div class="alert alert-success" role="alert">Inicio de sesión exitoso!</div>';
        console.log('Login successful:', data);
      } else {
        alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">Login failed. Verifique la información ingresada.</div>';
        console.log('Login failed:', data);
      }
    })
    .catch(error => {
      const alertDiv = document.getElementById('alert');
      alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">Ocurrió un error, inicie de nuevo.</div>';
      console.error('Error:', error);
    });
});
