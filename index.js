const express = require("express");
const app = express();
const db = require("mongoose");

PORT=8000;
MONGO_URI="mongodb+srv://amrit2104:sxwyxb7NMwSBQCC4@cluster0.yzowgze.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());

db.connect(MONGO_URI);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});