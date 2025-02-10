"use client";

import Link from 'next/link';
import styles from "./page.module.css";
import { useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function Signup() {

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
        let firstRequest = true;

        let showPassword = document.getElementById("show-password");
        let password = document.getElementById("password");
        let confirmPassword = document.getElementById("confirm-password");
        let signUp = document.getElementById("sign-up");

        showPassword.onclick = function(){
            if (showPassword.checked){
                password.type = 'text';
                confirmPassword.type = 'text';
            } else {
                password.type = 'password';
                confirmPassword.type = 'password';
            }
        }

        signUp.addEventListener("click", async (e) => {
            if (firstRequest) {
                firstRequest = false;
                e.preventDefault();
            
                const emailValue = document.getElementById("email").value;
                const usernameValue = document.getElementById("username").value;
                const passwordValue = document.getElementById("password").value;
                const confirmedPasswordValue = document.getElementById("confirm-password").value;
                
                if (passwordValue === confirmedPasswordValue) {
                    try {
                        const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
                        const user = userCredential.user;
            
                        await set(ref(database, 'users/' + user.uid), {
                            email: emailValue,
                            username: usernameValue
                        });
            
                        alert('User created! Please log in');
                        window.location.href = "/login";
                    } catch (error) {
                        console.error("Error creating user:", error);
                        alert(error.message);
                    }
                } else {
                    window.alert("Passwords don't match");
                }
            }
        });
    })

    return(
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles["form-container"]}>
                    <h1>Sign Up</h1>

                    <div className={styles.inputs}>
                        <input type="email" placeholder="Email" id="email" className={styles.textfield}></input>
                        <input type="text" placeholder="Username" id="username" className={styles.textfield}></input>
                        <input type="password" placeholder="Password" id="password" className={styles.textfield}></input>
                        <input type="password" placeholder="Confirm Password" id="confirm-password" className={styles.textfield}></input>
                    </div>

                    <div className={styles['password-stuff']}>
                        <span>
                            <label htmlFor="show-password">Show Password</label>
                            <input type="checkbox" id="show-password" className={styles.tick}></input>
                        </span>
                    </div>

                    <input type="submit" id="sign-up" value="Sign up" className={styles.login}></input>
                    <Link href="/login" className={styles.link}>Already have an account? Log in here</Link>
                </div>
            </div>
        </div>
    );
}