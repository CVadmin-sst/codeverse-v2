import Link from 'next/link';
import styles from './page.module.css';

export default function Resources() {
    return(
        <div className={styles.page}>
            <div className={styles.welcome}>
                <h1>Resources</h1>
                <p>Here are some resources that you can refer to when needed</p>
            </div>

            <div className={styles["main-content"]}>
                <h2 className={styles.title}>Python</h2>
                <div className={`${styles["resource-cards"]} ${styles["python-resources"]}`}>
                    <Link className={styles.card} href="https://docs.python.org/3/tutorial/index.html">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>Python's official documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.w3schools.com/python/default.asp">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>w3schools documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://devdocs.io/python/">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>DevDocs python documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.youtube.com/watch?v=XKHEtdqhLK8&t=7s">
                        <i className='bx bx-movie-play'></i>
                        <h4>Bro Code's youtube video</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.youtube.com/watch?v=_uQrJ0TkZlc">
                        <i className='bx bx-movie-play'></i>
                        <h4>Mosh's python tutorial</h4>
                    </Link>
                </div>

                <h2 className={styles.title}>Java</h2>
                <div className={`${styles["resource-cards"]} ${styles["java-resources"]}`}>
                    <Link className={styles.card} href="https://docs.oracle.com/en/java/javase/22/index.html">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>Java's official documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.w3schools.com/java/default.asp">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>w3schools documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.tutorialspoint.com/java/index.htm">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>TutorialsPoint documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.youtube.com/watch?v=xk4_1vDrzzo">
                        <i className='bx bx-movie-play'></i>
                        <h4>Bro Code's youtube video</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.youtube.com/watch?v=eIrMbAQSU34">
                        <i className='bx bx-movie-play'></i>
                        <h4>Mosh's java tutorial</h4>
                    </Link>
                </div>

                <h2 className={styles.title}>C++</h2>
                <div className={`${styles["resource-cards"]} ${styles["cpp-resources"]}`}>
                    <Link className={styles.card} href="https://devdocs.io/cpp/">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>DevDocs C++ documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.w3schools.com/cpp/default.asp">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>w3schools documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://learn.microsoft.com/en-us/cpp/cpp/">
                        <i className='bx bx-spreadsheet'></i>
                        <h4>Microsoft's C++ documentation</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.youtube.com/watch?v=-TkoO8Z07hI">
                        <i className='bx bx-movie-play'></i>
                        <h4>Bro Code's youtube video</h4>
                    </Link>
                    <Link className={styles.card} href="https://www.youtube.com/watch?v=ZzaPdXTrSb8">
                        <i className='bx bx-movie-play'></i>
                        <h4>Mosh's C++ tutorial</h4>
                    </Link>
                </div>
            </div>
        </div>
    );
}