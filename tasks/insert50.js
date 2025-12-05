import { connectDB } from "../config/db.js";
import User from "../models/User.js";


await connectDB();


console.time("insertTime");


const users = [];
for (let i = 1; i <= 50; i++) {
users.push({ name: `User ${i}`, age: 20 + (i % 10) });
}


await User.insertMany(users);
console.timeEnd("insertTime");


process.exit();