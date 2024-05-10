const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
app.use(express.json());
app.use(require('./routes/router'));
dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 5000;

//const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//for connect MongoDB server
const Connect = async () => {
  await mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log('connected');
    })
    .catch((err) => {
      console.log(err);
    });
};
Connect();

//for lisning the port
app.listen(PORT, () => {
  console.log(`app is Listening on port no ${PORT}`);
});
