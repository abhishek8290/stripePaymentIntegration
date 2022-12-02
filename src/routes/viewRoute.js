const express = require('express');
const router = express.Router();


const  redirectLogin = ( req, res, next ) => {
    if(!req.headers.accesstoken){
        res.redirect('/login')
    }
    else next();
}
const redirectHome = ( req, res, next ) => {
    if(req.headers.accesstoken)res.redirect('/home');
    else next();
}

router.get('/',(req,res)=>{
    // validate Access Token
    res.send( `
    <h1>Welcome !</h1>
    ${  (req.headers.accesstoken) ? `
    <a href = '/home'>Home</a>
    <form method = 'post' action ='/logout'>
    <button>Logout</button>
    </form>
    ` : `
    <a href = '/login'>Login</a>
    <a href = '/register'>Register</a>
    `}
    ` )
});

router.get('/login',redirectHome,(req,res) => {
    res.send(`
    <h1>Login<h1>
    <form method = 'post' action = '/login'>
        <input type = 'email' name = 'email' placeholder= 'Email' required/>
        <input type = 'password' name = 'password' placeholder= 'Password' required/>
        <input type ='submit'>
    </form>
    <l1><a href = '/register'>Register</a></l1>
    `)
});

router.get('/register',redirectHome,(req,res) => {
    res.send(`
    <h1>Register<h1>
    <form method = 'post' action = '/register'>
        <input type = 'name' name = 'name' placeholder= 'Name' required/>
        <input type = 'email' name = 'email' placeholder= 'Email' required/>
        <input type = 'password' name = 'password' placeholder= 'Password' required/>
        <input type ='submit'>
    </form>
    `)
});

router.get('/home',redirectLogin,(req,res) => {
    res.send(`
        <h1>Home</h1>
        <a href = '/'>main</a>
        <ul>
            <li><a href = '/addPatient'>Add Patient</a></li>
            <li><a href = '/updatePatient'>Update Patient</a></li>
            <li><a href = '/deletePatient'>Delete Patient</a></li>
            <li><a href = '/getallwalletamountclause'>Get all patient with wallent amount greater than</a></li>
        </ul>
        <form method ='post' action = '/logout'>
            <button>Logout</button>
        </form>
    `)
});

router.get('/addUser',redirectLogin,(req,res) => {
    res.send(`
    <h1> Add Patient </h1>
    <form method = 'post' action = '/api/addPatient' >
        <input type = 'name' name = 'name' placeholder= 'Name' required/>
        <input type = 'age' name = 'age' placeholder= 'Age' required/>
        <input type = 'gender' name = 'gender' placeholder= 'Gender' required/>
        <input type = 'walletAmount' name = 'walletAmount' placeholder= 'Wallet Amount' required/>
        <input type ='submit'>
    </form>
    `)

});

router.get('/updateUser',redirectLogin,(req,res) =>{
    res.send(`
    <h1> Update Patient Name </h1>
    <form method ='post' action = '/api/updatePatient'>
        <input type ='id' name ='id', placeholder = 'id' required/>
        <input type = 'name' name ='name' placeholder='Name' required/>
        <input type='submit'>
    </form>
    `)
});

router.get('/delteUser',redirectLogin ,(req,res) => {
    res.send(`
    <h1>Delete Patient</h1>
    <form method='post' action ='/api/deletePatient'>
        <input type ='id' name ='id' placeholder = 'id' required />
        <input type = 'submit'>
    </form>
    `)
});


module.exports= router;
