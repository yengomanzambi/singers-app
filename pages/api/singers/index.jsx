import connectDB from "@/utils/mongoDb";
import User from "../../../models/User";

export default async function handler(req, res) {

  const { method } = req;
  
  connectDB().catch(() =>
    res.status(405).json({ error: "erreur de connection mongodb" })
  );
  //GET: http://localhost:3000/api/singers/
  if (method === "GET") {
    try {
      
      const users = await User.find();
      if (!users) return res .status(404) .json({ error, msg: "l'utilisateur n'est pas trouver" });
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
  // POST: http://localhost:3000/api/singers
  if (method === "POST") {
   
    try {
         const { fullname,style } = req.body;
         if(!fullname || !style) return res.status(404).json({error:"erreur d'enregistrement"})
    const newUser = new User({ fullname,style });
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
}
