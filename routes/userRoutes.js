const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const {createUser, findUserName} = require('../models/userModel');
const {comparePassword} = require('../utils/utils');


router.post('/signup', (request, response) => {
    const {username, password} = request.body;

    createUser(username, password);

    response.json({success: true});
});


router.post('/login', async (request, response) => {
    const {username, password} = request.body;

    const user = await findUserName(username);

    const result = {
        success: false
    }

    if (user) {
        const correctPassword = await comparePassword(password, user.password);

        if (correctPassword) {
            result.success = true;

            result.token = jwt.sign({id: user.id}, 'a1b1c1', {
                expiresIn: 600
            });

        }
    }

    response.json(result);
});

module.exports = router;



