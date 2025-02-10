'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function Login() {

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAMpHqIl0n2qPLkg9taA5w4UspN5YOtzQ8",
        authDomain: "codeverse-612fe.firebaseapp.com",
        databaseURL: "https://codeverse-612fe-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "codeverse-612fe",
        storageBucket: "codeverse-612fe.appspot.com",
        messagingSenderId: "991671604350",
        appId: "1:991671604350:web:952c630d916324fcd8f42f",
        measurementId: "G-5KFL98MYTL"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth();

    useEffect(() => {
        let showPassword = document.getElementById("show-password");
        let password = document.getElementById("password");
        let login = document.getElementById("login");
    
        showPassword.onclick = function(){
            if (showPassword.checked){
                password.type = 'text';
            } else {
                password.type = 'password';
            }
        }
    
        login.addEventListener("click", () => {
            var emailValue = document.getElementById("email").value;
            var passwordValue = document.getElementById("password").value;
    
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    signInWithEmailAndPassword(auth, emailValue, passwordValue)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        const userRef = ref(database, 'users/' + user.uid);
                        get(userRef)
                            .then((snapshot) => {
                                const userData = snapshot.val();
                                if (userData){
                                    update(ref(database, 'users/' + user.uid), {
                                        email: emailValue,
                                    });
            
                                    // Store the user's authentication token in local storage
                                    const idToken = userCredential.accessToken;
                                    localStorage.setItem('authToken', idToken);
                                    alert('Logged-in successfully!')
                                    window.location.href = "/";
                                } else {
                                    alert("User data not found");
                                }
                            })
                            .catch((error) => {
                                alert("Error fetching user data: " + error.message);
                            });
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        alert(errorMessage);
                    });
                })
                .catch((error) => {
                    var errorCode = error.message;
                    window.alert(errorCode);
                })
        })
    })

    return(
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles['form-container']}>
                    <h1>Log in</h1>

                    <div className={styles.inputs}>
                        <input type="email" placeholder="Email" id="email" className={styles.textfield}></input>
                        <input type="password" placeholder="Password" id="password" className={styles.textfield}></input>
                    </div>

                    <div className={styles['password-stuff']}>
                        <span>
                            <label htmlFor="show-password">Show Password</label>
                            <input type="checkbox" id="show-password" className={styles.tick}></input>
                        </span>
                        <Link href="#" className={styles.link}>Forgot Password?</Link>
                    </div>

                    <input type="submit" id="login" value="Log In" className={styles.login}></input>
                    <Link href="/signup" className={styles.link}>Don't have an account? Sign up here</Link>
                </div>
            </div>
        </div>
    );
}