
import styles from "../styles/listSingers.module.css"

export default function ListSingers({singer}){
    return <div className={styles.container}>
    

     <div> {singer?.fullname}</div>
    </div>
 }