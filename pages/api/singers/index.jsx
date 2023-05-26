import connectDB from "@/utils/mongoDb";
import User from "../../../models/User";
// import APIFilters from "../../../utils/APIFilters";
export default async function handler(req, res) {
  const { method } = req;
  connectDB().catch(() =>
    res.status(405).json({ error: "erreur de connection mongodb" })
  );
  //GET: http://localhost:3000/api/singers/
  if (method === "GET") {
    try {
      const { q } = req.query;
      console.log("++++", q);

      // const restPerPage = 0;
      // const productCount = await User.countDocuments();

      // const apiFilters = new APIFilters(User.find(), req.query)
      // .search()
      // .filter();
      // let users = await apiFilters.query;
      // const filteredProductsCount = users.length;
      // apiFilters.pagination(restPerPage);

      // users = await apiFilters.query.clone();
      const users = await User.find();

      const keys = ["name", "fullname", "email"];
      const search = (dataSingers) => {
        return dataSingers.filter(
          (dataSinger) =>
            keys.some((key) => dataSinger[key].toLowerCase().includes(q))

          //   //     // METHODE1
          //   //       // dataSinger.name.toLowerCase().includes(query) ||
          //   //       // dataSinger.fullname.toLowerCase().includes(query) ||
          //   //       // dataSinger.email.toLowerCase().includes(query) ||
          //   //       // dataSinger.style.map((item) => item.toLowerCase()).includes(query)
        );
      };

      if (!users)
        return res
          .status(404)
          .json({ error, msg: "l'utilisateur n'est pas trouver" });

      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
  // register user POST: http://localhost:3000/api/singers
  if (method === "POST") {
    try {
      const { name, fullname, style, email } = req.body;
      if (!fullname || !style || !name || !email)
        return res.status(404).json({ error: "erreur d'enregistrement" });
      const newUser = new User({ name, fullname, email, style });
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
}
