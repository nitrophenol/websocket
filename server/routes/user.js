const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');


// GET /api/user/:username
router.get('/',authMiddleware, (req, res, next) => {
    User.findOne({ username: req.username })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            next(err);
        });
});


module.exports = router;
