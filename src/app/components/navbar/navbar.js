"use client";

import Link from 'next/link';
import styles from './navbar.module.css';
import { useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const Navbar = () => {

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
    // const analytics = getAnalytics(app);
    const database = getDatabase(app);
    const auth = getAuth();

    useEffect(() => {
        let links = document.querySelectorAll(".working-link");
        let button = document.querySelector(".btn");

        function secureLinks(link){
            link.addEventListener('click', function(event){
                event.preventDefault();
                auth.onAuthStateChanged(user => {
                    if (user){
                        window.location.href = link.href;
                    } else {
                        window.alert("Please sign in in order to use CodeVerse to its fullest");
                    }
                })
            })
        }
        links.forEach(secureLinks);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                button.innerText = "Account";
                button.href = "user/account/account.html";
                console.log(user);
            }
        })

        const sidebar = document.querySelector(".sidebar");
        const showSidebar = document.querySelector(".bx-menu");
        const hideSidebar = document.querySelector(".bx-x");

        showSidebar.addEventListener('click', function (){
            sidebar.style.display = "block";
        })

        hideSidebar.addEventListener('click', function (){
            sidebar.style.display = "none";
        })

    }, []);
    
    return (
        <div className={styles.navigation}>
            <nav className={styles.nav}>
                <span className={styles["menu-button"]}><i className={`bx bx-menu ${styles["bx-menu"]}`} ></i></span>
                <div className={`${styles["logo-section"]} ${styles.hide}`}>
                    <Link href="/" className={styles.logo}>CodeVerse</Link>
                </div>
                
                <ul className={styles.sidebar}>
                    <i className='bx bx-x'></i>
                    <li className={styles["sidebar-link"]}><Link href="/" className={styles["working-link"]}>Home</Link></li>
                    <li className={styles["sidebar-link"]}><Link href="/resources/resources" className={styles["working-link"]}>Resources</Link></li>
                    <li className={styles["sidebar-link"]}><Link href="/lessons/lessons" className={styles["working-link"]}>Lessons</Link></li>
                    <li className={styles["sidebar-link"]}><Link href="/helpdesk/helpdesk" className={styles["working-link"]}>Helpdesk</Link></li>
                </ul>

                <ul className={styles["nav-links"]}>
                    <li className={`${styles.link} ${styles.hide}`}><Link href="/" className={styles["working-link"]}>Home</Link></li>
                    <li className={`${styles.link} ${styles.hide}`}><Link href="/resources/resources" className={styles["working-link"]}>Resources</Link></li>
                    <li className={`${styles.link} ${styles.hide}`}><Link href="/lessons/lessons" className={styles["working-link"]}>Lessons</Link></li>
                    <li className={`${styles.link} ${styles.hide}`}><Link href="/helpdesk/helpdesk" className={styles["working-link"]}>Helpdesk</Link></li>
                </ul>

                <div className={styles["account-section"]}>
                    <Link href="/user/login/login" className={styles.btn}>Log in</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;