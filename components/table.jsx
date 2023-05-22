import styles from "../styles/Table.module.css";
export default function Table({ dataSingers }) {
  return (
    <div>
      <table className={styles.container}>
        <thead>
          <tr>
            <th>Name</th>
            <th >Fullname</th>
            <th >Genre</th>
            <th >email</th>
          </tr>
        </thead>
        <tbody>
          {dataSingers.map((dataSinger) => (
            <tr key={dataSinger._id}>
              <th className={styles.item}>{dataSinger.name}</th>
              <th className={styles.item}>{dataSinger.fullname}</th>
              <th className={styles.item}>{dataSinger.style}</th>
              <th className={styles.item}>{dataSinger.email}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
