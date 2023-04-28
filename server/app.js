import dotenv from "dotenv"
dotenv.config();
import express from "express"
import connect from "./config/db.js";
import usersRoute from './routes/user.js';
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
connect();
app.use(express.json());
app.use(cors());

app.use("/api/v1.0/users",usersRoute)
app.listen(port,()=>{
    console.log(`server listen on port ${port}`)
})