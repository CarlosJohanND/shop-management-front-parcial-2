document.getElementById("formLogin").addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById("user_name").value;
    const password = document.getElementById("Password").value;

    let message = ''
    let alertType = ''

    // alt 96 

    let alert = `<div class="alert alert-${alertType} alert-dismissible fade show " role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    document.getElementById('alert').innerHTML = alert;

    login(username, password)
}
)
function login(username, password) {

    let message = ''
    let alertType = ''
    localStorage.removeItem('token')

    const credentials = { username: username, password: password };
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })

        .then((response) => {
            if (response.status == 200) {
                alertType = 'success'
                message = 'Inicio de sesion exitosa.';
                console.log('responde bien' + response)
                alertBuilder(alertType, message)
                response.json().then((data) => {
                    localStorage.setItem('token', data.token)
                })
                setTimeout(() => {
                    location.href = 'admin/shop.html'
                }, 2000)
            }
            else {
                alertType = 'danger'
                message = 'Correo o contraseña incorrectos.';
                alertBuilder(alertType, message)
            }
        })

        .catch((error) => {
            alertType = 'danger'
            message = 'Error inesperado';
            console.error(error)
            alertBuilder(alertType, message)
        })


}
function alertBuilder(alertType, message) {
    const alert = `
        <div class="alert alert-${alertType} alert-dismissible fade show " role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    document.getElementById('alert').innerHTML = alert;
}


