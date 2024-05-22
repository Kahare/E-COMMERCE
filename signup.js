const baseUrl = "http://localhost:3000/users";

document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if any field is empty
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const user = {
        username,
        email,
        password
    };

    // Check if username already exists
    const usersResponse = await fetch(baseUrl);
    const users = await usersResponse.json();

    if (users.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    // Create new user
    const postResponse = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (postResponse.ok) {
        alert('User created successfully');
        window.location.href = 'login.html';
    } else {
        alert('Error creating user');
    }
});
