const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const path          = require('path');
const passport      = require('passport');
//const routes        = require('routes');
const mongoose      = require('mongoose');
const morgan        = require('morgan');
const jwt           = require('jsonwebtoken');
const MongoClient   = require('mongodb').MongoClient;
const configDB      = require('./config/database.js');
var User            = require('./app/models/user');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

//mongodb connect
MongoClient.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({secret: 'thisistestingcode'}));

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

require('./routes/routes.js')(app,passport);

//create API group routes
var apiRouter = express.Router();

//Sign up users

//Authenticate the user


//Protect route

//connect to the database
var db

MongoClient.connect('mongodb://suraj:suraj@ds139909.mlab.com:39909/crudapp1', function(err,database){
    if(err) return console.log(err)
    db = database
    app.listen(3000,function(){
        console.log('listening on 3000')
    })
})

//use body parser here
app.use(bodyParser.urlencoded({extended:true}));


/*app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});*/

/*app.post('/quotes',function(req, res){
   db.collection('quotes').save(req.body,function(err,result){
       if(err) return console.log(err)
       console.log('saved to database')
       res.redirect('/')
   })
})*/

//index route
app.get('/',function(req, res) {
res.render('index.ejs',{
    title : 'Index'
}); 
});   
     
//login route
app.get('/login',function(req,res){
    res.render('login',{
        title: 'login'
    });
});

//signup route
app.get('/signup',function(req,res){
    res.render('signup',{
        title:'signup'
    });
});