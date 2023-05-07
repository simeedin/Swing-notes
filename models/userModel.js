const nedb = require('nedb-promise');
const db = new nedb({filename: 'users.db', autoload: true});
const uuid = require('uuid-random');

const {hashPassword} = require('../utils/utils');

async function createUser(username, password) {
    const pass = await hashPassword(password);

    db.insert({
        username: username,
        password: pass,
        id: uuid()
    });
}

async function findUserName(username) {
    return await db.findOne({username: username});
}


module.exports = {createUser, findUserName}