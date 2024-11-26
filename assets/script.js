// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAC5ftpSRnvcLpVdvyallWXWgpCeZ_20aE",
    authDomain: "karate-webapp-dae1c.firebaseapp.com",
    projectId: "karate-webapp-dae1c",
    storageBucket: "karate-webapp-dae1c.firebasestorage.app",
    messagingSenderId: "36994831306",
    appId: "1:36994831306:web:2961aeef2c97bd349cf533",
    measurementId: "G-KSVJ25YBD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Modal elements
const modal = document.getElementById('resetModal');
const closeModal = document.querySelector('.close-modal');
const resetMessage = document.getElementById('reset-message');

// Form switching function
window.showForm = function(formType) {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const tabs = document.querySelectorAll('.tab');
    
    if (formType === 'signin') {
        signinForm.style.display = 'block';
        signupForm.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        signinForm.style.display = 'none';
        signupForm.style.display = 'block';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Sign Up functionality
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-password-confirm').value;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('Account created successfully!');
        window.location.href = '/dashboard.html';
    } catch (error) {
        alert(error.message);
    }
});

// Sign In functionality
document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('Signed in successfully!');
        window.location.href = '/Userdashboard.html';
    } catch (error) {
        alert(error.message);
    }
});

// Show modal when clicking "Forgot Password"
document.getElementById('forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    const signinEmail = document.getElementById('signin-email').value;
    if (signinEmail) {
        document.getElementById('reset-email').value = signinEmail;
    }
});

// Close modal when clicking the X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    resetMessage.style.display = 'none';
    resetMessage.textContent = '';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        resetMessage.style.display = 'none';
        resetMessage.textContent = '';
    }
});

// Handle password reset form submission
document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('reset-email').value;

    try {
        await sendPasswordResetEmail(auth, email);
        resetMessage.textContent = 'Password reset email sent! Check your inbox.';
        resetMessage.style.color = '#4dff4d';
        resetMessage.style.display = 'block';
        
        setTimeout(() => {
            modal.style.display = 'none';
            resetMessage.style.display = 'none';
            resetMessage.textContent = '';
        }, 3000);
    } catch (error) {
        resetMessage.textContent = error.message;
        resetMessage.style.color = '#ff4d4d';
        resetMessage.style.display = 'block';
    }
});
