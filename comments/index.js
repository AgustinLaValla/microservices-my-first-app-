const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const commentsByPostId = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    return res.json({ comments: commentsByPostId[req.params.id] || [] });
});

app.post('/posts/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const commentId = randomBytes(4).toString('hex');

    const comments = commentsByPostId[id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[id] = comments;
    
    await axios.post('http://events-srv:4005/events', {
        type: 'CommentCreated',
        data: { 
            id: commentId,
            content,
            postId: id,
            status: 'pending'
        }
    })

    return res.json({ coments: comments });
});

app.post('/events', async (req, res) => {
    console.log('Event Received', req.body.type);
    const { type, data } = req.body;
    if(type === 'CommentModerated') {
        const { postId, id, status, content } = data

        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);

        comment.status = status;

        await axios.post('http://events-srv:4005/events', {
            type:'CommentUpdated',
            data: {
                postId,
                id,
                status,
                content
            }
        })
    }
    res.send({});
});


app.listen(5000, () => console.log('Listening on 5000'));