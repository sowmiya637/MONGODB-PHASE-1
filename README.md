
# Phase 1 — Environment Setup & Testing (MongoDB)

##  Objective
This phase teaches you how MongoDB works in **real life**.  
You will learn:

- How MongoDB runs locally on your laptop
- How MongoDB runs on the cloud (MongoDB Atlas)
- How to switch between environments
- How performance differs between local and cloud
- How to handle errors and network failures

By the end of this phase, you will be comfortable with both **local MongoDB** and **Atlas**.

---

## 🔹 Task 1: Install MongoDB Locally & Connect via Mongo Shell

### Concept:
MongoDB can run locally like MySQL. Mongo Shell allows you to interact with MongoDB through terminal commands.

### Steps:
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Open Mongo Shell:
   ```bash
   mongosh
````

4. Test database creation:

   ```js
   use mylocaldb
   db.users.insertOne({ name: "Test User" })
   ```

---

## 🔹 Task 2: Install MongoDB Compass & Connect to Local

### Concept:

MongoDB Compass is a GUI for MongoDB, which helps visualize databases, collections, and documents.

### Steps:

1. Install MongoDB Compass
2. Connect using:

   ```
   mongodb://localhost:27017
   ```
3. Explore collections and documents visually

---

## 🔹 Task 3: Create MongoDB Atlas Cluster & Connect to Node.js

### Concept:

Atlas is MongoDB's cloud service. It allows global access, scaling, backup, and monitoring.

### Steps:

1. Sign in to MongoDB Atlas
2. Create a free cluster
3. Allow your IP (for development, use 0.0.0.0/0)
4. Create a DB user
5. Get the connection string:

   ```
   mongodb+srv://username:password@cluster.mongodb.net/test
   ```
6. Store the URL in `.env` for Node.js

---

## 🔹 Task 4: Switch Between Local & Atlas Using `.env`

### Concept:

Environment variables allow switching databases **without changing code**.

### `.env` Example:

```env
# Local MongoDB
LOCAL_DB=mongodb://localhost:27017/mydb

# Cloud MongoDB (Atlas)
ATLAS_DB=mongodb+srv://username:pass@cluster.mongodb.net/mydb

# Toggle database
USE_DB=local
```

### Node.js Connection:

```js
const mongoose = require("mongoose");

const db =
  process.env.USE_DB === "local"
    ? process.env.LOCAL_DB
    : process.env.ATLAS_DB;

mongoose.connect(db).then(() => console.log("Connected to DB"));
```

---

## 🔹 Task 5: Insert 50 Users & Measure Time

### Concept:

Compare **performance** of local vs cloud MongoDB.

### Example Script:

```js
console.time("insertTime");

const users = [];
for (let i = 1; i <= 50; i++) {
  users.push({ name: `User ${i}`, age: 20 + (i % 10) });
}

await User.insertMany(users);

console.timeEnd("insertTime");
```

* Local inserts = very fast
* Atlas inserts = slightly slower due to network latency

---

## 🔹 Task 6: Fetch All Users & Log Query Time

### Concept:

Observe **query performance** on local vs cloud DB.

```js
console.time("fetchTime");
const data = await User.find();
console.timeEnd("fetchTime");
```

* Local queries = faster
* Cloud queries = slightly slower

---

## 🔹 Task 7: Simulate Network Failure & Handle Errors

### Concept:

Real-world apps must **not crash** if MongoDB disconnects.

### How to Simulate:

* Turn off WiFi
* Use wrong Atlas password/IP

### Example Error:

```
MongooseServerSelectionError: connection timed out
```

### Error Handling:

```js
mongoose.connection.on("error", (err) => {
  console.log("MongoDB Connection Error:", err.message);
});
```


Do you want me to create that diagram?
```
