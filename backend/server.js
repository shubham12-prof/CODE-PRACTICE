// require("express") → imports Express library
// Express = framework to build APIs easily

// 👉 Without Express, you’d write raw Node HTTP server (complex)
const express = require("express");
const cors = require("cors")

// Creates your server application
// app is now your main controller

// 👉 You’ll use app.get, app.post, etc.
const app = express();

// Middleware = runs before request reaches route
// express.json() parses JSON body
// 👉 Example: { "name": "John" }
app.use(express.json());
app.use(cors());

// ✅ FIX: correct path (depends where server.js is)
const userRoutes = require("./routes/userRoutes")   // 🔥 changed

// Use routes
app.use("/api/users", userRoutes);

// app.get() → handles GET request
// / → route (homepage)
// Params:
// req → request object (data from client)
// res → response object (send data back)
app.get("/", (req, res) => {
    res.send("API Running...");
});

// Starts server on port 5000
// Callback runs when server starts
const PORT = 5000;  // ✅ small improvement (clean practice)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});