const express = require('express');
const PORT = 8080;
const app = express();


app.get("/", (req, res) => {
  res.send("Hello server");
});

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});