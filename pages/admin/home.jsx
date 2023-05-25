import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import ListSingers from "@/components/listsingers";
import Table from "@/components/table";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


export default function Home({username}) {
  console.log("oooo",process.env.TOKEN)
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [singers, setSingers] = useState([]);
  const [updateUi, setUpdateUi] = useState(false);
  const router = useRouter();

  const keys = ["name", "fullname", "email"];
  console.log(username)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/singers`, { fullname: input })
      .then((res) => {
        console.log(res);
        setInput("");
        setUpdateUi(true);
      })
      .catch((err) => console.log(err));
    console.log(e.target);
  };
  useEffect(() => {
    const getUser = async (z) => {
      axios
        .get(`/api/singers/?q=${query}`)
        .then((res) => {
          setSingers(res.data);
          console.log(res.data);
          console.log(singers);
          const myCookie = Cookies.get("token") || ""
          
          
          
          // const myCookie = ctx.req?.cookies || "";
          if (!myCookie ) {
           router.push("/admin/login")
           
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser(process.env.TOKEN);
  }, [query]);

  const search = (dataSingers) => {
    return dataSingers.filter(
      (dataSinger) =>
        keys.some(
          (key) =>
            dataSinger[key].toLowerCase().includes(query) ||
            dataSinger[key].toUpperCase().includes(query)
        )

      // METHODE1
      // dataSinger.name.toLowerCase().includes(query) ||
      // dataSinger.fullname.toLowerCase().includes(query) ||
      // dataSinger.email.toLowerCase().includes(query) ||
      // dataSinger.style.map((item) => item.toLowerCase()).includes(query)
    );
  };

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="search"
            className="relative m-auto block w-2/5 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            id="exampleSearch"
            placeholder="cherche les artistes"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {/* <input
          type="text"
          id="singer"
          className={styles.input}
          name="singer"
          placeholder="tapez le nom de l'artiste"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> */}

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
// export const getServerSideProps = async (ctx) => {
//   console.log(";;;;;;",ctx.req?.cookies.token);

  

// };
