const express    = require('express');
const router     = express.Router();
const passport   = require('passport');
const PlaceSave = require('../models/googlePlace.js');
const User       = require('../models/user.js');
const ObjectId   = require('mongoose').Types.ObjectId;
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//index
router.get('/', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/route', {
        user : req.user
    });
});

router.get('/route', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/route', {
        user : req.user
    });
});

router.get('/farm', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/farm', {
        user : req.user
    });
});

router.get('/account', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/account', {
        user : req.user
    });
});

//Crud for User
//show user
router.get('/account', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    if (err) {
      return next(err);
    } else {
        res.render('profile/account', {req, user});
    }
  });
});

//this for edit from a link 
router.get('/account/:id', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    res.render('profile/account/:id', {req, user: req.user});
  } else {
    res.redirect('profile/account');
  }
});

//trigger update
router.post('/account/:id', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.id;

  const updates = {
      username: req.body.name,
      email: req.body.email
  };
  
  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err)       { return res.render('profile/account', { user, errors: user.errors }); }
    if (!user) { return next(new Error("404")); }
    return res.redirect('profile/account');
  });
});



//Check this spaghetti crud

//Crud for Route
// router.get('/:id/route', (req, res, next) => {
//   PlaceSave.findById(req.params.id, (err, route) => {
//     res.render('profile/route', { route })
//   });
// });

// router.post('/:id/delete', (req, res, next) => {
//   const routeId = req.params.id;
//   PlaceSave.findByIdAndRemove(routeId, (err, route) => {
//     if (err){ return next(err); }
//     return res.redirect('profile/route');
//   });
// });


module.exports = router;
