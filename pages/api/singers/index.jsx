import connectDB from "@/utils/mongoDb";
import User from "../../../models/User";
import APIFilters from "../../../utils/APIFilters";

export default async function handler(req, res) {
  const { method } = req;
  connectDB().catch(() =>
    res.status(405).json({ error: "erreur de connection mongodb" })
  );
  //GET: http://localhost:3000/api/singers/
  if (method === "GET") {
    try {
      const restPerPage = 0;
      const productCount = await User.countDocuments();

      const apiFilters = new APIFilters(User.find(), req.query)
        .search()
        .filter();
      let users = await apiFilters.query;
      const filteredProductsCount = users.length;
      apiFilters.pagination(restPerPage);

      users = await apiFilters.query.clone();
      if (!users)
        return res
          .status(404)
          .json({ error, msg: "l'utilisateur n'est pas trouver" });
      res
        .status(201)
        .json({ productCount, restPerPage, filteredProductsCount, users });
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
  // POST: http://localhost:3000/api/singers
  if (method === "POST") {
    try {
      const { name, fullname, style } = req.body;
      if (!fullname || !style || !name)
        return res.status(404).json({ error: "erreur d'enregistrement" });
      const newUser = new User({ name, fullname, style });
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
}
