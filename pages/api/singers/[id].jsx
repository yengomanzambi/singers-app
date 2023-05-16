import connectDB from "@/utils/mongoDb";
import User from "../../../models/User";
export default async function handler(req, res) {
  const { method } = req;
  connectDB();
  // PUT / http://localhost:3000/api/singers/2
  if (method === "PUT") {
    try {
      const formData = req.body;
      const user = await User.findByIdAndUpdate(
        { _id: req.query.id },
        formData
      );
      if (!formData)
        return res
          .status(404)
          .json({ error: "aucun utilisateur selectionner" });
      if (!user)
        return res.status(404).json({ error: "identifiant introuvable" });
      user.fullname = req.body.fullname;
      await user.save();
      res.status(200).json({ user, msg: "utilisateur modifier" });
    } catch (error) {
      res.status(500).json({ error, msg: "erreur serveur" });
    }
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
