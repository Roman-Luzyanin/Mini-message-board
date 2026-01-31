const { Router } = require('express');

const indexRouter = Router();

function showTime () {
    const data = new Date();
    const timePattern = new Intl.DateTimeFormat('en-US', {
                            minute: 'numeric',
                            hour: 'numeric',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })
    const time = timePattern.format(data).slice(12);
    const date = timePattern.format(data).slice(0, 10);

    return [time, date];
}

let messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added:  showTime(),
    },
    {
        text: "Hello! How are you?",
        user: "Charles",
        added: showTime(),
    }
];

const links = [
    { href: "/", text: "Messages" },
    { href: "/new", text: "New message" },
];

     
indexRouter.get('/', (req, res) => res.render('index', { links, messages }))
indexRouter.get('/message_:number', (req, res) =>{
    const num = parseInt(req.params.number);
    res.render('messageDetails', { messages, num });
})
indexRouter.post('/new', (req, res) => {
    messages.push({text: req.body.message, user: req.body.author, added: showTime()});
    res.redirect('/');
})

indexRouter.post('/edit_:number', (req, res) => {
    const num = parseInt(req.params.number);
    messages = messages.map((message, idx) => idx === num ? { ...message, text: req.body.message} : message);
    res.redirect('/');
})

indexRouter.post('/delete_:number', (req, res) => {
    const num = parseInt(req.params.number);
    messages = messages.filter((_, idx) => idx !== num);
    res.redirect('/');
})

module.exports = indexRouter;