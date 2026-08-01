const express = require("express");
const router = express.Router();

// ✅ import controller
const { getUsers, createUser } = require("../controllers/userController");

// ✅ GET route
router.get("/", getUsers);

// ✅ POST route (ONLY ONE)
router.post("/", createUser);

// ✅ GET by ID
router.get("/:id", (req, res) => {
    res.json({
        success: true,
        id: req.params.id
    });
});

module.exports = router;