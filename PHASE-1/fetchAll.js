import { connectDB } from "../config/db.js";
import User from "../models/User.js";


await connectDB();


console.time("fetchTime");
const data = await User.find();
console.timeEnd("fetchTime");


console.log("Fetched Records:", data.length);


process.exit();
