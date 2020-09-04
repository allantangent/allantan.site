const express = require("express");
const session = require("express-session");
const body    = require("body-parser");
const app = express();
const port = 3003;
 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
 
var myUsers = [
    { id: 1, username: 'admin', password: 'admin', email: 'admin@example.com' },
    { id: 2, username: 'michael', password: 'password', email: 'mborkows@ucsd.edu' }
];
 
function findUser(username, func) {
    for ( let user of myUsers ) {
        if ( user.username === username ) {
            return func(null, user);
        }
    }
    return func(null, null);
}
 
passport.serializeUser(function(user, done) {
    done(null, user.username);
});
passport.deserializeUser(function(username, done) {
    findUser(username, function(err, user) {
        done(err, user);
    });
});
 
passport.use( new LocalStrategy({ usernameField: 'username',
                                  passwordField: 'password' },
    function(username, password, done) {
        findUser(username, function(err, user) {
            if ( err ) { return done(err); }
            if ( !user || user.password != password ) {
                return done(null, false, {
                    'message': 'User/password does not match'
                });
            }
            return done(null, user);
        });
    }
));
 
app.use(express.json());
app.use(session({ secret: 'nyan cat', resave: false, 
                  saveUninitialized: false }));
app.use(body());
app.use(passport.initialize());
app.use(passport.session());
 
function ensureAuthenticated(req, res, next) {
    if ( req.isAuthenticated() ) { return next(); }
    res.redirect('login');
}
 
////////////////////////////////////////////////////////////////////////////
 
// Public side: Login page
app.get('/login', function(req, res) {
    res.sendFile('public_html/login.html', { root: __dirname });
});
app.post('/login', passport.authenticate('local', 
    { successRedirect: 'home', failureRedirect: 'login'}
));
 
// In between: Logout
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('login');
});
 
// Private side: Home page
app.get('/home', ensureAuthenticated, function(req, res) {
        res.sendFile('public_html/index.html', { root: __dirname });
});
 
app.listen(port);
