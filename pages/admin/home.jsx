import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
export default function Home() {
  const [input, setInput] = useState("");
  const [singer, setSinger] = useState([]);
  const [updateUi, setUpdateUi] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/singers`, { fullname: input,style:input })
      .then((res) => {
        console.log(res);
        setInput("");
        setUpdateUi(true);
      })
      .catch((err) => console.log(err));
    console.log(e.target);
  };
  useEffect(() => {
    axios
      .get(`/api/singers`)
      .then((res) => {
        setSinger(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateUi]);

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="singer" className={styles.label}>
          Entrez lz nom de l'artiste
        </label>
        <input
          type="text"
          id="singer"
          className={styles.input}
          name="singer"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.button}> Ajouter un artiste</button>
        <div className={styles.list}>
          {singer.map((s) => (
            <li key={s._id}>{s.fullname}</li>
          ))}
        </div>
      </form>
    </div>
  );
}
