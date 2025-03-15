const fs = require("fs");

const express = require("express");
let users =  require("./MOCK_DATA.json");
const app = express();
port = 5000;

// Middleware - Plugins
app.use(express.urlencoded({extended:false}));

// Route to get all users
app.get("/api/users/",(req,res)=>{
    return res.json(users);
});
app.get("/users/",(req,res)=>{
    const html = `<ul>
        ${users.map((user)=>{
           return `<li> User${user.id}
                <ol>
                    <li>Id : <strong>${user.id}</strong></li>
                    <li>FirstName : <strong>${user.first_name}</strong></li>
                    <li>LastName : <strong>${user.last_name}</strong></li>
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
app.get('/users/:id/',(req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id == id)
    const html = `<ul>
        <li>
            <ol>
                <li>Id : <strong>${user.id}</strong></li>
                <li>FirstName : <strong>${user.first_name}</strong></li>
                <li>LastName : <strong>${user.last_name}</strong></li>
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
.get((req,res)=>{
    const id =  Number(req.params.id);
    const user = users.find((user)=> user.id === id );
    return res.json(user);
})
.patch((req,res)=>{
    // Update a specified User
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id === id );
    if (!user) {
        return res.status(404).json({ error: "User Not Found" });
    }
    const body = req.body;
    user = { ...user, ...body };
    users = users.map(u => (u.id === id ? user : u));
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Error writing to file" });
        }
        res.json({ status: "Success", message: `User ID ${id} updated successfully`, user });
    });

})
.delete((req,res)=>{
    // Delete a specified User -----> DONE 
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id === id );
    if (!user ){
        return res.status(404).json({ error: "User Not Found" });
    }
    users = users.filter(user => user.id !== id);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({ status: "Success", message: `User ID ${id} deleted successfully` });
    });
});

app.post("/api/users/",(req,res)=>{
    // Create a new User
    const body = req.body;
    users.push({id:users.length +1,...body})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success",id:users.length});
    });
});






app.listen(port,()=>{
    console.log(`Server Working on http://localhost:${port}`);
});