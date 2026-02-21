const db = require('../db/queries');
const { validationResult, matchedData } = require('express-validator');

const links = [
    { href: "/", text: "Messages" },
    { href: "/new", text: "New message" },
];

async function renderMessages(req, res) {
    const messages = await db.getAllMesages();
    res.render('index', {links, messages});
}

async function renderDetais(req, res) {
    const message = await db.getMesage(req.params.number);
    res.render('messageDetails', {message })
}

const newMessage = (req, res) => res.render('form', {links, author: '', message: ''});

async function addNewMessage(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('form', { 
                    links,
                    author: req.body.author,
                    message: req.body.message,
                    errors: errors.array() 
                })
    }
    const { author, message } = matchedData(req);
    await db.insertMessage(author, message);
    res.redirect('/')
}

async function deleteMessage(req, res) {
    await db.deleteMessage(req.params.number);
    res.redirect('/');
}
async function updateMessage(req, res) {
    await db.updateMessage(req.params.number, req.body.message);
    res.redirect('/');
}

module.exports = {
    renderMessages,
    newMessage,
    renderDetais,
    addNewMessage,
    deleteMessage,
    updateMessage,
}