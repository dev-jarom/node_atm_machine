const { response } = require('express');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

let users = [
    {
        username: "admin",
        password: "admin",
        first_name: "Pedro",
        last_name: "Penduko",
        email: "pedro@gmail.com",
        balance: 600
    },
    {
        username: "user",
        password: "password",
        first_name: "Juan",
        last_name: "Luna",
        email: "luna@gmail.com",
        balance: 1200
    },
];
let logged_in_user = null;
let error_message = "";

app.get('/', (req, res) => {
    if(logged_in_user) return res.redirect('/dashboard')

    res.render('pages/index', {error_message});
})

app.post('/login', (req, res) => {

    // console.log(req.body);

    users.forEach(
        item => {
            if(item.username == req.body.username && item.password == req.body.password){
                logged_in_user = item;
            }
        }
    );
    
    if(! logged_in_user){
        error_message = "Invalid username and password";
        return res.redirect('/');
    }

    return res.redirect('/dashboard')
})



app.get('/register', (req, res) => {
    res.render('pages/register');
})
app.post('/register', (req, res) => {
    console.log(req.body);
    req.body.balance = 0;
    users.push(req.body);
    return res.redirect('/');
})

app.get('/dashboard', (req, res) => {
    // console.log(logged_in_user);
    if(! logged_in_user) return res.redirect("/");
    res.render('pages/dashboard');
})
app.get('/check_balance', (req, res) => {
    if(! logged_in_user) return res.redirect("/");
    res.render('pages/check_balance', {logged_in_user});
})
app.get('/withdraw', (req, res) => {
    if(! logged_in_user) return res.redirect("/");
    res.render('pages/withdraw', {logged_in_user});
})
app.get('/deposit', (req, res) => {
    if(! logged_in_user) return res.redirect("/");
    res.render('pages/deposit', {logged_in_user});
})
app.post('/withdraw', (req, res) => {
    if(! logged_in_user) return res.redirect("/");
    logged_in_user.balance -= req.body.amount
    res.render('pages/transaction_finished', {logged_in_user});
})
app.post('/deposit', (req, res) => {
    if(! logged_in_user) return res.redirect("/");
    logged_in_user.balance += parseInt(req.body.amount);
    res.render('pages/transaction_finished', {logged_in_user});
})
app.get('/transaction_finished', (req, res) => {
    if(! logged_in_user) return res.redirect("/");
    res.render('pages/transaction_finished', {logged_in_user});
})

app.get('/logout', (req, res) => {
    logged_in_user = "";
    return res.redirect('/');
})


app.listen(3000, () => {
    console.log("On port 3000");
})

