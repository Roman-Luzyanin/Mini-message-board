const { Router } = require('express');
const controllers = require('../controllers/indexController');
const { body } = require('express-validator');

const validator = [
    body('author').trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 15 }).withMessage('Username must be 3 - 15 characters'),
    body('message').trim()
    .notEmpty().withMessage('Message cannot be empty')
    .escape()
];

const indexRouter = Router();
    
indexRouter.get('/', controllers.renderMessages);

indexRouter.get('/new', controllers.newMessage);
indexRouter.post('/new', validator, controllers.addNewMessage);

indexRouter.get('/message_:number', controllers.renderDetais);

indexRouter.post('/edit_:number', controllers.updateMessage);

indexRouter.post('/delete_:number', controllers.deleteMessage);

module.exports = indexRouter;