// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '/login.html';
    }
});

// Add belt selection functionality
const beltOptions = document.querySelectorAll('.belt-option');
let selectedBelt = '';

beltOptions.forEach(belt => {
    belt.addEventListener('click', () => {
        // Remove selected class from all belts
        beltOptions.forEach(b => b.classList.remove('selected'));
        // Add selected class to clicked belt
        belt.classList.add('selected');
        selectedBelt = belt.textContent;
    });
});

// Handle form submission
window.handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const user = auth.currentUser;

    if (!user) {
        alert('Please login first');
        window.location.href = '/login.html';
        return;
    }

    if (!selectedBelt) {
        alert('Please select a belt level');
        return;
    }

    try {
        const userData = {
            userId: user.uid,
            fullName: form.querySelector('input[type="text"]').value,
            age: parseInt(form.querySelector('input[type="number"]').value),
            email: form.querySelector('input[type="email"]').value,
            phone: form.querySelector('input[type="tel"]').value,
            beltLevel: selectedBelt,
            trainingSchedule: form.querySelector('select').value,
            registrationDate: new Date().toISOString()
        };

        // Add document to Firestore
        const docRef = await addDoc(collection(db, "students"), userData);
        console.log("Document written with ID: ", docRef.id);

        // Store the registration ID in localStorage
        localStorage.setItem('registrationId', docRef.id);

        alert('Registration successful!');
        window.location.href = '/Userdashboard.html';
    } catch (error) {
        console.error("Error adding document: ", error);
        alert('Error during registration. Please try again.');
    }
};
