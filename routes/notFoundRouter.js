const { Router } = require('express')

const notFoundRouter = Router()

notFoundRouter.get('/' , (req, res) => 
    res.send('<h1 style="text-align: center; margin-top: 100px;">Page not found :(</h1>'))

module.exports = notFoundRouter;