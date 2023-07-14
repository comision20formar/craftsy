const express = require("express");
const path = require("path");

const app = express();
const PORT = 3030;

app.use(express.static('public'));

/* rutas */
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "home.html"))
);
app.get("/header", (req, res) =>
  res.sendFile(path.join(__dirname, "views","partials", "header.html"))
);

app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "register.html"))
);

app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "login.html"))
);

app.get("/profile", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "profile.html"))
);

app.listen(PORT, () =>
  console.log("Server running in http://localhost:" + PORT)
);
