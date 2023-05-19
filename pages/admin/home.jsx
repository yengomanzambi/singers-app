import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import ListSingers from "@/components/listsingers";
export default function Home() {
  const [input, setInput] = useState("");
  const [singers, setSingers] = useState([]);
  const [updateUi, setUpdateUi] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/singers`, { fullname: input,style:input,name:input })
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
        setSingers(res.data.users);
        console.log(res);
        console.log(singers);
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
          placeholder="tapez le nom de l'artiste"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.button}> Ajouter un artiste</button>
        <div className={styles.list}>
          {singers.map((singer) => (
            <ListSingers key={singer._id} singer={singer}/>
          ))}
        </div>
        
      </form>
    </div>
  );
}
