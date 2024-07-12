'use client'
const token = localStorage.getItem('token');

// check if valid token
if (!token) {
  window.location.href = '/';
} else {
    // check if token expired
    if (token) {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const exp = tokenData.exp;
        const now = new Date().getTime() / 1000;
        if (exp < now) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    }
}

export default token;
