import styles from "../styles/Layout.module.css"

import NavBar from "../components/navBar"
import Footer from "../components/footer"

export default function Layout({children}){
    return <div className={styles.container}>
        <NavBar/>
        {children}
        <Footer/>

    </div>
 }