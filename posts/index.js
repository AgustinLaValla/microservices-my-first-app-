const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const posts = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/posts', (req, res) => {
    return res.send(posts);
});

app.get('/posts/:id', (req, res) => {
    return res.json({ post: posts[req.params.id] });
})

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    posts[id] = { ...req.body, id };

    await axios.post('http://events-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            ...req.body
        }
    })

    return res.status(201).send(posts[id]);
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    console.log(posts[id]);
    delete posts[id];
    return res.send('Post successfully removed');
})

app.post('/events', (req, res) => {
    console.log('Event Received', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('v55');
    console.log('Listening on 4000');
});