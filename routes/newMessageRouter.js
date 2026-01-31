const { Router } = require('express')

const newMessageRouter = Router();

const links = [
    { href: "/", text: "Messages" },
    { href: "/new", text: "New message" },
];

newMessageRouter.get('/', (req, res) => res.render('form', { links }))

module.exports = newMessageRouter;