import connectDB from "@/utils/mongoDb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
// import APIFilters from "../../../utils/APIFilters";
export default async function handler(req, res) {
  const { method } = req;
  connectDB().catch(() =>
    res.status(405).json({ error: "erreur de connection mongodb" })
  );
  // login user POST: http://localhost:3000/api/singers/login
  if (method === "POST") {
    try {
      //hashing password
      const user = await User.findOne({ email: req.body.email });
       !user && res.status(404).json("l'utisateur ne pas trouver")

       const validPassword= await bcrypt.compare(req.body.password,user.password)
       !validPassword && res.status(400).json("mot de passe invalid")
       res.status(201).json(user);
      //save user and response
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
}
