const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//signIn
router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('signin', { 
    message: req.flash("error"),
	});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successReturnToOrRedirect : 'main',
  failureRedirect : '/login',
  failureFlash: true,
  passReqToCallback: true
}));

//signUp
router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('signup');
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successReturnToOrRedirect : 'main',
  failureRedirect : '/signup',
  failureFlash: true,
  passReqToCallback: true
}));

//logout
router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;