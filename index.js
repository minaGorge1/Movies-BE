import dotenv from "dotenv";
dotenv.config({ path: "./Config/.env" })
import express from "express";


import initApp from "./src/app.router.js"
const app = express()
const port = 5000
initApp(app, express)



/* 
const todayForEvent = moment().startOf('day').utc().toDate(); 
console.log(todayForEvent);*/

app.listen(port, () => {
    console.log("server is running ...... ")
})