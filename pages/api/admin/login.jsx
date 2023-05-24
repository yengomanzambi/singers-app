import cookie from "cookie";

export default function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const { username, password } = req.body;
    console.log(username);
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60,
          samesite: "strict",
          path: "/",
        })
      );

      res.status(200).json("reussi");
    } else {
      res.status(400).json("wrong credentials");
    }
  }
}
