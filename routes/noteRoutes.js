const {Router, response} = require('express');
const router = Router(); 
const {check, validationResult} = require('express-validator');

const {createNote, getNotes, getNoteByTitle, db} = require('../models/noteModel');
const {auth} = require('../middleware/auth');




router.post('/', auth, [check('title').isLength({max: 50}).withMessage('maxlängd på titel är 50 tecken'),
    check('text').isLength({max: 300}).withMessage('maxlängd på anteckning är 300 tecken')],
    (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    } 
    const {title, text} = request.body;
    createNote(title, text);

    response.json({
    success: true
    });

});

router.get('/', auth, async (request, response) => {
    const notes = await getNotes();
    response.json({
        success: true,
        notes: notes
    });
});

router.put('/', auth, (request, response) => {
    const {id, title, text} = request.body;

    db.update({id: id}, {$set: {
        title: title, 
        text: text, 
        modifiedAt: new Date().toJSON()
    }});
    
    
    response.json({success: true});
});

router.delete('/', auth, (request, response) => {
    const id = request.body.id;

    db.remove({id: id});

    response.json({success: true});
});

router.get('/search', auth, async (request, response) => {
    const title = request.body.title;

    const searchResult = await getNoteByTitle(title);

    const result = {
        success: true,
        notes: searchResult
    }

    if (searchResult.length < 1) {
        result.success = false;
        result.notes = 'Titel finns ej'
    }

    response.json(result);


})



module.exports = router;