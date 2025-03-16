const express = require("express");
const router = express.Router();
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser, } = require("../controllers/user")

// Route to get all users
router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser);
// router.get("/api/users/", async (req, res) => {
//     let users = await User.find({});
//     return res.json(users);
// });

// router.get("/users/", async (req, res) => {
//     let users = await User.find({});
//     const html = `<ul>
//         ${users.map((user) => {
//         return `<li> User
//                 <ol>
//                     <li>Id : <strong>${user._id}</strong></li>
//                     <li>FirstName : <strong>${user.firstName}</strong></li>
//                     <li>LastName : <strong>${user.lastName}</strong></li>
//                     <li>Email : <strong>${user.email}</strong></li>
//                     <li>JobTitle : <strong>${user.job_title}</strong></li>
//                     <li>Gender : <strong>${user.gender}</strong></li>
//                 </ol>
//             </li>
//             <br>
//             `
//     }).join("")}
//     </ul>`
//     return res.send(html);
// });

// Route to get specified user
// app.get("/api/users/:id",(req,res)=>{
//     const id =  Number(req.params.id);
//     const user = users.find((user)=> user.id === id );
//     return res.json(user);
// });

// router.get('/users/:id/', async (req, res) => {
//     const id = req.params.id
//     let user = await User.findOne({ _id: id });
//     const html = `<ul>
//         <li>
//             <ol>
//                 <li>Id : <strong>${user._id}</strong></li>
//                 <li>FirstName : <strong>${user.firstName}</strong></li>
//                 <li>LastName : <strong>${user.lastName}</strong></li>
//                 <li>Email : <strong>${user.email}</strong></li>
//                 <li>JobTitle : <strong>${user.job_title}</strong></li>
//                 <li>Gender : <strong>${user.gender}</strong></li>
//             </ol>
//         </li>
//     </ul>`
//     return res.send(html);
// });


// Creating the merged routes for different methods having similar routes

router.route("/:id/")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;