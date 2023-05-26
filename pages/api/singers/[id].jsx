import connectDB from "@/utils/mongoDb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
export default async function handler(req, res) {
  const { method } = req;
  connectDB();
  // PUT / http://localhost:3000/api/singers/2
  if (method === "PUT") {
    const formData = req.body;
    console.log(formData.password);
    console.log(req.query.id);
    if (formData.userId === req.query.id) {
      if (formData.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(formData.password, salt);
        } catch (error) {
          res.status(500).json("erreur serveur");
        }
      }
      try {
        const user = await User.findByIdAndUpdate(
          { _id: req.query.id },
          {
            $set: formData,
          }
        );
        res.status(200).json({ user, msg: "utilisateur modifier" });
      } catch (error) {
        res.status(500).json({ error, msg: "erreur serveur" });
      }
    } else {
      res
        .status(403)
        .json("impossible de modifier ce compte ce ne pas le votre ");
    }

    // if (!formData)
    //   return res
    //     .status(404)
    //     .json({ error: "aucun utilisateur selectionner" });
    // if (!user)
    //   return res.status(404).json({ error: "identifiant introuvable" });
    // user.fullname = req.body.fullname;
    // await user.save();
  }
  if (method === "DELETE") {
    try {
      const user = await User.findByIdAndDelete({ _id: req.query.id });
      if (!user)
        return res
          .status(404)
          .json({ error: "l'utilisateur n'est pas trouver" });

      res.status(201).json({ user, msg: "utilisateur supprimer" });
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
  if (method === "GET") {
    try {
      const user = await User.findById({ _id: req.query.id });
      if (!user)
        return res
          .status(404)
          .json({ error: "l'utilisateur n'est pas truver" });

      res.status(200).json({ user, msg: "voila l'utilisateur" });
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
  }
}
