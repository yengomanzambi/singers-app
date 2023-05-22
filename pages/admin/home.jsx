import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import ListSingers from "@/components/listsingers";
import Table from "@/components/table";

export default function Home() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [singers, setSingers] = useState([]);
  const [updateUi, setUpdateUi] = useState(false);
  console.log(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/singers`, { fullname: input, style: input, name: input, email:input })
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

  const search = (dataSingers) => {
    return dataSingers.filter(
      (dataSinger) =>
        dataSinger.name.toLowerCase().includes(query) ||
        dataSinger.fullname.toLowerCase().includes(query) ||
        dataSinger.email.toLowerCase().includes(query) ||
        dataSinger.style.map((item) => item.toLowerCase()).includes(query)
       
    );
  };

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          id="singer"
          className={styles.input}
          name="singer"
          placeholder="tapez le nom de l'artiste"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.button}> Ajouter un artiste</button>
        {/* <div className={styles.list}>
          {singers.filter(singer=>singer.fullname.toLowerCase().includes(query)).map((singer)=> (
            <ListSingers key={singer._id} singer={singer}/>
          ))}
        </div> */}
        <Table dataSingers={search(singers)} />
      </form>
    </div>
  );
}
