const express = require("express")
const users =  require("./MOCK_DATA.json")
const app = express()
port = 5000

// Route to get all users
app.get("/api/users",(req,res)=>{
    return res.json(users);
});
app.get("/users",(req,res)=>{
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
app.get('/users/:id',(req,res)=>{
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
app.route("/api/users/:id")
.get((req,res)=>{
    const id =  Number(req.params.id);
    const user = users.find((user)=> user.id === id );
    return res.json(user);
})
.patch((req,res)=>{
    // Update a specified User
    return res.json({status:"Pending"})
})
.delete((req,res)=>{
    // Delete a specified User
    return res.json({status:"Pending"})
});

app.put("/api/users",(req,res)=>{
    // Create a new User
    return res.json({status:"Pending"})
})






app.listen(port,()=>{
    console.log(`Server Working on http://localhost:${port}`);
})