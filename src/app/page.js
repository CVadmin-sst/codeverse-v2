"use client";

import styles from "./page.module.css";
import Typed from 'typed.js';
import { useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
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

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const userRef = ref(database, 'users/' + uid + '/username');
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    var text = new Typed(".typed", {
                        strings: ["Welcome back, <span>" + data + "</span>"],
                        typeSpeed: 45
                    })
                })
                console.log(uid);
            } else {
                var text = new Typed(".typed", {
                    strings: ["Welcome to the <span>CodeVerse</span>"],
                    typeSpeed: 60
                })
            }
        })
    }, [])

    return (
        <div>
            <div className={styles.welcome}>
                <h1><span className="typed"></span></h1>
                <p>This is where your coding journey begins...</p>
            </div>

            <div className={styles["main-content"]}>
                <div className={styles.courses}>
                    <h2 className={styles.title}>Our Courses</h2>
                    <div className={styles["courses-card-container"]}>
                        <div className={styles["courses-card"]}>
                            <i className={`bx bxl-python ${styles['python']}`}></i>
                            <div>
                                <h4 className={styles["card-title"]}>Intro to Python</h4>
                                <p className="card-desc">A beginner's guide to python. This will help you to get a good grasp of python</p>
                            </div>
                        </div>

                        <div className={styles["courses-card"]}>
                            <i className={`bx bxl-java ${styles['java']}`}></i>
                            <div>
                                <h4 className={styles["card-title"]}>Intro to Java</h4>
                                <p className={styles["card-desc"]}>A beginner friendly introduction to java. This will help you get started with coding in java</p>
                            </div>
                        </div>

                        <div className={styles["courses-card"]}>
                            <i className={`bx bxl-c-plus-plus ${styles['c-plus-plus']}`}></i>
                            <div>
                                <h4 className={styles["card-title"]}>Intro to C++</h4>
                                <p className={styles["card-desc"]}>A beginner level course that teaches C++. This will help you to understand the basics of C++</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.features}>
                    <h2 className={styles.title}>Our Features</h2>
                    <div className={styles["features-card-container"]}>
                        <div className={styles["features-card"]}>
                            <i className='bx bx-chalkboard'></i>
                            <h4 className={styles["card-title"]}>Lessons</h4>
                            <p className={styles["card-desc"]}>Our beginner friendly and easy to follow along lessons are bound to help you start on your journey to coding!</p>
                        </div>

                        <div className={styles["features-card"]}>
                            <i className='bx bx-book-open'></i>
                            <h4 className={styles["card-title"]}>Resources</h4>
                            <p className={styles["card-desc"]}>If you need other resources alongside our lessons, our resources page will definitely have a few handy links!</p>
                        </div>

                        <div className={styles["features-card"]}>
                            <i className='bx bx-edit'></i>
                            <h4 className={styles["card-title"]}>Practise</h4>
                            <p className={styles["card-desc"]}>Learning coding definitely requires practise in order to get better. Be sure to check out our practises page!</p>
                        </div>

                        <div className={styles["features-card"]}>
                            <i className='bx bx-help-circle'></i>
                            <h4 className={styles["card-title"]}>Helpdesk</h4>
                            <p className={styles["card-desc"]}>If you ever need help with anything you don't understand, don't hesitate to check out our helpdesk!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
