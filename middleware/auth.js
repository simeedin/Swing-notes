const jwt = require('jsonwebtoken');

async function auth(request, response, next) {
    const token = request.headers.authorization.replace('Bearer', '');

    try {
        const data = jwt.verify(token, 'a1b1c1');

        request.token = token;
        request.id = data.id;
        next();
    }
    catch (error) {
        response.json({success: false, error: 'Invalid token'});
    }
}

module.exports = {auth}