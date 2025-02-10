"use client";

import Image from 'next/image';
import styles from "./page.module.css";
import { useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function Home() {
    useEffect(() => {
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

        const question = document.getElementById("question");
        const description = document.getElementById("description");
        const submitBtn = document.getElementById("submit");

        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();

            onAuthStateChanged(auth, (user) => {
                if (user){
                    const uid = user.uid;
                    const questionsRef = ref(database, 'users/' + uid + '/questions/');
                    set(questionsRef, {
                        question: question.value,
                        description: description.value,
                        userID: uid,
                        reply: ""
                    });
                    alert("Question saved");
                    question.value = "";
                    description.value = "";
                } else {
                    window.alert("user is not signed in??");
                }
            })
        })
    })

    return(
        <div className={styles.page}>
            <div className={styles["main-content"]}>
                <div className={styles["form-container"]}>
                    <h2 className={styles.title}>Helpdesk</h2>
                    <p>This is our helpdesk, feel free to ask any question you have and give us about a day to reply!</p>
                    <div className={styles.inputs}>
                        <input type="text" placeholder="What is your question?" id="question" className={styles.question}></input>
                        <textarea id="description" placeholder="Give a description" className={styles.description}></textarea>
                        <input type="submit" id="submit" className={styles.submit}></input>
                    </div>
                </div>
                <Image width={1019.4842} height={436.68123} className={styles.img} src="/thinking.svg" alt="image of laptop with person thinking, sitting, and leaning against it"></Image>
            </div>
        </div>
    );
}