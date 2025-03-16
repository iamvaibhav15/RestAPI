let User = require("../models/user");

async function handleGetAllUsers(req, res) {
    let users = await User.find({});
    return res.json(users);
}

async function handleGetUserById(req, res) {
    // const id = req.params.id;
    let user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ "err": "user not found" });
    }
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    // Update a specified User
    // const id = Number(req.params.id)
    // const user = users.find((user) => user.id === id);
    // if (!user) {
    //     return res.status(404).json({ error: "User Not Found" });
    // }
    // const body = req.body;
    // user = { ...user, ...body };
    // users = users.map(u => (u.id === id ? user : u));
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    //     if (err) {
    //         return res.status(500).json({ error: "Error writing to file" });
    //     }
    //     res.json({ status: "Success", message: `User ID ${id} updated successfully`, user });
    // });
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        res.json({ status: "Success", message: `User ID ${id} updated successfully`, user });
    } catch (error) {
        res.status(500).json({ error: "Error updating user", details: error.message });
    }
}

async function handleDeleteUserById(req, res) {
    // Delete a specified User -----> DONE 
    // const id = Number(req.params.id)
    // const user = users.find((user) => user.id === id);
    // if (!user) {
    //     return res.status(404).json({ error: "User Not Found" });
    // }
    // users = users.filter(user => user.id !== id);
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "Success", message: `User ID ${id} deleted successfully` });
    // });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ "msg": "user not found" });
    }
    return res.json({ "msg": "Deleted Successfully" });
}

async function handleCreateUser(req, res) {
    // Create a new User
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        res.status(400).json({ "message": "all fields are required" });
    }
    // // When mongoDB is not used
    // users.push({ id: users.length + 1, ...body })
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "Success", id: users.length });
    // });

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender
    })
        .catch((err) => res.status(400).json({ "err": err.message }));
    return res.status(201).json({ msg: "Created", id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
}