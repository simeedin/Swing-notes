const nedb = require('nedb-promise');
const db = new nedb({filename: 'notes.db', autoload: true});
const uuid = require('uuid-random');


 function createNote(title, text) {

    db.insert({
        title: title,
        text: text,
        createdAt: new Date().toJSON(), 
        modifiedAt: 'inga ändringar har gjorts',
        id: uuid()
    });
}


async function getNotes() {
    return await db.find({});
}

async function getNoteByTitle(title) {
    return await db.find({title: title});
}


module.exports = {createNote, getNotes, getNoteByTitle, db}