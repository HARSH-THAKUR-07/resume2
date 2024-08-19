// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle Form Submission
document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;

    // Add a new document with a generated ID
    db.collection("resumes").add({
        name: name,
        contact: contact,
        education: education,
        skills: skills,
        experience: experience
    }).then(() => {
        alert('Resume submitted successfully!');
        document.getElementById('resumeForm').reset();
        loadResumes(); // Reload resumes after submission
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
});

// Function to load resumes from Firestore
function loadResumes() {
    const resumesContainer = document.getElementById('resumesContainer');
    resumesContainer.innerHTML = ''; // Clear the container

    db.collection("resumes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const resume = doc.data();
            const resumeElement = document.createElement('div');
            resumeElement.classList.add('resume');
            resumeElement.innerHTML = `
                <h3>${resume.name}</h3>
                <p><strong>Contact:</strong> ${resume.contact}</p>
                <p><strong>Education:</strong> ${resume.education}</p>
                <p><strong>Skills:</strong> ${resume.skills}</p>
                <p><strong>Experience:</strong> ${resume.experience}</p>
            `;
            resumesContainer.appendChild(resumeElement);
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

// Load resumes on page load
window.onload = loadResumes;