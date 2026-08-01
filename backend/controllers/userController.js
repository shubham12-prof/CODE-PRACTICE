// Temporary database (in-memory)
let users = [
    { id: 1, name: "Shubham" },
    { id: 2, name: "Rahul" }
];

// ✅ GET USERS
const getUsers = (req, res) => {
    res.json({
        success: true,
        data: users
    });
};

// ✅ ADD USER
const createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);

    res.json({
        success: true,
        data: newUser
    });
};

module.exports = { getUsers, createUser };