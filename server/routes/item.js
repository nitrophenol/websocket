const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const User = require('../models/User');

// GET /api/items
router.get('/', (req, res, next) => {
    Item.find()
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            next(err);
        });
});

// GET /api/items/:id
router.get('/:id', (req, res, next) => {
    Item.findById(req.params.id)
        .then(item => {
            res.json(item);
        })
        .catch(err => {
            next(err);
        });
});

// POST /api/items
router.post('/', (req, res, next) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        seller: req.body.seller,
    });

    newItem.save()
        .then(item => {
            res.json(item);
        })
        .catch(err => {
            next(err);
        });
});

// PUT /api/items/:id
router.put('/:id', (req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    }, { new: true })
        .then(item => {
            res.json(item);
        })
        .catch(err => {
            next(err);
        });
});

// DELETE /api/items/:id
router.delete('/:id', (req, res, next) => {
    Item.findByIdAndDelete(req.params.id)
        .then(item => {
            res.json(item);
        })
        .catch(err => {
            next(err);
        });
});


module.exports = router;
