"use client";

import styles from "./page.module.css";
import { useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function Lessons() {
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
        const auth = getAuth(app);

        // Initialize elements
        let pythonCourseProgress = document.getElementById("python-course-progress");
        let pythonQuicklink = document.getElementById("python-quicklink");
        let pythonLessonsBtn = document.getElementById("python-lessons-btn");
        let pythonLessons = document.getElementById("python-lessons");
        let lessonLinks = document.getElementsByClassName("lesson-link");

        // Other useful variables
        let pythonLessonNo; 

        // Render user data / create user data if first time + lock future lessons
        onAuthStateChanged(auth, async () => { 
        const user = auth.currentUser;
        const userRef = ref(database, 'users/' + user.uid);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    pythonLessonNo = snapshot.val().pythonCourseProgress;

                    if (pythonLessonNo == undefined) {
                        console.log("undefined")
                        update(ref(database, 'users/' + user.uid), {
                            pythonCourseProgress: 0
                        });
                        pythonLessonNo = 0;

                        pythonCourseProgress.innerText = "Currently at: You haven't started yet!";
                        pythonQuicklink.innerText = "Click here to start"
                    } else {
                        pythonCourseProgress.innerText = "Currently at: Lesson " + pythonLessonNo + "/10";
                        pythonQuicklink.innerText = "Go to your current lesson"
                    }
                    pythonQuicklink.href = "pythonLesson" + pythonLessonNo;

                    for(let i = 0; i <= pythonLessonNo; i++) {
                        let link = lessonLinks[i];
                        link.innerText = "Lesson " + i;
                        link.classList.add("card-desc");
                        link.href = "pythonLesson" + i;
                        link.style.cursor = "pointer";
                    }

                } else {
                    pythonCourseProgress.innerText = "No data avaliable";
                    pythonQuicklink.style.display = "none";
                }
            })
        })

        pythonLessonsBtn.addEventListener("click", () => {
            switch (pythonLessons.style.display) {
                case "inline":
                    pythonLessons.style.display = "none";
                    pythonLessonsBtn.innerText = "Show all lessons";
                    break;
                default:
                    pythonLessons.style.display = "inline";
                    pythonLessonsBtn.innerText = "Hide all lessons";
                    break;
            }
        })
    })
    return(
        <div className={styles.page}>
            <div className={styles["main-content"]}>
            
                <div className={styles.courses}>
                    <h2 className={styles.title}>Our Courses</h2>
                    <div className={styles["card-container"]}>
                        <div className={styles.card}>
                            <div>
                                <i className={`bx bxl-python ${styles["card-logo-1"]}`}></i>
                                <h4 className={styles["card-title"]}>Intro to Python</h4>
                                <p className={styles["card-desc"]}>A beginner's guide to python. This will help you get a good grasp of python.</p>
                            </div>
                            <div>
                                <h4 className={styles["card-title"]} id="python-course-progress">Currently at: Loading...</h4>
                                <a href="" className={styles["card-btn"]} id="python-quicklink">Loading...</a>
                                <button className={styles["card-btn"]} id="python-lessons-btn">Show all lessons</button>
                                <div className={styles["python-lessons"]} id="python-lessons">
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 0</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 1</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 2</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 3</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 4</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 5</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 6</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 7</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 8</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 9</a>
                                    <a href="" className={`lesson-link ${styles["lesson-link"]}`}><i className='bx bxs-lock-alt'></i>Lesson 10</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}