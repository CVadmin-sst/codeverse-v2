"use client";

import styles from './page.module.css';
import { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function Account() {

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

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const logout = document.getElementById("logout");
        const inboxContainer = document.querySelector(".inbox-container");

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const usernameRef = ref(database, 'users/' + uid + '/username');
                onValue(usernameRef, (snapshot) => {
                    const usernameData = snapshot.val();
                    setUsername(usernameData);
                })
                
                const emailRef = ref(database, 'users/' + uid + '/email');
                onValue(emailRef, (snapshot) => {
                    const emailData = snapshot.val();
                    setEmail(emailData);
                })

                const replyRef = ref(database, 'users/' + uid + '/questions/' + 'reply')
                onValue(replyRef, (snapshot) => {
                    const replyData = snapshot.val();
                    if (replyData != "" && inboxContainer.childElementCount == 1){
                        const replyTitle = document.createElement("h2");
                        replyTitle.classList.add(styles.title);
                        const replyTitleNode = document.createTextNode("Reply to your latest question");
                        replyTitle.appendChild(replyTitleNode);

                        const replyDesc = document.createElement("p");
                        replyDesc.classList.add(styles.desc);
                        const replyDescNode = document.createTextNode(replyData);
                        replyDesc.appendChild(replyDescNode);

                        const messageBox = document.createElement("div");
                        messageBox.classList.add(styles.message);
                        messageBox.appendChild(replyTitle);
                        messageBox.appendChild(replyDesc);

                        inboxContainer.appendChild(messageBox);
                    }
                })
            }
        })

        logout.addEventListener("click", function(){
            auth.signOut().then(() => {
                window.alert("Successfully signed out!");
                window.location.href = "/";
            }).catch((error) => {
                window.Error("Sign out error", error);
            })
        })

    })

    return (
        <div className={styles.body}>
            <div className={styles["main-content"]}>
                <div className={styles["account-container"]}>
                    <h2 className={styles["header"]}>Account</h2>
                    <div className={styles["details"]}>
                        <div className={styles["indiv-detail"]}>
                            <p className={styles.label}>Username:</p>
                            <p className={styles.username}>{username}</p>
                        </div>

                        <div className={styles["indiv-detail"]}>
                            <p className={styles.label}>Email:</p>
                            <p className={styles.email}>{email}</p>
                        </div>
                        <button id="logout" className={styles.logout}>Log out</button>
                    </div>
                </div>

                <div className={`inbox-container ${styles["inbox-container"]}`}>
                    <h2 className={styles.header}>Inbox</h2>
                </div>
            </div>
        </div>
    );
};