"use client";

import styles from "./page.module.css";
import { useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref, child, set } from "firebase/database";
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
        
        const questionsContainer = document.querySelector(".questions-container");
        const page = document.querySelector(".page");
        
        async function getUsersQuestions(){
            try {
                const snapshot = await get(child(ref(database), 'users'))
                if (snapshot.exists()){
                    const users = snapshot.val();
                    let QnsCount = 0;
                    for (const userId in users) {
                        if (users.hasOwnProperty(userId)) {
                            console.log(`User ID: ${userId}`);
                            const user = users[userId];

                            const questionsSnapshot = await get(child(ref(database), `users/${userId}/questions`));
                            if (questionsSnapshot.exists()) {
                                const questions = questionsSnapshot.val();
                                if (questions.question != "" || questions.description != ""){
                                    const questionTitle = document.createElement("h1");
                                    questionTitle.classList.add(styles.title);
                                    const questionTitleNode = document.createTextNode(questions.question);
                                    questionTitle.appendChild(questionTitleNode);
                    
                                    const questionDesc = document.createElement("p");
                                    questionDesc.classList.add(styles.description);
                                    const questionDescNode = document.createTextNode(questions.description);
                                    questionDesc.appendChild(questionDescNode);
                    
                                    const submitBtn = document.createElement("input");
                                    submitBtn.setAttribute("type", "submit");
                                    submitBtn.classList.add(styles.submit);
                                    submitBtn.setAttribute("id", userId);
                                    submitBtn.addEventListener("click", () => {
                                        const respectiveReplyField = document.getElementById(submitBtn.id);

                                        const questionsRef = ref(database, 'users/' + submitBtn.id + '/questions/');
                                        set(questionsRef, {
                                            question: "",
                                            description: "",
                                            reply: respectiveReplyField.value
                                        })
                                        window.alert("Reply updated");
                                        respectiveReplyField.value = "";
                                    })

                                    const textField = document.createElement("textarea");
                                    textField.classList.add(styles.reply);
                                    textField.setAttribute("placeholder", "Reply..");
                                    textField.setAttribute("id", userId);
                    
                                    const newQuestion = document.createElement("div");
                                    newQuestion.classList.add(styles.question);
                                    newQuestion.appendChild(questionTitle);
                                    newQuestion.appendChild(questionDesc);
                                    newQuestion.appendChild(textField);
                                    newQuestion.appendChild(submitBtn);
                                    
                                    questionsContainer.appendChild(newQuestion);
                                    QnsCount++;
                                }
                            } else {
                                console.log(`No questions found for User ${userId}`);
                            }
                        }
                    }
                    if (QnsCount == 0){
                        const noQuestions = document.createElement("h1");
                        noQuestions.classList.add(styles.heading);
                        const noQuestionsNode = document.createTextNode("No questions found");
                        noQuestions.appendChild(noQuestionsNode);
                        page.appendChild(noQuestions);
                    }
                }  
            } catch (error){
                console.log(error)
            }
        }
        getUsersQuestions();
    })
    return(
        <div className={`page ${styles.page}`}>
            <div className={`questions-container ${styles["questions-container"]}`}></div>
        </div>
    );
}