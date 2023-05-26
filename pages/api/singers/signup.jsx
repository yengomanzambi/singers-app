import connectDB from "@/utils/mongoDb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
// import APIFilters from "../../../utils/APIFilters";
export default async function handler(req, res) {
  const { method } = req;
  connectDB().catch(() =>
    res.status(405).json({ error: "erreur de connection mongodb" })
  );

    
  // register user POST: http://localhost:3000/api/singers
  if (method === "POST") {
    try {
      //hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,salt);
      
      const newUser = new User({
        name: req.body.name,
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
      });
      //save user and response
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
}