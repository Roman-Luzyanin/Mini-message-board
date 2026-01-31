const express = require('express');
const app = express();
const path = require('path');

const assets = path.join(__dirname, 'public')
app.use(express.static(assets))

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const indexRouter = require('./routes/indexRouter')
const newMessageRouter = require('./routes/newMessageRouter')
const notFoundRouter = require('./routes/notFoundRouter')

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use('/', indexRouter)
app.use('/new', newMessageRouter)
app.use('/*splat', notFoundRouter)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).send(err.message);
})

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port: ${port}`)
})