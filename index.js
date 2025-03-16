const fs = require("fs");

const mongoose = require("mongoose");
const express = require("express");
// let users = require("./MOCK_DATA.json");
const app = express();
port = 5000;


// Middleware - Plugins
app.use(express.urlencoded({ extended: false }));


// app.use((req,res,next)=>{
//     console.log("Hello From Middleware 1");
//     next();
// })

// Connection to Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/FirstDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error", err));


// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String
    },
    gender: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema);


// Route to get all users
app.get("/api/users/", async (req, res) => {
    let users = await User.find({});
    return res.json(users);
});

app.get("/users/", async (req, res) => {
    let users = await User.find({});
    const html = `<ul>
        ${users.map((user) => {
        return `<li> User
                <ol>
                    <li>Id : <strong>${user._id}</strong></li>
                    <li>FirstName : <strong>${user.firstName}</strong></li>
                    <li>LastName : <strong>${user.lastName}</strong></li>
                    <li>Email : <strong>${user.email}</strong></li>
                    <li>JobTitle : <strong>${user.job_title}</strong></li>
                    <li>Gender : <strong>${user.gender}</strong></li>
                </ol>
            </li>
            <br>
            `
    }).join("")}
    </ul>`
    return res.send(html);
});

// Route to get specified user
// app.get("/api/users/:id",(req,res)=>{
//     const id =  Number(req.params.id);
//     const user = users.find((user)=> user.id === id );
//     return res.json(user);
// });
app.get('/users/:id/', async (req, res) => {
    const id = req.params.id
    let user = await User.findOne({ _id: id });
    const html = `<ul>
        <li>
            <ol>
                <li>Id : <strong>${user._id}</strong></li>
                <li>FirstName : <strong>${user.firstName}</strong></li>
                <li>LastName : <strong>${user.lastName}</strong></li>
                <li>Email : <strong>${user.email}</strong></li>
                <li>JobTitle : <strong>${user.job_title}</strong></li>
                <li>Gender : <strong>${user.gender}</strong></li>
            </ol>
        </li>
    </ul>`
    return res.send(html);
});


// Creating the merged routes for different methods having similar routes
app.route("/api/users/:id/")
    .get(async (req, res) => {
        // const id = req.params.id;
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ "err": "user not found" });
        }
        return res.json(user);
    })
    .patch(async(req, res) => {
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
        try{
            const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if (!user){
            return res.status(404).json({ error: "User Not Found" });
        }
        res.json({ status: "Success", message: `User ID ${id} updated successfully`, user });
        }catch (error) {
            res.status(500).json({ error: "Error updating user", details: error.message });
        }
    })
    .delete(async (req, res) => {
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
        if (!user){
            return res.status(404).json({"msg":"user not found"});
        }
        return res.json({"msg":"Deleted Successfully"});
    });

app.post("/api/users/", async (req, res) => {
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

    await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender
    })
    .catch((err)=> res.status(400).json({"err":err.message}));
    return res.status(201).json({ "msg": "Created" });
});






app.listen(port, () => {
    console.log(`Server Working on http://localhost:${port}`);
});