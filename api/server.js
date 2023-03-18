const express = require("express");
const mongoose  = require("mongoose");
const dotenv = require("dotenv")
const app = express();
const cors  = require("cors")
const logger = require("morgan")
const port = 5000;
dotenv.config();
mongoose.set("strictQuery", false);

app.use(logger("dev"))
app.use(express.json())
app.use(cors())

const categoryRoute = require("./router/categories.js")
const productRoute = require("./router/products.js")
const authRoute = require("./router/auth.js")
const usersRoute = require("./router/users.js")
const billRoute = require("./router/bills.js")

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongodb")
    }catch(error){
        throw(error)

    }
}

app.use("/api/categories", categoryRoute )
app.use("/api/products", productRoute )
app.use("/api/auth", authRoute )
app.use("/api/users", usersRoute)
app.use("/api/bills",billRoute)
app.get("/", (req, res) => res.send("Hello"));

app.listen(port, () => {
    connect();
    console.log(`Example app listening on port ${port}`);
});