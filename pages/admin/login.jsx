import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios"
import styles from "../../styles/Login.module.css"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    try {
      axios.post(`/api/admin/login`, { username, password });
       router.push("/admin/home");
    } catch (error) {
        console.log("hello")
      setError(true);
     

    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">
          Bienvenue.
        </h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Nom
            </label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={(e)=>setUsername(e.target.value)}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
             onChange= {(e)=>setPassword(e.target.value)}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm leading-5 text-gray-900"
              >
                {" "}
                Se souvenir de moi{" "}
              </label>
            </div>
            <a href="#" className="text-sm">
              {" "}
              Mot de passe oublié?{" "}
            </a>
          </div>
          <div className="mt-6">
            <button
              onClick={handleClick}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Se Connecter
            </button>
            {error && <span className={styles.error}> wrong credential</span>}
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="underline">
              Sign up for an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
