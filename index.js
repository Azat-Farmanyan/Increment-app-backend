const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
// app.get("/candy", (req, res) => {
//   res.set("Access-Control-Allow-Origin", "http://localhost:8000");
//   res.json({ candy: "bubble-gum" });
// });
var cors = require("cors");
app.use(express.json());
app.use(cors());
const user = {
  email: "azat@mail.ru",
  password: "1234",
};
app.post("/login", async (req, res) => {
  // console.log(req);
  const { email, password } = req.body;
  // console.log(email, password, user[email], email);
  if (!email.length || user.email != email) {
    return res.status(400).json({ message: "email is incorrect" });
  }
  if (!password?.length || user.password !== password) {
    return res.status(400).json({ message: "password is incorrect" });
  }

  const token = await jwt.sign({ email }, "very secret jwt code");
  return res.status(200).json({ token });
});

app.post("/increment", async (req, res) => {
  const Auth = req.headers.authorization?.split("Bearer")[1];
  const { count } = req.body;
  if (Auth) {
    const result = count === 0 ? 1 : count * 2;
    console.log(result);
    return res.status(200).json(result);
  }
  return res.status(401).json({ message: "you are not authorized" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
