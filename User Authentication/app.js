import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut }
  from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvm01GIMoX6dlycwOonzj5Z9q4Kzf751s",
  authDomain: "signin-page-8c478.firebaseapp.com",
  projectId: "signin-page-8c478",
  storageBucket: "signin-page-8c478.appspot.com",
  messagingSenderId: "453973365127",
  appId: "1:453973365127:web:72f577979473ad3c358322",
  measurementId: "G-YG2FDFXT3V"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const signupBtn = document.getElementById('signup-btn');
signupBtn && signupBtn.addEventListener('click', () => {
  event.preventDefault();
  let signupUsername = document.getElementById('signup-username')
  let signupEmail = document.getElementById('signup-email')
  let signupPasswword = document.getElementById('signup-password')

  createUserWithEmailAndPassword(auth, signupEmail.value, signupPasswword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('user-->', user)
      swal.fire('user succesfully Sign Up')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
    });
  signupUsername.value = "";
  signupEmail.value = "";
  signupPasswword.value = "";
})

let signIn = document.getElementById('sign-in');
signIn && signIn.addEventListener('click', (event) => {
  event.preventDefault();
  let email = document.getElementById('email')
  let password = document.getElementById('password')
  console.log(email.value)
  console.log(password.value)

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {

      // Signed in 
      const user = userCredential.user;
      console.log('user succesfully login-->', user)
    
      Swal.fire('user succesfully login')

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('give current information-->', errorMessage)
    
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,

      })

    });

})
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname != '/products.html') {
    console.log('window.location.pathname-->', window.location.pathname)
    window.location.replace("./products.html");

  } else {
    let profileemail = document.getElementById('profile-email')
    profileemail.innerHTML = user.email
    console.log('user-->email ', user.emailVerified)
    let profileemailverified = document.getElementById('profile-email-verified')
    profileemailverified.innerHTML = user.emailVerified

  }
})

let verifiedBtn = document.getElementById("verifiedBtn");
verifiedBtn.addEventListener("click", () => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("verified")
      console.log('user-->email ', user.emailVerified)
    });

})

let signout = document.getElementById('signout')
signout && signout.addEventListener('click', () => {
  console.log('signout-->', signout)
  signOut(auth).then(() => {

    // Sign-out successful.
    console.log('signout')
    window.location.replace("./index.html");

  })
    .catch((error) => {
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        footer: '<a href="">Why do I have this issue?</a>'
      })

    });

})