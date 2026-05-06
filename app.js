const express = require("express");
const { logEvent, setToken } = require("./logging-middleware");
const app = express();
app.use(express.json());
setToken(process.env.tokn);

let users = [];
let id = 1;

app.get("/users", (req, res) => {
  res.json(users);
});
app.post("/users", (req, res) => {

  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(400).json({
      message: "Enter all fields"
    });
  }

  const user = {
    id: id++,
    name: name,
    email: email
  };

  users.push(user);
  logEvent("backend", "info", "route", "Added user");
  res.json(user);
});

app.put("/users/:id", (req, res) => {

  const user = users.find(
    u => u.id == req.params.id
  );

  if (!user) {
    return res.json({
      message: "User not found"
    });
  }
  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  users = users.filter(
    u => u.id != req.params.id
  );
  res.json({
    message: "Deleted"
  });
});

app.listen(3000, () => {
  console.log("Server started");
});