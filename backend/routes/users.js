const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const newUser = new User({
        id
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findOne({id: req.params.id})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findOneAndDelete({id: req.params.id})
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findOne({id: req.params.id})
        .then(user => {
            //user.protocol = req.body.protocol;
            user.Dai = req.body.Dai;
            user.Eth = req.body.Eth;
            user.USDC = req.body.USDC;
            // user.protocol_dai =Request.body.protocol_dai
            // user.protocol_eth =Request.body.protocol_eth
            // user.protocol_usdc =Request.body.protocol_usdc
            user.trans.push({
                fromTodai: req.body.daimessage,
                fromToeth: req.body.ethmessage,
                fromTousdc: req.body.usdcmessage,
                Daiamount: req.body.daiamount,
                Ethamount: req.body.ethamount,
                Usdcamount: req.body.usdcamount,})
            
            user.save()
                .then(() => res.json('user updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;